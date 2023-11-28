import React, { useState, useRef } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import '../Style/FormStyles.css';

const Form1 = () => {
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    'entry.1830245759': '',
    'entry.753111962': '',
    'entry.2122914383': 'sem documento',
    'entry.1709330095': 'sem comprovante',
    'entry.965698881': '',
    'entry.1160402993': '',
    'entry.1844713475': '',
    'entry.249723496': '',
  });
  const [validated, setValidated] = useState(false);

  const handleInputData = (input) => (e) => {
    const { value } = e.target;

    const maskedValue = input === 'entry.753111962' ? applyMask(value) : value;

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
        const url = `https://docs.google.com/forms/d/e/1FAIpQLSffrX55aeqhkSSAKDr7o6AvkUsBDTG2a3S2Wmy3LoRztUpHgg/formResponse?entry.1830245759=${formData['entry.1830245759']}
        &entry.753111962=${formData['entry.753111962']} 
        &entry.2122914383=${formData['entry.2122914383']}
        &entry.1709330095=${formData['entry.1709330095']}
        &entry.965698881=${formData['entry.965698881']}
        &entry.1160402993=${formData['entry.1160402993']}
        &entry.1844713475=${formData['entry.1844713475']}
        &entry.249723496=${formData['entry.249723496']}`;
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
        console.error('Erro ao fazer a solicitação:', error);
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

  const handleFileUpload1 = () => handleFileUpload(fileInputRefs.fileInputRef1, 'entry.2122914383');
  const handleFileUpload2 = () => handleFileUpload(fileInputRefs.fileInputRef2, 'entry.1709330095');

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
                <Form.Label htmlFor='entry.1830245759' className='form-title'>Nome/Razão Social</Form.Label>
                <Form.Control
                  type='text'
                  className='form-control'
                  name='entry.1830245759'
                  onChange={handleInputData('entry.1830245759')}
                  value={formData['entry.1830245759']}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Informe o nome ou razão social
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label htmlFor='entry.753111962' className='form-title'>CPF / CNPJ </Form.Label>
                <Form.Text className="text-muted mx-2">
                  (Somente números)
                </Form.Text>

                <Form.Control
                  type="text"
                  className="form-control"
                  id="cpfCnpj"
                  onChange={(e) => handleInputData('entry.753111962')(e)}
                  onKeyPress={(event) => {
                    if (/\D/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  value={applyMask(formData['entry.753111962'])}
                  name="entry.753111962"
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
                <Form.Label className='form-title'>Enviar documento</Form.Label>
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
                  name='entry.2122914383'
                  value={formData['entry.2122914383']}
                  readOnly
                  hidden
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label className='form-title'>Comprovante de residência</Form.Label>
                <Form.Control
                  className='form-control'
                  type='file'
                  ref={fileInputRefs.fileInputRef2}
                  id='comprovanteResidencia'
                  accept='.pdf'
                  onChange={handleFileUpload2}
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
                  name='entry.1709330095'
                  value={formData['entry.1709330095']}
                  readOnly
                  hidden
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <h5><strong>Identificação da(s) CDA(s) e  período de referência</strong></h5>
                <p>No link abaixo, será possível fazer a consulta da(s) CDA(s) que constam em seu nome:</p>
                <a href='https://app.sefa.pa.gov.br/consulta-divida-ativa/#/consultar-divida-ativa' target='_blank' rel='noreferrer'>Consulta Débitos Inscritos</a>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label htmlFor='entry.965698881' className='form-title'>CDA</Form.Label>
                <Form.Control
                  type='text'
                  className='form-control'
                  id='cda'
                  onChange={handleInputData('entry.965698881')}
                  value={formData['entry.965698881']}
                  name='entry.965698881'
                  required />
                <Form.Control.Feedback type="invalid">
                  Informe a CDA
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label htmlFor='entry.1160402993' className='form-title'>Telefone de contato</Form.Label>
                <Form.Control
                  as={InputMask}
                  mask='(99)99999-9999'
                  placeholder='(__)_____-____'
                  type='text'
                  className='form-control'
                  id='telefone'
                  onChange={handleInputData('entry.1160402993')}
                  value={formData['entry.1160402993']}
                  name='entry.1160402993'
                  required
                  
                />
                <Form.Control.Feedback type="invalid">
                  Informe o telefone de contato
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label htmlFor='entry.1844713475' className='form-title'>Email</Form.Label>
                <Form.Control
                  type='email'
                  className='form-control'
                  id='email'
                  onChange={handleInputData('entry.1844713475')}
                  value={formData['entry.1844713475']}
                  name='entry.1844713475'
                  required />
                <Form.Control.Feedback type="invalid">
                  Informe o email
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label htmlFor='entry.249723496' className='form-title'>Nome do titular / Representante legal</Form.Label>
                <Form.Control
                  type='text'
                  className='form-control'
                  id='nomeTitular'
                  onChange={handleInputData('entry.249723496')}
                  value={formData['entry.249723496']}
                  name='entry.249723496'
                  required />
                <Form.Control.Feedback type="invalid">
                  Informe o nome do titular ou representante legal
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label className='form-title'>Termos</Form.Label>
                <p >Caso seu pedido já tenha sido levado a protesto ou à Ação de Execução Fiscal, fica ciente o contribuinte que é o responsável pelo pagamento das custas devidas.</p>
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
