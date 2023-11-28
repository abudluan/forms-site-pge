import React, { useState, useRef } from 'react';
import '../Style/FormStyles.css';
import { Form, Card, Button, Container } from 'react-bootstrap';
import InputMask from 'react-input-mask';

const Form3 = () => {
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    'entry.1357688810': '',
    'entry.1453056265': '',
    'entry.526556254': '',
    'entry.2009551761': '',
    'entry.501486972': '',
    'entry.42607275': '',
    'entry.1571092475': '',
    'entry.962457213': '',
    'entry.172516049': '',
    'entry.1437382390': 'Sem documento',
    'entry.1264122021': ''
  });
  const [validated, setValidated] = useState(false);

  const handleInputData = (input) => (e) => {
    const { type, checked, value } = e.target;

    // Adicione uma verificação para o campo CPF/CNPJ
    const maskedValue = input === 'entry.1453056265' ? applyMask(value) : value;

    setFormData((prevState) => ({
      ...prevState,
      [input]: type === 'checkbox' ? (checked ? 'Sim' : 'Não') : maskedValue,
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
        const url = `https://docs.google.com/forms/d/e/1FAIpQLScemrs9YirRz9db08a62Or1HB1nEzqbu_k3pTW1WrGi1UgqOQ/formResponse?entry.1357688810=${formData['entry.1357688810']}&entry.1453056265=${formData['entry.1453056265']}&entry.526556254=${formData['entry.526556254']}&entry.2009551761=${formData['entry.2009551761']}&entry.501486972=${formData['entry.501486972'] === 'Sim' ? 'Sim' : 'Não'}&entry.42607275=${formData['entry.42607275'] === 'Sim' ? 'Sim' : 'Não'}&entry.1571092475=${formData['entry.1571092475'] === 'Sim' ? 'Sim' : 'Não'}&entry.962457213=${formData['entry.962457213'] === 'Sim' ? 'Sim' : 'Não'}&entry.172516049=${formData['entry.172516049'] === 'Sim' ? 'Sim' : 'Não'}&entry.1437382390=${formData['entry.1437382390']}&entry.1264122021=${formData['entry.1264122021']}`;
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

  const handleFileUpload1 = () => handleFileUpload(fileInputRefs.fileInputRef1, 'entry.1437382390');

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
                <Form.Label htmlFor='entry.1357688810' className='form-title'>Nome/Razão Social</Form.Label>
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
                <Form.Label htmlFor='entry.1453056265' className='form-title'>CPF / CNPJ </Form.Label>
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
                <Form.Label htmlFor='entry.526556254' className='form-title'>Telefone de contato</Form.Label>
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
                  minLength={14} />
                <Form.Control.Feedback type="invalid">
                  Informe o telefone de contato
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label htmlFor='entry.2009551761' className='form-title'>Email</Form.Label>
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

              <Form.Group>
                <Form.Label><strong>Marque abaixo sua dúvida ou pedido de informação:</strong></Form.Label>

                <Form.Check
                  className='mb-3'
                  name='entry.501486972'
                  id='entry.501486972'
                  label='1- Título protestado pela SEFA (911) * título antigo. Já paguei/parcelei o débito por DAE no portal de serviços da SEFA, mas permaneço protestado.'
                  checked={formData['entry.501486972'] === 'Sim'}
                  onChange={handleInputData('entry.501486972')}
                />

                <Form.Check
                  className='mb-3'
                  name='entry.42607275'
                  id='entry.42607275'
                  label='2 - Título protestado pela PGE (914). Já paguei/parcelei o débito por DAE no cartório de protestos e mesmo assim está ativo no SIAT.'
                  checked={formData['entry.42607275'] === 'Sim'}
                  onChange={handleInputData('entry.42607275')}
                />

                <Form.Check
                  className='mb-3'
                  name='entry.1571092475'
                  id='entry.1571092475'
                  label='3- Título protestado pela PGE (914). Já paguei/parcelei o débito na SEFA e continuo protestado, após cinco dias úteis.'
                  checked={formData['entry.1571092475'] === 'Sim'}
                  onChange={handleInputData('entry.1571092475')}
                />

                <Form.Check
                  className='mb-3'
                  name='entry.962457213'
                  id='entry.962457213'
                  label='4- Mesmo consultando a dívida no portal de serviços da SEFA, não sei do que se trata esta intimação.'
                  checked={formData['entry.962457213'] === 'Sim'}
                  onChange={handleInputData('entry.962457213')}
                />

                <Form.Check
                  className='mb-3'
                  name='entry.172516049'
                  id='entry.172516049'
                  label='5- Consultei o portal de serviços da SEFA (https://app.sefa.pa.gov.br/consulta-divida-ativa/#/consultar-divida-ativa) e não reconheço este débito.'
                  checked={formData['entry.172516049'] === 'Sim'}
                  onChange={handleInputData('entry.172516049')}
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <p><strong>Caso tenha marcado a opção 5 na questão anterior, encaminhe seus motivos e/ou documento.</strong></p>
                <Form.Control
                  className='form-control'
                  type='file'
                  ref={fileInputRefs.fileInputRef1}
                  id='documento'
                  accept='.pdf'
                  onChange={handleFileUpload1}
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Control
                  type='text'
                  className='form-control'
                  name='entry.1437382390'
                  value={formData['entry.1437382390']}
                  readOnly
                  hidden
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label htmlFor='entry.1264122021'><strong>Outra solicitação</strong></Form.Label>
                <Form.Control
                  type='text'
                  as='textarea'
                  className='form-control'
                  name='entry.1264122021'
                  onChange={handleInputData('entry.1264122021')}
                  value={formData['entry.1264122021']}

                />
              </Form.Group>
              {loading && <div>Carregando...</div>}
              <Button className='btn-success px-5' type='submit' disabled={loading}>
                Enviar
              </Button>
            </Form>
          </Card.Body>
        </Card >
      )
      }
    </Container >
  );
}

export default Form3;