import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Button, Image } from 'react-bootstrap'
import { useAuth0 } from "@auth0/auth0-react";
import { connect } from "react-redux";

import logo from '../resources/company_logo.png'
import "../styles/DefaultNavbar.css"

const LogoutButton = () => {
    const { logout } = useAuth0();
    return (
        <Button variant="outline-success" onClick={() => logout({ returnTo: window.location.origin })}>
            Wyloguj
        </Button>
    );
};

function DefaultNavbar(props) {
    return (
        <div>
            <Navbar bg="warning" className="mb-3">
                <Navbar.Brand>
                    <Image src={logo} className="logo-img" />
                </Navbar.Brand>

                <Nav className="ml-auto">
                    {!props.isLoggedIn &&
                        <Button className="btn-navbar" variant="outline-success" href="/">Dowiedz się więcej o nas</Button>
                    }
                    {props.isLoggedIn &&
                        <div>
                            <Button className="btn-navbar" variant="outline-success" href="/dashboard">Tablica</Button>
                            <Button className="btn-navbar" variant="outline-success" href="/workouts">Treningi</Button>
                            <Button className="btn-navbar" variant="outline-success" href="/account">Moje konto</Button>
                            <LogoutButton />
                        </div>
                    }
                </Nav>

            </Navbar>
        </div>
    )
}

function mapStateToProps(state) {
    return state;
}

export default DefaultNavbar = connect(mapStateToProps)(DefaultNavbar);