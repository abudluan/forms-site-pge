import React, { useState, useRef } from 'react';
import { Button, Card, Container, Form, Accordion } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import '../Style/FormStyles.css';

const Form1 = () => {
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    'entry.1357688810': '',
    'entry.1453056265': '',
    'entry.1442951732': 'sem documento',
    'entry.2068690071': 'sem titulo',
    'entry.1450152876': 'sem DAE',
    'entry.480542324': 'sem comprovante',
    'entry.526556254': '',
    'entry.2009551761': '',
    'entry.1948919866': ''
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
        let url = `https://docs.google.com/forms/d/e/1FAIpQLSeheGLm861uzt9UvD8O0CaEL3D-p3HaIwYoUl_EaepWJhgZ7g/formResponse?entry.1357688810=${formData['entry.1357688810']}
        &entry.1453056265=${formData['entry.1453056265']} 
        &entry.1442951732=${formData['entry.1442951732']}
        &entry.2068690071=${formData['entry.2068690071']}
        &entry.1450152876=${formData['entry.1450152876']}
        &entry.480542324=${formData['entry.480542324']}
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
      } catch (error) {
        console.error('Erro ao fazer a solicitação:', error);
      } finally {
        setLoading(false);
      }
    }
    setValidated(true);
  }

  const fileInputRefs = {
    fileInputRef1: useRef(null),
    fileInputRef2: useRef(null),
    fileInputRef3: useRef(null),
    fileInputRef4: useRef(null),
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
        } else {
          console.error('Falha ao fazer upload do arquivo');
        }
      } catch (error) {
        console.error('Erro ao enviar arquivo:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFileUpload1 = () => handleFileUpload(fileInputRefs.fileInputRef1, 'entry.1442951732');
  const handleFileUpload2 = () => handleFileUpload(fileInputRefs.fileInputRef2, 'entry.2068690071');
  const handleFileUpload3 = () => handleFileUpload(fileInputRefs.fileInputRef3, 'entry.1450152876');
  const handleFileUpload4 = () => handleFileUpload(fileInputRefs.fileInputRef4, 'entry.480542324');

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
            <h3 className='mt-2'><strong>Solicitação de Emissão de Carta de Anuência</strong></h3>
            <Accordion defaultActiveKey={['0']} alwaysOpen>
              <Accordion.Item eventKey='0'>
                <Accordion.Header><strong>Leia com atenção antes de fazer o seu pedido:</strong></Accordion.Header>
                <Accordion.Body>
                  <strong>1</strong> - De acordo com o Termo de
                  Cooperação 25/2018 firmado entre o Estado, Tribunal de Justiça e Cartórios de
                  Protestos, <b>o sistema de protestos é
                  feito através de integração automática entre as instituições, isto é, por
                  sistema eletrônico.</b>
                </Accordion.Body>

                <Accordion.Body>
                  <strong>2</strong> - Segundo a Lei de Protestos (Lei Federal 9.492, de 1997), uma vez que o título
                   foi remetido para o cartório de protestos, o pagamento deverá ser feito exclusiva e diretamente
                    no cartório que enviou a intimação (tanto do crédito fiscal quanto das custas cartorárias). 
                    Não aceite que ninguém mais lhe cobre por este serviço. Para o parcelamento, após o período de três
                     dias úteis após o recebimento da notificação, o contribuinte deverá parcelar o seu débito direto no site eletrônico da SEFA,
                      por meio do link: <a href="https://www.sefa.pa.gov.br/" target="_blank">https://www.sefa.pa.gov.br/</a>
                </Accordion.Body>

                <Accordion.Body>
                  <strong>3</strong> - As cartas de anuência do apresentante 914 (Procuradoria-Geral do Estado) são 
                  emitidas automaticamente após o parcelamento ou pagamento, no prazo de três à cinco dias úteis. 
                  Este prazo se dá devido à necessidade de compensação bancária. Nesta situação, não é preciso fazer 
                  este pedido, pois a carta de anuência chegará automaticamente ao cartório de protestos e ficará 
                  armazenada na CENPROT (Central de Protestos). O contribuinte, então, deverá ter feito o pagamento 
                  das custas cartorárias, direto no cartório de protestos, para a baixa definitiva.<br>
                  </br>
                  Utilize o link abaixo para acompanhar a emissão da Carta de Anuência e realizar o donwload <a href="https://www.pesquisaprotesto.com.br/" target="_blank">https://www.pesquisaprotesto.com.br/</a>
                </Accordion.Body>

                <Accordion.Body>
                  <strong>4</strong> - As cartas de anuência para <b>o apresentante 911 (Secretaria de Estado de
                  Fazenda)</b>, ou seja, protestos anteriores à maio de 2022, deverão utilizar
                  este requerimento.
                </Accordion.Body>

                <Accordion.Body>
                  <strong>5</strong> - <b>Utilize este requerimento</b>, também, caso tenha passado o prazo do item 3,
                  pois como toda plataforma que depende da internet e de integrações entre
                  sistemas, pode em alguns momentos apresentar instabilidades.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
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
                <Form.Text className='text-muted mx-2'>
                  (Somente números)
                </Form.Text>

                <Form.Control
                  type='text'
                  className='form-control'
                  id='cpfCnpj'
                  onChange={(e) => handleInputData('entry.1453056265')(e)}
                  value={applyMask(formData['entry.1453056265'])}
                  name='entry.1453056265'
                  maxLength={17}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Informe o CPF ou CNPJ
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label className='form-title required'>Documento de identificação válido, com foto</Form.Label>
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
                  name='entry.1442951732'
                  value={formData['entry.1442951732']}
                  readOnly
                  hidden
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label className='form-title required'>Título recebido do Cartório de Protestos</Form.Label>
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
                  name='entry.2068690071'
                  value={formData['entry.2068690071']}
                  readOnly
                  hidden
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label className='form-title required'>Guia de recolhimento (DAE)</Form.Label>
                <Form.Control
                  className='form-control'
                  type='file'
                  ref={fileInputRefs.fileInputRef3}
                  id='comprovanteResidencia'
                  accept='.pdf'
                  onChange={handleFileUpload3}
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
                  name='entry.1450152876'
                  value={formData['entry.1450152876']}
                  readOnly
                  hidden
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label className='form-title required'>Comprovante de pagamento</Form.Label>
                <Form.Control
                  className='form-control'
                  type='file'
                  ref={fileInputRefs.fileInputRef4}
                  id='comprovanteResidencia'
                  accept='.pdf'
                  onChange={handleFileUpload4}
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
                  name='entry.480542324'
                  value={formData['entry.480542324']}
                  readOnly
                  hidden
                />
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
                  required />
                <Form.Control.Feedback type="invalid">
                  Informe o telefone de contato
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label htmlFor='entry.2009551761' className='form-title required'>Email</Form.Label>
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
                <Form.Label className='form-title'>Termos</Form.Label>
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
