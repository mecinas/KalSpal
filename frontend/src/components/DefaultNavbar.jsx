import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Button, Image } from 'react-bootstrap'
import { useAuth0 } from "@auth0/auth0-react";
import { connect } from "react-redux";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { useHistory } from 'react-router-dom';

import { getAllUsers } from '../redux/actions'
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
    const history = useHistory();
    const [selected, setSelected] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (selected.length > 0) {
            history.push("/user/" + selected[0].id)
        }
    }, [selected])

    useEffect(() => {
        if (props.accesstoken) { //Magia dzieje się z isLogged?!?!
            props.dispatch(getAllUsers(props.accesstoken))
        }
    }, [props.accesstoken])

    useEffect(() => {
        if (props.allusers !== undefined) {
            var array_of_names = []
            props.allusers.map((user) => {
                array_of_names.push({ label: user.firstName + " " + user.lastName, id: user.id })
            })
            setOptions(array_of_names)
        }
    }, [props.allusers])

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
                        <div className="d-flex">
                            {/* Zmiana przycisków na ikony search na środku */}
                            <div className="mr-4">
                                <Typeahead
                                    id="basic-example"
                                    onChange={setSelected}
                                    options={options}
                                    placeholder="Znajdź znajomych..."
                                    selected={selected}
                                />
                            </div>

                            <Button className="btn mr-4" variant="outline-success" href="/dashboard">Tablica</Button>
                            <Button className="btn mr-4" variant="outline-success" href="/workouts">Treningi</Button>
                            <Button className="btn mr-4" variant="outline-success" href="/account">Moje konto</Button>
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