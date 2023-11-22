import React, { useState, useRef } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import InputMask from 'react-input-mask';
import './Styles.css';

const Form1 = () => {
    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        "entry.1830245759": "",
        "entry.753111962": "",
        "entry.2122914383": "sem documento"
    });

    const handleInputData = (input) => (e) => {
        const { value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [input]: value
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmit(true);

        let url = `https://docs.google.com/forms/d/e/1FAIpQLSffrX55aeqhkSSAKDr7o6AvkUsBDTG2a3S2Wmy3LoRztUpHgg/formResponse?entry.1830245759=${formData["entry.1830245759"]}&entry.753111962=${formData["entry.753111962"]}&entry.2122914383=${formData["entry.2122914383"]}`;

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        // Reseta o estado de loading e submit após o envio do formulário
        setLoading(false);
        setSubmit(false);
    }

    const fileInputRef = useRef(null);

    const handleFileUpload = async () => {
        setLoading(true);

        const files = fileInputRef.current.files;
        if (files.length > 0) {
            const formData1 = new FormData();
            for (let file of files) {
                formData1.append('files', file);
            }

            try {
                const response = await fetch('https://fullstackers.com.br:7443/upload', {
                    method: 'POST',
                    body: formData1
                });

                if (response.ok) {
                    const data = await response.json();
                    setFormData((prevState) => ({
                        ...prevState,
                        "entry.2122914383": data.files[0].id
                    }));
                    console.log(`id = ${data.files[0].id}`);
                } else {
                    console.error("Falha ao fazer upload do arquivo");
                }
            } catch (error) {
                console.error("Erro ao enviar arquivo:", error);
            } finally {
                setLoading(false); // Desativa o estado de carregamento
            }
        }
    };

    return (
        <Container>
            <Card className="mt-4">
                <Card.Header>
                    <h3 className="mt-2"><strong>Solicitação de Reconhecimento de Prescrição Administrativa de Débito Fiscal Inscrito em Dívida Ativa</strong></h3>
                    <p className="mt-3">O interessado abaixo identificado, solicita o reconhecimento da prescrição para a extinção do crédito fiscal, com amparo no <strong>Art. 53-B da Lei nº 6.182/1998 c/c Instrução Normativa - IN SEFA nº 18/2020</strong>.</p>
                </Card.Header>

                <Card.Body>
                   
                        <Form onSubmit={handleSubmit} target="_self">

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="entry.1830245759" className="form-label">Nome/Razão Social</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    name="entry.1830245759"
                                    onChange={handleInputData("entry.1830245759")}
                                    value={formData["entry.1830245759"]}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="entry.753111962" className="form-label">CPF / CNPJ </Form.Label>
                                <Form.Control
                                    as={InputMask}
                                    mask="999.999.999-99"
                                    placeholder="___.___.___-__"
                                    type="text"
                                    className="form-control"
                                    id="cpf/cnpj"
                                    onChange={handleInputData("entry.753111962")}
                                    value={formData["entry.753111962"]}
                                    name="entry.753111962"
                                    required />
                            </Form.Group>

                            <Form.Group className="mb-3">
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

                            <Form.Group className="mb-3">
                                <Form.Label className="form-label">Enviar documento</Form.Label>
                                <Form.Control
                                    className="form-control"
                                    type="file"
                                    ref={fileInputRef}
                                    id="documento"
                                    accept=".pdf"
                                    onChange={handleFileUpload}
                                />
                                
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="entry.2122914383" className="form-label">id documento</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    name="entry.2122914383"
                                    value={formData["entry.2122914383"]}
                                />
                            </Form.Group>

                            {loading && <div>Carregando...</div>}

                            <Button type="submit" disabled={loading}>
                                Enviar
                            </Button>

                        </Form>
                    
                </Card.Body>
            </Card >
        </Container >
    );
}

export default Form1;
