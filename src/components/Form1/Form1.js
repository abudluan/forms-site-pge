import React, { useState, useRef } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import '../Style/FormStyles.css';

const Form1 = () => {
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    'entry.1357688810': '',
    'entry.1453056265': '',
    'entry.2120982721': 'sem documento',
    'entry.1742790741': 'sem comprovante',
    'entry.1259162928': '',
    'entry.526556254': '',
    'entry.2009551761': '',
    'entry.1948919866': '',
  });
  const [validated, setValidated] = useState(false);

  const handleInputData = (input) => (e) => {
    const { value } = e.target;

    const maskedValue = input === 'entry.1453056265' ? applyMask(value) : value;

    setFormData((prevState) => ({
      ...prevState,
      [input]: maskedValue
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setSubmit(true);
      try {
        const url = `https://docs.google.com/forms/d/e/1FAIpQLSeoHVNNOiWcsFiLQpnu_WXHNyG93mv5j-5J8PgckglYr0KGLg/formResponse?entry.1357688810=${formData['entry.1357688810']}
        &entry.1453056265=${formData['entry.1453056265']} 
        &entry.2120982721=${formData['entry.2120982721']}
        &entry.1742790741=${formData['entry.1742790741']}
        &entry.1259162928=${formData['entry.1259162928']}
        &entry.526556254=${formData['entry.526556254']}
        &entry.2009551761=${formData['entry.2009551761']}
        &entry.1948919866=${formData['entry.1948919866']}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        if (!res.ok) {
          console.error('Falha ao enviar o formulário. Status do erro:', res.status);
        }
      }
      catch (error) {
        console.error('Ocorreu o seguinte erro ao fazer a solicitação:', error);
      }
      finally {
        setLoading(false);
        
      }
    }
    setValidated(true);
  }

  const fileInputRefs = {
    fileInputRef1: useRef(null),
    fileInputRef2: useRef(null),
  };

  const handleFileUpload = async (fileInputRef, formDataKey) => {
    setLoading(true);
    const files = fileInputRef.current.files;
    if (files.length > 0) {
      const formData = new FormData();
      for (let file of files) {
        formData.append('files', file);
      }
      try {
        const response = await fetch('https://fullstackers.com.br:7443/upload', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          const data = await response.json();
          setFormData((prevState) => ({
            ...prevState,
            [formDataKey]: data.files[0].id,
          }));
          console.log(`id = ${data.files[0].id}`);
        }
        else {
          console.error('Falha ao fazer upload do arquivo');
        }
      }
      catch (error) {
        console.error('Erro ao enviar arquivo:', error);
      }
      finally {
        setLoading(false);
      }
    }
  };

  const handleFileUpload1 = () => handleFileUpload(fileInputRefs.fileInputRef1, 'entry.2120982721');
  const handleFileUpload2 = () => handleFileUpload(fileInputRefs.fileInputRef2, 'entry.1742790741');

  const handleNewFormClick = () => {
    window.location.reload();
  }

  const applyMask = (value) => {
    // Remove caracteres não numéricos
    const cleanedValue = value.replace(/\D/g, '');

    // Verifica se o valor está formatado como CPF ou CNPJ
    const isCpf = cleanedValue.length <= 11;

    // Aplica a máscara de CPF ou CNPJ
    if (isCpf) {
      return cleanedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else {
      return cleanedValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '$1.$2.$3/$4').substring(0, 17);
    }
  };

  return (
    <Container>
      {submit ? (
        <Card className='mt-4 pb-3 pt-3'>
          <h2 className='text-center'>Formulário enviado com sucesso!</h2>
          <Button className='mx-auto mt-4 btn-success' onClick={handleNewFormClick}>Enviar novo formulário</Button>
        </Card>
      ) : (
        <Card className='mt-4'>
          <Card.Header>
            <h3 className='mt-2'><strong>Solicitação de Reconhecimento de Prescrição Administrativa de Débito Fiscal Inscrito em Dívida Ativa</strong></h3>
            <p className='mt-3'>O interessado abaixo identificado, solicita o reconhecimento da prescrição para a extinção do crédito fiscal, com amparo no <strong>Art. 53-B da Lei nº 6.182/1998 c/c Instrução Normativa - IN SEFA nº 18/2020</strong>.</p>
          </Card.Header>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit} target='_self'>

              <Form.Group className='mb-3'>
                <Form.Label htmlFor='entry.1357688810' className='form-title required'>Nome/Razão Social</Form.Label>
                <Form.Control
                  type='text'
                  className='form-control'
                  name='entry.1357688810'
                  onChange={handleInputData('entry.1357688810')}
                  value={formData['entry.1357688810']}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Informe o nome ou razão social
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label htmlFor='entry.1453056265' className='form-title required'>CPF / CNPJ </Form.Label>
                <Form.Text className="text-muted mx-2">
                  (Somente números)
                </Form.Text>

                <Form.Control
                  type="text"
                  className="form-control"
                  id="cpfCnpj"
                  onChange={(e) => handleInputData('entry.1453056265')(e)}
                  onKeyPress={(event) => {
                    if (/\D/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  value={applyMask(formData['entry.1453056265'])}
                  name="entry.1453056265"
                  maxLength={17}
                  minLength={14}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Informe o CPF ou CNPJ
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mb-3'>
                <h5><strong><u>Contribuinte:</u></strong></h5>
                <p><strong>- Pessoa Física</strong> (anexar documento de identificação válido, com
                  foto)</p>
                <p><strong>- Empresário individual</strong> (anexar cópia de documento que comprove a
                  condição de
                  empresário)</p>
                <p><strong>- Sócio Administrador</strong> (anexar cópia do CNPJ, do contrato e
                  alterações)</p>
                <h5><strong><u>Representante Legal:</u></strong></h5>
                <p><strong>- Procurador</strong> (anexar procuração com poderes específicos para
                  requerer o reconhecimento da
                  prescrição do crédito fiscal perante a PGE, cópia do RG/CPF do outorgado) </p>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label className='form-title required'>Enviar documento do contribuinte (Siga as instruções para o tipo de contribuinte) </Form.Label>
                <Form.Control
                  className='form-control'
                  type='file'
                  ref={fileInputRefs.fileInputRef1}
                  id='documento'
                  accept='.pdf'
                  onChange={handleFileUpload1}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Você deve escolher o arquivo
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Control
                  type='text'
                  className='form-control'
                  name='entry.2120982721'
                  value={formData['entry.2120982721']}
                  readOnly
                  hidden
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label className='form-title'>Outro documento</Form.Label>
                <Form.Control
                  className='form-control'
                  type='file'
                  ref={fileInputRefs.fileInputRef2}
                  id='comprovanteResidencia'
                  accept='.pdf'
                  onChange={handleFileUpload2}
                  
                />
                <Form.Control.Feedback type="invalid">
                  Você deve escolher o arquivo
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Control
                  type='text'
                  className='form-control'
                  name='entry.1742790741'
                  value={formData['entry.1742790741']}
                  readOnly
                  hidden
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <h5><strong>Identificação da(s) CDA(s) e  período de referência</strong></h5>
                <p>No link abaixo, será possível fazer a consulta da(s) CDA(s) que constam em seu nome:</p>
                <a href='https://app.sefa.pa.gov.br/consulta-divida-ativa/#/consultar-divida-ativa' target='_blank' 
                rel='noreferrer'>Consulta Débitos Inscritos</a>
                <p>Ao preencher as CDAS, abaixo, favor levar em consideração que a prescrição ocorre após 5 (CINCO) anos do débito e 
                  desde que não tenha havido causa interruptiva, como parcelamento, defesa em AINF e citação válida em execução fiscal.</p>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label htmlFor='entry.1259162928' className='form-title required'>CDA/CDAs (somente os números separados por vírgulas)</Form.Label>
                <Form.Control
                  type='text'
                  className='form-control'
                  id='cda'
                  onChange={handleInputData('entry.1259162928')}
                  value={formData['entry.1259162928']}
                  name='entry.1259162928'
                  required />
                <Form.Control.Feedback type="invalid">
                  Informe a CDA
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label htmlFor='entry.526556254' className='form-title required'>Telefone de contato</Form.Label>
                <Form.Control
                  as={InputMask}
                  mask='(99)99999-9999'
                  placeholder='(__)_____-____'
                  type='text'
                  className='form-control'
                  id='telefone'
                  onChange={handleInputData('entry.526556254')}
                  value={formData['entry.526556254']}
                  name='entry.526556254'
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Informe o telefone de contato
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label htmlFor='entry.2009551761' className='form-title required'>E-mail</Form.Label>
                <Form.Control
                  type='email'
                  className='form-control'
                  id='email'
                  onChange={handleInputData('entry.2009551761')}
                  value={formData['entry.2009551761']}
                  name='entry.2009551761'
                  required />
                <Form.Control.Feedback type="invalid">
                  Informe o email
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label htmlFor='entry.1948919866' className='form-title required'>Nome do titular / Representante legal</Form.Label>
                <Form.Control
                  type='text'
                  className='form-control'
                  id='nomeTitular'
                  onChange={handleInputData('entry.1948919866')}
                  value={formData['entry.1948919866']}
                  name='entry.1948919866'
                  required />
                <Form.Control.Feedback type="invalid">
                  Informe o nome do titular ou representante legal
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label className='form-title required'>Termos</Form.Label>
                <p>Caso seu pedido já tenha sido levado a protesto ou à Ação de Execução Fiscal, fica ciente o contribuinte que é o responsável pelo pagamento das custas devidas.</p>
                <p>Declaro estar ciente de que estou fornecendo voluntariamente meus dados pessoais, incluindo, mas não se limitando a, nome, CPF, endereço e informações financeiras, à Fazenda Pública Estadual. Reconheço que esses dados serão utilizados exclusivamente para fins de administração tributária, fiscalização, arrecadação, e demais procedimentos relacionados à gestão fiscal do Estado.</p>
                <p>Estou ciente de que meus dados serão tratados em conformidade com as disposições da Lei Geral de Proteção de Dados (Lei nº 13.709/2018) e que tenho o direito de solicitar acesso, correção, limitação ou exclusão dos meus dados pessoais a qualquer momento, conforme previsto em lei, bem como dou meu consentimento livre, expresso e informado para que a Fazenda Pública Estadual processe meus dados pessoais conforme descrito acima.</p>
                <Form.Check
                  id='termosAceitos'
                  label='Li e concordo com os termos'
                  required
                  feedback="Você deve concordar antes de enviar."
                  feedbackType="invalid"
                />
              </Form.Group>

              {loading && <div>Carregando...</div>}
              <Button className='btn-success px-5' type='submit' disabled={loading}>
                Enviar
              </Button>
            </Form>
          </Card.Body>
        </Card >
      )}
    </Container >
  );
}

export default Form1;
