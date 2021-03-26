import React from 'react'
import { Navbar, Nav, NavItem, Button, Image } from 'react-bootstrap'

import logo from '../resources/company_logo.png'
import "../styles/DefaultNavbar.css"


export default function DefaultNavbar() {
    return (
        <div>
            <Navbar bg="light" variant="primary" >
                <Navbar.Brand>
                    <Image src={logo} />
                </Navbar.Brand>

                <Nav className="ml-auto">
                    <Button variant="outline-primary" font-size="xx-large" href="/">Zaloguj się</Button>
                </Nav>
            </Navbar>
        </div>
    )
}
