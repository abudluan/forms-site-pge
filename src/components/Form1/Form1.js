import React, { useState } from "react";
import { Card, Container, Form } from "react-bootstrap";
import InputMask from 'react-input-mask';
import './Styles.css';

const Form1 = () => {
    const [submitted, setSubmitted] = useState(false);

    const validateForm = () => {
        const response = window.grecaptcha.getResponse();
        const captchaAlert = document.getElementById("captcha-alert");
        const agradecimentoAlert = document.getElementById("agradecimento-alert");
        if (response.length === 0) {
            captchaAlert.style.display = "block";
            agradecimentoAlert.style.display = "none";
            return false;
        } else {
            captchaAlert.style.display = "none";
            agradecimentoAlert.style.display = "block";
            setTimeout(function () {
                agradecimentoAlert.style.display = "none";
            }, 5000);
            return true;
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);
        validateForm();
        // Add further logic here for form submission or processing if needed
    };

    return (
        <Container>
            <Card className="mt-4">
                <div className="card-header">
                    <h3 className="mt-2"><strong>Solicitação de Reconhecimento de Prescrição Administrativa de Débito Fiscal Inscrito em Dívida Ativa</strong></h3>
                    <p className="mt-3">O interessado abaixo identificado, solicita o reconhecimento da prescrição para a extinção do crédito fiscal, com amparo no <strong>Art. 53-B da Lei nº 6.182/1998 c/c Instrução Normativa - IN SEFA nº 18/2020</strong>.</p>
                </div>

                <div className="card-body">
                    <form className="form" target="hidden_iframe" method="post" onSubmit={handleFormSubmit} action="">
                        <div className="mb-3">
                            <Form.Label className="form-label">Nome/Razão Social</Form.Label>
                            <Form.Control type="text" className="form-control" id="nome" required />
                        </div>

                        <div class="mb-3">
                            <Form.Label class="form-label">CPF / CNPJ </Form.Label>
                            <Form.Control as={InputMask} mask="999.999.999-99" placeholder="___.___.___-__" type="text" class="form-control" id="cpf/cnpj" required />
                        </div>

                        <div class="mb-3">
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
                        </div>

                        <div class="mb-3">
                            <Form.Label class="form-label">Enviar documento</Form.Label>
                            <Form.Control class="form-control" type="file" id="documento" accept=".pdf" required />
                        </div>

                        <div class="mb-3">
                            <Form.Label class="form-label">Comprovante de residência</Form.Label>
                            <Form.Control class="form-control" type="file" id="comprovante" accept=".pdf" required />
                        </div>

                        <div class="mb-3">
                            <h5>Identificação da(s) CDA(s) e período de referência </h5>
                            <p>Para consultar a(s) CDA(s) que constam em seu nome clique <a
                                href="https://app.sefa.pa.gov.br/consulta-divida-ativa/#/consultar-divida-ativa"
                                target="_blank">aqui</a> </p>
                        </div>

                        <div class="mb-3">
                            <Form.Label class="form-label">CDA</Form.Label>
                            <Form.Control type="text" class="form-control" id="cda" required/>
                        </div>

                        <div class="mb-3">
                            <Form.Label class="form-label">Telefone de contato (incluindo o DDD)</Form.Label>
                            <Form.Control as={InputMask} mask="(99) 99999-9999" placeholder="(__) _____-____" type="text" class="form-control" id="telefone" required />
                        </div>

                        <div class="mb-3">
                            <Form.Label class="form-label">Email</Form.Label>
                            <Form.Control type="email" class="form-control" id="email" required />
                        </div>


                        <div class="mb-3">
                            <Form.Label class="form-label">Nome do titular / Representante legal</Form.Label>
                            <Form.Control type="text" class="form-control" id="titular" required />
                        </div>

                        <div class="mb-3">
                            <h5><strong>Caso seu pedido já tenha sido levado a protesto ou à Ação de Execução Fiscal, fica
                                ciente o contribuinte que é o responsável pelo pagamento das custas devidas.</strong></h5>
                        </div>

                        <div class="mb-3">

                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" required />
                                    <Form.Label class="form-check-label" for="defaultCheck1">
                                        Declaro que li e concordo com todos os termos deste formulário
                                    </Form.Label>
                            </div>
                        </div>

                        {/* Captcha section */}
                        <div className="g-recaptcha mb-3" data-sitekey="6LfrCW4oAAAAAB-g53yl_PUK6eyfSX7KqKXbYlp_"></div>

                        <div id="captcha-alert" className="mx-auto w-50 alert alert-danger" style={{ display: 'none' }}>
                            Por favor, complete o reCAPTCHA.
                        </div>

                        <div id="agradecimento-alert" className="mx-auto w-50 alert alert-success" style={{ display: 'none' }}>
                            Obrigado por participar!
                        </div>

                        <div className="row form-group">
                            <button className="btn btn-primary col-md-2 mx-auto mt-2" type="submit" value="Send">
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </Card>
        </Container>
    );
}

export default Form1;