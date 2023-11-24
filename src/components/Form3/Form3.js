import React, { useState, useRef } from "react";
import '../Style/FormStyles.css';
import { Form, Card, Button, Container } from "react-bootstrap";
import InputMask from 'react-input-mask';

const Form3 = () => {
    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        'entry.778474845': '',
        'entry.751658909': '',
        'entry.1610524789': '',
        'entry.420385343': '',
        'entry.15233117': '',
        'entry.1279636931': '',
        'entry.18496374': '',
        'entry.995406817': '',
        'entry.222249182': '',
        'entry.1467425328': ''
    });

    const handleInputData = (input) => (e) => {
        const { type, checked, value } = e.target;
    
        setFormData((prevState) => ({
            ...prevState,
            [input]: type === 'checkbox' ? (checked ? 'Sim' : 'Não') : value,
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmit(true);
        try {
            const url = `https://docs.google.com/forms/d/e/1FAIpQLSdfKIoJZ2bW4hxnJf19mVoFj2JasFkxIoWM1e8C9ja1G4quLQ/formResponse?entry.778474845=${formData['entry.778474845']}
                &entry.751658909=${formData['entry.751658909']} 
                &entry.1610524789=${formData['entry.1610524789']}
                &entry.420385343=${formData['entry.420385343']}
                &entry.15233117=${formData['entry.15233117'] === 'Sim' ? 'Sim' : 'Não'}
                
                
                
                `;
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

    const handleFileUpload1 = () => handleFileUpload(fileInputRefs.fileInputRef1, '');


    const handleNewFormClick = () => {
        window.location.reload();
    }

    const applyMask = (value) => {
        // Remove caracteres não numéricos
        const cleanedValue = value.replace(/\D/g, '');

        // Decide se é um CPF ou CNPJ com base na quantidade de dígitos
        const isCpf = cleanedValue.length <= 11;

        // Aplica a máscara de CPF ou CNPJ
        if (isCpf) {
            return cleanedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        } else {
            return cleanedValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '$1.$2.$3/$4');
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
                        <Form onSubmit={handleSubmit} target='_self'>
                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='entry.778474845' className='form-label'>Nome/Razão Social</Form.Label>
                                <Form.Control
                                    type='text'
                                    className='form-control'
                                    name='entry.778474845'
                                    onChange={handleInputData('entry.778474845')}
                                    value={formData['entry.778474845']}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='entry.751658909' className='form-label'>CPF / CNPJ </Form.Label>
                                <Form.Text className="text-muted mx-2">
                                    (Somente números)
                                </Form.Text>

                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="cpfCnpj"
                                    onChange={(e) => handleInputData('entry.751658909')(e)}
                                    value={applyMask(formData['entry.751658909'])}
                                    name="entry.751658909"
                                    maxLength={17}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='entry.1610524789' className='form-label'>Telefone de contato</Form.Label>
                                <Form.Control
                                    as={InputMask}
                                    mask='(99)99999-9999'
                                    placeholder='(__)_____-____'
                                    type='text'
                                    className='form-control'
                                    id='telefone'
                                    onChange={handleInputData('entry.1610524789')}
                                    value={formData['entry.1610524789']}
                                    name='entry.1610524789'
                                    required />
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='entry.420385343' className='form-label'>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    className='form-control'
                                    id='email'
                                    onChange={handleInputData('entry.420385343')}
                                    value={formData['entry.420385343']}
                                    name='entry.420385343'
                                    required />
                            </Form.Group>

                            <Form.Group>
                                <h5><strong>Marque abaixo sua dúvida ou pedido de informação:</strong></h5>

                                <Form.Check
                                    className="mb-3"
                                    name='entry.15233117'
                                    id='entry.15233117'
                                    label='Alguma descrição para o checkbox'
                                    checked={formData['entry.15233117'] === 'Sim'}
                                    onChange={handleInputData('entry.15233117')}
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