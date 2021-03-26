import React from 'react'
import { Container, Row, Col, Image, Button, Jumbotron } from 'react-bootstrap'

import "../styles/Login.css"
import Logo from "../resources/running.jpg"
import Facebook from "../resources/facebook.ico"
import Google from "../resources/google.png"
import Github from "../resources/github.png"
import Mail from "../resources/mail.png"

export default function Login() {
    return (
            <Container className="login-container">
                <Row className="justify-content-md-center">
                    <Col lg={6} sm={12}>
                        <div>
                        <Image src={Logo} className="img-fluid running-img" />
                        </div>
                    </Col>

                    <Col lg={6} sm={12} className="login-col">
                        <Row >
                            <Col className="login-col" sm={12}>
                                <Button className="login-btn" variant="outline-secondary">
                                    <Image src={Facebook} className="login-ico" />
                                    Zaloguj się za pomocą Facebook
                                </Button>
                            </Col>

                            <Col className="login-col" sm={12}>
                                <Button className="login-btn" variant="outline-secondary">
                                    <Image src={Google} className="login-ico" />
                                    Zaloguj się za pomocą Google
                                </Button>
                            </Col>

                            <Col className="login-col" sm={12}>
                                <Button className="login-btn" variant="outline-secondary">
                                    <Image src={Github} className="login-ico" />
                                    Zaloguj się za pomocą Github
                                </Button>
                            </Col>

                            <Col className="login-col" sm={12}>
                                <Button className="login-btn" variant="outline-secondary">
                                    <Image src={Mail} className="login-ico" />
                                    Zaloguj się za pomocą poczty
                                </Button>
                            </Col>

                            <Col className="login-col" sm={12}>
                                <h5 className="login-statute">Logując się do KalSpal akceptujesz <a href="#">Regulamin</a></h5>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
    )
}
