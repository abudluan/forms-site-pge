import React, { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import InputMask from 'react-input-mask';
import './Styles.css';

const Form1 = () => {

    return (
        <Container>
            <Card className="mt-4">
                <Card.Header>
                    <h3 className="mt-2"><strong>Solicitação de Reconhecimento de Prescrição Administrativa de Débito Fiscal Inscrito em Dívida Ativa</strong></h3>
                    <p className="mt-3">O interessado abaixo identificado, solicita o reconhecimento da prescrição para a extinção do crédito fiscal, com amparo no <strong>Art. 53-B da Lei nº 6.182/1998 c/c Instrução Normativa - IN SEFA nº 18/2020</strong>.</p>
                </Card.Header>

                <Card.Body>
                    <Form>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="nome" className="form-label">Nome/Razão Social</Form.Label>
                            <Form.Control type="text" className="form-control" id="nome" name="entry.1830245759" required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="cpfCnpj" className="form-label">CPF / CNPJ </Form.Label>
                            <Form.Control as={InputMask} mask="999.999.999-99" placeholder="___.___.___-__" type="text" className="form-control" id="cpf/cnpj" name="entry.753111962" required />
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
                                prescrição do crédito fiscal perante a PGE, cópia do RG/CPF do outorgado </p>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="form-label">Enviar documento</Form.Label>
                            <Form.Control className="form-control" type="file" id="documento" accept=".pdf" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="form-label">Comprovante de residência</Form.Label>
                            <Form.Control className="form-control" type="file" id="comprovante" accept=".pdf" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <h5>Identificação da(s) CDA(s) e período de referência </h5>
                            <p>Para consultar a(s) CDA(s) que constam em seu nome clique <a
                                href="https://app.sefa.pa.gov.br/consulta-divida-ativa/#/consultar-divida-ativa"
                                target="_blank" rel="noreferrer">aqui</a> </p>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="form-label">CDA</Form.Label>
                            <Form.Control type="text" className="form-control" id="cda" name="entry.2066772515" required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="form-label">Telefone de contato (incluindo o DDD)</Form.Label>
                            <Form.Control as={InputMask} mask="(99) 99999-9999" placeholder="(__) _____-____" type="text" className="form-control" id="telefone" name="entry.2066581089" required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="form-label">Email</Form.Label>
                            <Form.Control type="email" className="form-control" id="email" name="entry.1023017242" required />
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label className="form-label">Nome do titular / Representante legal</Form.Label>
                            <Form.Control type="text" className="form-control" id="titular" name="entry.866090107" required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <h5><strong>Caso seu pedido já tenha sido levado a protesto ou à Ação de Execução Fiscal, fica
                                ciente o contribuinte que é o responsável pelo pagamento das custas devidas.</strong></h5>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Check aria-label="option 1" label="Declaro que li e concordo com todos os termos deste formulário" name="entry.844782401" required />
                        </Form.Group>

                        <Button className="mx-auto" type="submit">
                            Enviar
                        </Button>

                    </Form>

                </Card.Body>
            </Card>
        </Container >
    );
}

export default Form1;