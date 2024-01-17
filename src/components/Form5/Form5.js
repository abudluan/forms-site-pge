import React, { useState, useRef } from 'react';
import '../Style/FormStyles.css';
import { Form, Card, Button, Container, Row, Col } from 'react-bootstrap';
import InputMask from 'react-input-mask';

const Form5 = () => {
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({

    'Nome': '', //entry.1304271638 *
    'Telefone': '', //entry.376011290 *
    'Email': '', //entry.2024373529 *
    'CEP': '', //entry.1761543507
    'Endereco': '', //entry.595599005
    'Numero': '', //entry.795811870
    'complemento': '', //entry.2137952858
    'Bairro': '', //entry.1701459400
    'Cidade': '', //entry.1236342051
    'Estado': '' //entry.726940232
  });
  const [validated, setValidated] = useState(false);

  const handleInputData = (input) => (e) => {
    const { type, checked, value } = e.target;

    // Adicione uma verificação para o campo CPF/CNPJ
    const maskedValue = input === '' ? applyMask(value) : value;

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
        //https://docs.google.com/forms/d/e/1FAIpQLSf8FHnfwMRoLfnMIqUr4aApFdGQocIiz2qukEF6CG1XJ0q8FQ/formResponse?&entry.1304271638=Nome                           &entry.376011290=Telefone                      &entry.2024373529=Email                          &entry.1761543507=CEP                            &entry.595599005=Endereco                      &entry.795811870=Numero                        &entry.2137952858=complemento                    &entry.1701459400=Bairro                         &entry.1236342051=Cidade                         &entry.726940232=Estado
        const url = `https://docs.google.com/forms/d/e/1FAIpQLSf8FHnfwMRoLfnMIqUr4aApFdGQocIiz2qukEF6CG1XJ0q8FQ/formResponse?&entry.1304271638=${formData['Nome']}&entry.376011290=${formData['Telefone']}&entry.2024373529=${formData['Email']}&entry.1761543507=${formData['CEP']}&entry.595599005=${formData['Endereco']}&entry.795811870=${formData['Numero']}&entry.2137952858=${formData['complemento']}&entry.1701459400=${formData['Bairro']}&entry.1236342051=${formData['Cidade']}&entry.726940232=${formData['Estado']}`;
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

  const handleNewFormClick = () => {
    window.location.reload();
  }

  const applyMask = (value) => {
    // Remove caracteres não numéricos
    const cleanedValue = value.replace(/\D/g, '');

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
            <h3 className='mt-2'><strong>Atualização de Dados Cadastrais</strong></h3>
          </Card.Header>

          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit} target='_self'>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='Nome' className='form-title required'>Nome/Razão Social</Form.Label>
                <Form.Control
                  type='text'
                  className='form-control'
                  name='Nome'
                  onChange={handleInputData('Nome')}
                  value={formData['Nome']}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Informe o nome ou razão social
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label htmlFor='Telefone' className='form-title required'>Telefone de contato</Form.Label>
                <Form.Control
                  as={InputMask}
                  mask='(99)99999-9999'
                  placeholder='(__)_____-____'
                  type='text'
                  className='form-control'
                  id='telefone'
                  onChange={handleInputData('Telefone')}
                  value={formData['Telefone']}
                  name='Telefone'
                  required
                  minLength={14} />
                <Form.Control.Feedback type="invalid">
                  Informe o telefone de contato
                </Form.Control.Feedback>
              </Form.Group>


              <Form.Group className='mb-3'>
                <Form.Label htmlFor='Email' className='form-title'>E-mail</Form.Label>
                <Form.Control
                  type='email'
                  className='form-control'
                  id='email'
                  onChange={handleInputData('Email')}
                  value={formData['Email']}
                  name='Email'
                  required />
                <Form.Control.Feedback type="invalid">
                  Informe o email
                </Form.Control.Feedback>
              </Form.Group>

              <Row className="align-items-center">
                <Col sm={3}>
                  <Form.Group className='mb-3'>
                    <Form.Label htmlFor='CEP' className='form-title'>CEP</Form.Label>
                    <Form.Control
                      as={InputMask}
                      mask='99999-999'
                      placeholder='_____-___'
                      type='text'
                      className='form-control'
                      id='CEP'
                      onChange={handleInputData('CEP')}
                      value={formData['CEP']}
                      name='CEP'
                      minLength={9} 
                      />
                    <Form.Control.Feedback type="invalid">
                      Informe o CEP
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col sm={7}>
                  <Form.Group className='mb-3'>
                    <Form.Label htmlFor='Endereco' className='form-title'>Endereço</Form.Label>
                    <Form.Control
                      type='text'
                      className='form-control'
                      name='Endereco'
                      onChange={handleInputData('Endereco')}
                      value={formData['Endereco']} />
                    <Form.Control.Feedback type="invalid">
                      Informe o Endereco
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className='mb-3'>
                    <Form.Label htmlFor='Numero' className='form-title'>Número</Form.Label>
                    <Form.Control
                      type='text'
                      className='form-control'
                      name='Numero'
                      onChange={handleInputData('Numero')}
                      value={formData['Numero']}

                      maxLength={8} />
                    <Form.Control.Feedback type="invalid">
                      Informe o Numero
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="align-items-center">
              <Col sm={4}>
                  <Form.Group className='mb-3'>
                    <Form.Label htmlFor='complemento' className='form-title'>Complemento</Form.Label>
                    <Form.Control
                      type='text'
                      className='form-control'
                      name='complemento'
                      onChange={handleInputData('complemento')}
                      value={formData['complemento']} />
                    <Form.Control.Feedback type="invalid">
                      Informe o complemento
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col sm={3}>
                  <Form.Group className='mb-3'>
                    <Form.Label htmlFor='Bairro' className='form-title'>Bairro</Form.Label>
                    <Form.Control
                      type='text'
                      className='form-control'
                      name='Bairro'
                      onChange={handleInputData('Bairro')}
                      value={formData['Bairro']} />
                    <Form.Control.Feedback type="invalid">
                      Informe o Bairro
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={3}>
                  <Form.Group className='mb-3'>
                    <Form.Label htmlFor='Cidade' className='form-title'>Cidade</Form.Label>
                    <Form.Control
                      type='text'
                      className='form-control'
                      name='Cidade'
                      onChange={handleInputData('Cidade')}
                      value={formData['Cidade']} />
                    <Form.Control.Feedback type="invalid">
                      Informe a Cidade
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col sm={2}>
                  <Form.Group className='mb-3'>
                    <Form.Label htmlFor='Estado' className='form-title'>Estado</Form.Label>
                    <Form.Control
                      type='text'
                      className='form-control'
                      name='Estado'
                      onChange={handleInputData('Estado')}
                      value={formData['Estado']}
                      maxLength={2}  />
                    <Form.Control.Feedback type="invalid">
                      Informe o Estado
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

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
      )
      }
    </Container >
  );
}

export default Form5;