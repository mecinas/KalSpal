import React from 'react'
import { Navbar, Nav, Button, Image } from 'react-bootstrap'

import logo from '../resources/company_logo.png'
import "../styles/DefaultNavbar.css"


export default function DefaultNavbar() {
    return (
        <div>
            <Navbar bg="warning" >
                <Navbar.Brand>
                    <Image src={logo} />
                </Navbar.Brand>

                <Nav className="ml-auto">
                    <Button variant="outline-success" font-size="xx-large" href="/">Dowiedz się więcej o nas</Button>
                </Nav>
            </Navbar>
        </div>
    )
}
