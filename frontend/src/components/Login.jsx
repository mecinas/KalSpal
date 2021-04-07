import React from 'react'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import { useAuth0 } from '@auth0/auth0-react';

import "../styles/Login.css"
import Logo from "../resources/running.jpg"
import Facebook from "../resources/facebook.ico"
import Google from "../resources/google.png"
import Github from "../resources/github.png"
import Mail from "../resources/mail.png"

export default function Login() {

    const {loginWithRedirect} = useAuth0();
    
    return (
            <Container className="login-container">
                <Row>
                    <Col lg={6} sm={12}>
                        <div>
                        <Image src={Logo} className="img-fluid running-img" />
                        </div>
                    </Col>

                    <Col lg={6} sm={12}>
                        <Row >
                            <Col className="login-col" sm={12}>
                                <Button className="login-btn" variant="outline-secondary" onClick={()=> loginWithRedirect()}>
                                    <Image src={Facebook} className="login-ico" />
                                    Zaloguj się za pomocą Facebook
                                </Button>
                            </Col>

                            <Col className="login-col" sm={12}>
                                <Button className="login-btn" variant="outline-secondary" onClick={()=> loginWithRedirect()}>
                                    <Image src={Google} className="login-ico" />
                                    Zaloguj się za pomocą Google
                                </Button>
                            </Col>

                            <Col className="login-col" sm={12}>
                                <Button className="login-btn" variant="outline-secondary" onClick={()=> loginWithRedirect()}>
                                    <Image src={Github} className="login-ico" />
                                    Zaloguj się za pomocą Github
                                </Button>
                            </Col>

                            <Col className="login-col" sm={12}>
                                <Button className="login-btn" variant="outline-secondary" onClick={()=> loginWithRedirect()}>
                                    <Image src={Mail} className="login-ico" />
                                    Zaloguj się za pomocą poczty
                                </Button>
                            </Col>

                            <Col className="login-col" sm={12}>
                                <h5 className="login-statute">Logując się do KalSpal akceptujesz <a href="/">Regulamin</a></h5>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
    )
}
