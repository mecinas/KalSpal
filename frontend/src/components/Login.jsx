import React from 'react'
import { Row, Col, Image, Button } from 'react-bootstrap'
import { useAuth0 } from '@auth0/auth0-react';

import Logo from "../resources/running.jpg"
import Facebook from "../resources/facebook.ico"
import Google from "../resources/google.png"
import Auth0 from "../resources/auth0.png"

export default function Login() {

    const { loginWithRedirect } = useAuth0();

    return (
        <Row>
            <Col lg={7} sm={12}>
                <Image src={Logo} className="img-fluid running-img" />
            </Col>

            <Col lg={5} sm={12} className="my-auto d-grid gap-5 my-5 " >

                <Button className="btn-lg btn-block my-3" variant="outline-secondary" onClick={() => loginWithRedirect()}>
                    <Image src={Auth0} style={{ height: '30px' }} className="mx-2" />
                    Zaloguj się za pomocą Auth0
                </Button>

                <Button className="btn-lg btn-block my-3" variant="outline-secondary" onClick={() => loginWithRedirect()}>
                    <Image src={Facebook} style={{ height: '30px' }} className="mx-2" />
                    Zaloguj się za pomocą Facebook
                </Button>

                <Button className="btn-lg btn-block my-3" variant="outline-secondary" onClick={() => loginWithRedirect()}>
                    <Image src={Google} style={{ height: '30px' }} className="mx-2" />
                    Zaloguj się za pomocą Google
                </Button>

                <p>Logując się do KalSpal akceptujesz <a href="/">Regulamin</a>.</p>
                
            </Col>
        </Row>
    )
}
