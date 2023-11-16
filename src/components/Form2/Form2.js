import React from "react";
import './Styles.css';
import { Container, Card, Accordion } from "react-bootstrap";


const Form2 = () => {
    return (
        <Container>
            <Card className="mt-4">
                <Card.Header>
                    <h3>Solicitação de Emissão de Carta de Anuência</h3>
                    <Accordion alwaysOpen>
                        <Accordion.Header>Accordion Item #1</Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                        </Accordion.Body>
                    </Accordion>

                </Card.Header>
            </Card>

        </Container>
    );
}

export default Form2