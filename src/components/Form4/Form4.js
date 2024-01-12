import React, { useState, useRef } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import '../Style/FormStyles.css';

const Form4 = () => {
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({'entry.1665899281': '',});
  const [validated, setValidated] = useState(false);

  const handleInputData = (input) => (e) => {
    const { value } = e.target;

    const maskedValue = input === 'entry.1665899281' ? applyMask(value) : value;

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
        const url = `https://docs.google.com/forms/d/e/1FAIpQLSfey3UPctkhqlQjoQM8z7ckO2VW9q4Lu0fU_CA_ZaJDLjI6bQ/viewform?usp=pp_url
        &entry.1665899281=${formData['entry.1665899281']}`;
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
            <h3 className='mt-2'><strong>Entrada do Contribuinte</strong></h3>
            
          </Card.Header>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit} target='_self'>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='entry.1665899281' className='form-title'>CPF / CNPJ </Form.Label>
                <Form.Text className="text-muted mx-2">
                  (Somente números)
                </Form.Text>

                <Form.Control
                  type="text"
                  className="form-control"
                  id="cpfCnpj"
                  onChange={(e) => handleInputData('entry.1665899281')(e)}
                  onKeyPress={(event) => {
                    if (/\D/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  value={applyMask(formData['entry.1665899281'])}
                  name="entry.1665899281"
                  maxLength={17}
                  minLength={14}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Informe o CPF ou CNPJ
                </Form.Control.Feedback>
              </Form.Group>

              {loading && <div>Carregando...</div>}
              <Button className='btn-success px-5' type='submit' disabled={loading}>
                Entrar
              </Button>
            </Form>
          </Card.Body>
        </Card >
      )}
    </Container >
  );
}

export default Form4;
