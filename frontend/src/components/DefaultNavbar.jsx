import React, {useState, useEffect} from 'react'
import { Navbar, Nav, Button, Image } from 'react-bootstrap'

import logo from '../resources/company_logo.png'
import "../styles/DefaultNavbar.css"


export default function DefaultNavbar(props) {
    
    return (
        <div>
            <Navbar bg="warning" >
                <Navbar.Brand>
                    <Image src={logo} />
                </Navbar.Brand>

                <Nav className="ml-auto">
                    {!props.isLogged &&
                        <Button variant="outline-success" href="/">Dowiedz się więcej o nas</Button>
                    }
                    {props.isLogged &&
                        <Button variant="outline-success" href="/account">Moje konto</Button>
                    }
                </Nav>

            </Navbar>
        </div>
    )
}
