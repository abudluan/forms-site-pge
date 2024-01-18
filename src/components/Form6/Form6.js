import React, { useState } from 'react';
import '../Style/FormStyles.css';
import { Form, Card, Button, Container } from 'react-bootstrap';

const Form6 = () => {
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setSubmit(true);
      try {
        const settings = {
          method: 'POST',
          headers: {
            'Content-Type': 'text/html',
            'Authorization': 'Bearer ya29.a0AfB_byD9LuTD83aNGhrmM4rsTgQLWF6Oc-Co9ftqzo0aJTQ0PNcCAJStLKJS1Dk5b4TurM6aLHqHtNBlX38vsoUeXwYpzt23d7ayHXcAwuYaywn5fWKprEN-VU8sZTsWmMXMIgblWUQK7VJZBgQATsM0LuFn9ccuSLEhaCgYKAXwSARMSFQHGX2MiUw6U7e4jMnLkmeog8XnYyQ0171'
          },
          body: JSON.stringify({
            "majorDimension": "ROWS",
            "values": [
              [
                "CLeyton",
                "Muto",
                "cleyton.muto",
                "9191234-0000"
              ]
            ]
          }),
        };
        const url = 'https://sheets.googleapis.com/v4/spreadsheets/1mX-5SRZy-t4ZcjY-tvqy-CDbpviXFPkqdkN_LPqB8Ls/values/Pagina:append?valueInputOption=USER_ENTERED';
        const res = await fetch(url, settings);
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

export default Form6;
