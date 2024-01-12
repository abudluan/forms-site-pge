import React, { useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import '../Style/FormStyles.css';

const Form4 = () => {
  // Estados para controlar o envio do formulário, o estado de carregamento, dados do formulário e validação do formulário.
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ 'entry.1665899281': '' });
  const [validated, setValidated] = useState(false);

  // Função para lidar com a entrada de dados e aplicar a máscara conforme necessário.
  const handleInputData = (input) => (e) => {
    const { value } = e.target;
    const maskedValue = input === 'entry.1665899281' ? applyMask(value) : value;

    // Atualiza os dados do formulário com a entrada atualizada.
    setFormData((prevState) => ({
      ...prevState,
      [input]: maskedValue,
    }));
  };

  // Função assíncrona para lidar com o envio do formulário.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      // Se o formulário não for válido, impede o envio e ativa a validação.
      e.stopPropagation();
    } else {
      // Inicia o processo de envio do formulário.
      setSubmit(true);

      try {
        // Constrói a URL de envio do formulário.
        const url = `https://docs.google.com/forms/d/e/1FAIpQLSfey3UPctkhqlQjoQM8z7ckO2VW9q4Lu0fU_CA_ZaJDLjI6bQ/formResponse?&entry.1665899281=${formData['entry.1665899281']}`;
        
        // Envia a solicitação POST para o servidor.
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        if (!res.ok) {
          // Se a resposta não estiver OK, lança um erro.
          throw new Error(`Falha ao enviar o formulário. Status do erro: ${res.status}`);
        }
      } catch (error) {
        // Trata erros durante o envio do formulário.
        console.error('Ocorreu o seguinte erro ao fazer a solicitação:', error.message);
      } finally {
        // Finaliza o processo de envio do formulário, independentemente do resultado.
        setLoading(false);
      }
    }

    // Ativa a validação após o envio do formulário.
    setValidated(true);
  };

  // Função para lidar com o clique em "Enviar novo formulário".
  const handleNewFormClick = () => {
    // Recarrega a página para permitir o envio de um novo formulário.
    window.location.reload();
  };

  // Função para aplicar a máscara ao CPF ou CNPJ.
  const applyMask = (value) => {
    const cleanedValue = value.replace(/\D/g, ''); // Remove caracteres não numéricos.
    const isCpf = cleanedValue.length <= 11;

    // Aplica a máscara de CPF ou CNPJ conforme o comprimento.
    return isCpf
      ? cleanedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
      : cleanedValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '$1.$2.$3/$4').substring(0, 17);
  };

  // Renderiza o componente.
  return (
    <Container>
      {submit ? (
        // Exibe a mensagem de sucesso após o envio bem-sucedido do formulário.
        <Card className='mt-4 pb-3 pt-3'>
          <h2 className='text-center'>Formulário enviado com sucesso!</h2>
          <Button className='mx-auto mt-4 btn-success' onClick={handleNewFormClick}>
            Enviar novo formulário
          </Button>
        </Card>
      ) : (
        // Renderiza o formulário enquanto não foi enviado.
        <Card className='mt-4'>
          <Card.Header>
            <h3 className='mt-2'>
              <strong>Entrada do Contribuinte</strong>
            </h3>
          </Card.Header>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit} target='_self'>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='entry.1665899281' className='form-title'>
                  CPF / CNPJ
                </Form.Label>
                <Form.Text className='text-muted mx-2'>(Somente números)</Form.Text>

                {/* Campo de entrada do formulário com máscara e validação. */}
                <Form.Control
                  type='text'
                  className='form-control'
                  id='cpfCnpj'
                  onChange={handleInputData('entry.1665899281')}
                  onKeyPress={(event) => {
                    if (/\D/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  value={applyMask(formData['entry.1665899281'])}
                  name='entry.1665899281'
                  maxLength={17}
                  minLength={14}
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  Informe o CPF ou CNPJ
                </Form.Control.Feedback>
              </Form.Group>

              {/* Exibe mensagem de carregamento durante o envio do formulário. */}
              {loading && <div>Carregando...</div>}

              {/* Botão de envio do formulário. */}
              <Button className='btn-success px-5' type='submit' disabled={loading}>
                Entrar
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Form4;
