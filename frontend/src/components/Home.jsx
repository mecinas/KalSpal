import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Image from 'react-bootstrap/Image'
import Nav from 'react-bootstrap/Nav'
import styled from 'styled-components'

import logo from '../resources/company_logo.png'

const Styles = styled.div`
    .logo {
        width: 50%;
        height: 50%;
        margin-left: 50%;
    }
    .link {
        width: 100%;
        height: 100%;
        padding: 0;
    }
`

const Home = () => {
    return (
        <Styles>
            <Navbar bg="light" variant="light">
                <Navbar.Brand >
                    <Image className="logo" src={logo} rounded />
                </Navbar.Brand>

                <Nav>
                    <Nav.Link className="link" href="/">Zaloguj się</Nav.Link>
                </Nav>
            </Navbar>
        </Styles>
    );
};

export default Home;