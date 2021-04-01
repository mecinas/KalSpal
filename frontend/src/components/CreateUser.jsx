import React from "react";
import { Form, Button, Jumbotron, Container } from 'react-bootstrap'

import '../styles/CreateUser.css'

export default function CreateUser() {

    return (
        <Container>
            <Jumbotron className="greeting-jumbo">
                <h1 className="greeting-title">Witaj na naszej platformie!</h1>
                <h5>
                    Twoje konto nie zostało utworzone, aby skorzystać z pełni możliwości KalSpal wypełnij poniższy formularz
                </h5>

                <Button className="info-btn" variant="primary">Dowiedz się więcej o korzyściach korzystania z KalSpal</Button>
            </Jumbotron>

            <Form>
                <Form.Group controlId="formBasicName">
                    <Form.Control type="text" placeholder="Wprowadź Imię" />
                </Form.Group>

                <Form.Group controlId="formBasicSurname">
                    <Form.Control type="text" placeholder="Wprowadź nazwisko" />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Wprowadź email" />
                </Form.Group>

                <Form.Group controlId="formBasicDate">
                    <Form.Label>Data urodzin</Form.Label>
                    <Form.Control type="date" name='date_of_birth' />
                </Form.Group>

                <Form.Group className="checkbox-group" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" />
                    <Form.Label>Potwierdzam zapoznanie z <a href="#">Regulaminem</a></Form.Label>
                </Form.Group>

                <Form.Group className="btn-group">
                    <Button className="submit-btn" variant="warning" type="submit">
                        Prześlij
                    </Button>
                </Form.Group>
            </Form>

        </Container>
    )
}
