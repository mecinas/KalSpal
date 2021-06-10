import React, { useState } from "react";
import { Form, Button, Jumbotron, Container } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'
import {createUser} from '../redux/actions'
import {connect} from 'react-redux'
import {cleanRegistered} from '../redux/actions'

import '../styles/CreateUser.css'

function CreateUser(props) {
    const { user } = useAuth0();

    const [doesRedirect, setDoesRedirect] = useState(false);

    const onFormSubmit = e => {
        e.preventDefault()
        var formData = new FormData(e.target)
        formData = Object.fromEntries(formData.entries())
        formData["email"] = user.email
        props.dispatch(createUser(props.accesstoken, formData))
        setTimeout(() => {
            props.dispatch(cleanRegistered())
            setDoesRedirect(true);
        }, 2000)
    }

    if (doesRedirect)
        return <Redirect to="/redirectAfterLogin" />
    else
        return (
            <Container onSubmit={onFormSubmit}>
                <Jumbotron className="greeting-jumbo">
                    <h1 className="greeting-title">Witaj na naszej platformie!</h1>
                    <h5>
                        Twoje konto nie zostało utworzone, aby skorzystać z pełni możliwości KalSpal wypełnij poniższy formularz
                </h5>

                    <Button className="info-btn" variant="primary">Dowiedz się więcej o korzyściach korzystania z KalSpal</Button>
                </Jumbotron>

                <Form>
                    <Form.Group controlId="formBasicName">
                        <Form.Control type="text" name='firstName' placeholder="Wprowadź Imię" />
                    </Form.Group>

                    <Form.Group controlId="formBasicSurname">
                        <Form.Control type="text" name='lastName' placeholder="Wprowadź nazwisko" />
                    </Form.Group>

                    <Form.Group controlId="formBasicDate">
                        <Form.Label>Data urodzin</Form.Label>
                        <Form.Control type="date" name='birthDate' />
                    </Form.Group>

                    <Form.Group className="checkbox-group" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" />
                        <Form.Label>Potwierdzam zapoznanie z <a href="/createUser">Regulaminem</a></Form.Label>
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

function mapStateToProps(state) {
    return state;
}

export default CreateUser = connect(mapStateToProps)(CreateUser);
