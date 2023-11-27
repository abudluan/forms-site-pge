import React, { useState, useRef } from 'react';
import { Button, Card, Container, Form, Accordion } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import '../Style/FormStyles.css';

const Form1 = () => {
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    'entry.1667831648': '',
    'entry.607460007': '',
    'entry.1248662621': 'sem documento',
    'entry.637644008': 'sem titulo',
    'entry.939867898': 'sem DAE',
    'entry.2060992544': 'sem comprovante',
    'entry.100752253': '',
    'entry.2022699692': '',
    'entry.1253515616': ''
  });

  const handleInputData = (input) => (e) => {
    const { value } = e.target;

    const maskedValue = input === 'entry.607460007' ? applyMask(value) : value;

    setFormData((prevState) => ({
      ...prevState,
      [input]: maskedValue
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmit(true);

    try {
      let url = `https://docs.google.com/forms/d/e/1FAIpQLSdVH3-MqGNHoQOJZCuQ6-n02S9QmGTorYrdOMuob2RInI1MDQ/formResponse?entry.1667831648=${formData['entry.1667831648']}
        &entry.607460007=${formData['entry.607460007']} 
        &entry.1248662621=${formData['entry.1248662621']}
        &entry.637644008=${formData['entry.637644008']}
        &entry.939867898=${formData['entry.939867898']}
        &entry.2060992544=${formData['entry.2060992544']}
        &entry.100752253=${formData['entry.100752253']}
        &entry.2022699692=${formData['entry.2022699692']}
        &entry.1253515616=${formData['entry.1253515616']}`;

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

  const handleFileUpload1 = () => handleFileUpload(fileInputRefs.fileInputRef1, 'entry.1248662621');
  const handleFileUpload2 = () => handleFileUpload(fileInputRefs.fileInputRef2, 'entry.637644008');
  const handleFileUpload3 = () => handleFileUpload(fileInputRefs.fileInputRef3, 'entry.939867898');
  const handleFileUpload4 = () => handleFileUpload(fileInputRefs.fileInputRef4, 'entry.2060992544');

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
                <Accordion.Header><strong>Leia com atenção:</strong></Accordion.Header>
                <Accordion.Body>
                  <strong>1</strong> - De acordo com o Termo de
                  Cooperação 25/2018 firmado entre o Estado, Tribunal de Justiça e Cartórios de
                  Protestos, o sistema de protestos é
                  feito através de integração automática entre as instituições, isto é, por
                  sistema eletrônico.
                </Accordion.Body>

                <Accordion.Body>
                  <strong>2</strong> - Segundo a Lei de Protestos (Lei
                  Federal 9.492, de 1997), uma vez que o título foi remetido para o cartório de
                  protestos, o pagamento/parcelamento deverá ser feito exclusiva e diretamente no cartório que enviou a intimação (tanto do
                  crédito fiscal quanto das custas cartorárias). Não aceite que ninguém mais lhe
                  cobre por este serviço.
                </Accordion.Body>

                <Accordion.Body>
                  <strong>3</strong> - As cartas de anuência do apresentante 914 (Procuradoria-Geral do
                  Estado) são emitidas automaticamente após o parcelamento ou pagamento, no
                  prazo de três à cinco dias úteis. Este prazo se dá devido à necessidade de
                  compensação bancária.  Nesta situação,
                  não é preciso fazer este pedido, pois a carta de anuência chegará automaticamente
                  ao cartório de protestos e ficará armazenada na CENPROT (Central de Protestos).
                </Accordion.Body>

                <Accordion.Body>
                  <strong>4</strong> - As cartas de anuência para o apresentante 911 (Secretaria de Estado de
                  Fazenda), ou seja, protestos anteriores à maio de 2022, deverão utilizar
                  este requerimento.
                </Accordion.Body>

                <Accordion.Body>
                  <strong>5</strong> - Utilize este requerimento, também, caso tenha passado o prazo do item 3,
                  pois como toda plataforma que depende da internet e de integrações entre
                  sistemas, pode em alguns momentos apresentar instabilidades.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card.Header>

          <Card.Body>

            <Form onSubmit={handleSubmit} target='_self'>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='entry.1667831648' className='form-title'>Nome/Razão Social</Form.Label>
                <Form.Control
                  type='text'
                  className='form-control'
                  name='entry.1667831648'
                  onChange={handleInputData('entry.1667831648')}
                  value={formData['entry.1667831648']}
                  required
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label htmlFor='entry.607460007' className='form-title'>CPF / CNPJ </Form.Label>
                <Form.Text className='text-muted mx-2'>
                  (Somente números)
                </Form.Text>

                <Form.Control
                  type='text'
                  className='form-control'
                  id='cpfCnpj'
                  onChange={(e) => handleInputData('entry.607460007')(e)}
                  value={applyMask(formData['entry.607460007'])}
                  name='entry.607460007'
                  maxLength={17}
                  required
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label className='form-title'>Documento de identificação válido, com foto</Form.Label>
                <Form.Control
                  className='form-control'
                  type='file'
                  ref={fileInputRefs.fileInputRef1}
                  id='documento'
                  accept='.pdf'
                  onChange={handleFileUpload1}
                  required
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Control
                  type='text'
                  className='form-control'
                  name='entry.1248662621'
                  value={formData['entry.1248662621']}
                  readOnly
                  hidden
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label className='form-title'>Título recebido do Cartório de Protestos</Form.Label>
                <Form.Control
                  className='form-control'
                  type='file'
                  ref={fileInputRefs.fileInputRef2}
                  id='comprovanteResidencia'
                  accept='.pdf'
                  onChange={handleFileUpload2}
                  required
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Control
                  type='text'
                  className='form-control'
                  name='entry.637644008'
                  value={formData['entry.637644008']}
                  readOnly
                  hidden
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label className='form-title'>Guia de recolhimento (DAE)</Form.Label>
                <Form.Control
                  className='form-control'
                  type='file'
                  ref={fileInputRefs.fileInputRef3}
                  id='comprovanteResidencia'
                  accept='.pdf'
                  onChange={handleFileUpload3}
                  required
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Control
                  type='text'
                  className='form-control'
                  name='entry.939867898'
                  value={formData['entry.939867898']}
                  readOnly
                  hidden
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label className='form-title'>Comprovante de pagamento</Form.Label>
                <Form.Control
                  className='form-control'
                  type='file'
                  ref={fileInputRefs.fileInputRef4}
                  id='comprovanteResidencia'
                  accept='.pdf'
                  onChange={handleFileUpload4}
                  required
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Control
                  type='text'
                  className='form-control'
                  name='entry.2060992544'
                  value={formData['entry.2060992544']}
                  readOnly
                  hidden
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label htmlFor='entry.100752253' className='form-title'>Telefone de contato</Form.Label>
                <Form.Control
                  as={InputMask}
                  mask='(99)99999-9999'
                  placeholder='(__)_____-____'
                  type='text'
                  className='form-control'
                  id='telefone'
                  onChange={handleInputData('entry.100752253')}
                  value={formData['entry.100752253']}
                  name='entry.100752253'
                  required />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label htmlFor='entry.2022699692' className='form-title'>Email</Form.Label>
                <Form.Control
                  type='email'
                  className='form-control'
                  id='email'
                  onChange={handleInputData('entry.2022699692')}
                  value={formData['entry.2022699692']}
                  name='entry.2022699692'
                  required />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label htmlFor='entry.1253515616' className='form-title'>Nome do titular / Representante legal</Form.Label>
                <Form.Control
                  type='text'
                  className='form-control'
                  id='nomeTitular'
                  onChange={handleInputData('entry.1253515616')}
                  value={formData['entry.1253515616']}
                  name='entry.1253515616'
                  required />
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
