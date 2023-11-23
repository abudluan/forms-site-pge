import React, { useState, useRef } from "react";
import { Button, Card, Container, Form, Accordion } from "react-bootstrap";
import InputMask from 'react-input-mask';
import './Form2.css';

const Form1 = () => {
    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        "entry.1667831648": "",
        "entry.607460007": "",
        "entry.1248662621": "sem documento",
        "entry.637644008": "sem titulo",
        "entry.939867898": "sem DAE",
        "entry.2060992544": "sem comprovante"
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

        try {
            let url = `https://docs.google.com/forms/d/e/1FAIpQLSdVH3-MqGNHoQOJZCuQ6-n02S9QmGTorYrdOMuob2RInI1MDQ/formResponse?entry.1667831648=${formData["entry.1667831648"]}
            &entry.607460007=${formData["entry.607460007"]} 
            &entry.1248662621=${formData["entry.1248662621"]}
            &entry.637644008=${formData["entry.637644008"]}
            &entry.939867898=${formData["entry.939867898"]}
            
            `;

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });

            if (!res.ok) {
                console.error("Falha ao enviar o formulário. Status do erro:", res.status);

            }

        } catch (error) {
            console.error("Erro ao fazer a solicitação:", error);

        } finally {
            setLoading(false);
        }
    }

    const fileInputRefs = {
        fileInputRef1: useRef(null),
        fileInputRef2: useRef(null),
        fileInputRef3: useRef(null),
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
                    console.error("Falha ao fazer upload do arquivo");
                }
            } catch (error) {
                console.error("Erro ao enviar arquivo:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleFileUpload1 = () => handleFileUpload(fileInputRefs.fileInputRef1, "entry.1248662621");
    const handleFileUpload2 = () => handleFileUpload(fileInputRefs.fileInputRef2, "entry.637644008");
    const handleFileUpload3 = () => handleFileUpload(fileInputRefs.fileInputRef2, "entry.939867898");

    const handleNewFormClick = () => {
        window.location.reload();
    }

    const determineMask = (value) => {
        // Remove non-numeric characters
        const cleanedValue = value.replace(/\D/g, "");

        // Determine if it's a CPF or CNPJ based on length
        return cleanedValue.length <= 11 ? "999.999.999-99" : "99.999.999/9999-99";
    };

    const handleMaskChange = (event) => {
        const value = event.target.value;
        const mask = determineMask(value);

        setFormData({
            ...formData,
            "entry.607460007": value,
        });
    };

    return (
        <Container>
            {submit ? (
                <Card className="mt-4 pb-3 pt-3">
                    <h2 className="text-center">Formulário enviado com sucesso!</h2>
                    <Button className="mx-auto mt-4 btn-success" onClick={handleNewFormClick}>Enviar novo formulário</Button>
                </Card>
            ) : (
                <Card className="mt-4">
                    <Card.Header>
                        <h3 className="mt-2"><strong>Solicitação de Emissão de Carta de Anuência</strong></h3>
                        <Accordion defaultActiveKey={['0']} alwaysOpen>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header><strong>Leia com atenção:</strong></Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Card.Header>

                    <Card.Body>

                        <Form onSubmit={handleSubmit} target="_self">

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="entry.1667831648" className="form-label">Nome/Razão Social</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    name="entry.1667831648"
                                    onChange={handleInputData("entry.1667831648")}
                                    value={formData["entry.1667831648"]}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="entry.607460007" className="form-label">CPF / CNPJ </Form.Label>
                                <Form.Control
                                    as={InputMask}
                                    mask="999.999.999-99"
                                    placeholder="___.___.___-__"
                                    type="text"
                                    className="form-control"
                                    id="cpf/cnpj"
                                    onChange={handleInputData("entry.607460007")}
                                    value={formData["entry.607460007"]}
                                    name="entry.607460007"
                                    required />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="form-label">Documento de identificação válido, com foto</Form.Label>
                                <Form.Control
                                    className="form-control"
                                    type="file"
                                    ref={fileInputRefs.fileInputRef1}
                                    id="documento"
                                    accept=".pdf"
                                    onChange={handleFileUpload1}
                                    required
                                />

                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    name="entry.1248662621"
                                    value={formData["entry.1248662621"]}
                                    readOnly
                                    hidden
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="form-label">Título recebido do Cartório de Protestos</Form.Label>
                                <Form.Control
                                    className="form-control"
                                    type="file"
                                    ref={fileInputRefs.fileInputRef2}
                                    id="comprovanteResidencia"
                                    accept=".pdf"
                                    onChange={handleFileUpload2}
                                    required
                                />

                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    name="entry.637644008"
                                    value={formData["entry.637644008"]}
                                    readOnly
                                    hidden
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="form-label">Guia de recolhimento (DAE)</Form.Label>
                                <Form.Control
                                    className="form-control"
                                    type="file"
                                    ref={fileInputRefs.fileInputRef3}
                                    id="comprovanteResidencia"
                                    accept=".pdf"
                                    onChange={handleFileUpload3}
                                    required
                                />

                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    name="entry.939867898"
                                    value={formData["entry.939867898"]}
                                    readOnly
                                    hidden
                                />
                            </Form.Group>




                            {loading && <div>Carregando...</div>}

                            <Button className="btn-success px-5" type="submit" disabled={loading}>
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
