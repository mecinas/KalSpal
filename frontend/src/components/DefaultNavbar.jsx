import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Button, Image, Dropdown } from 'react-bootstrap'
import { useAuth0 } from "@auth0/auth0-react";
import { connect } from "react-redux";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { useHistory } from 'react-router-dom';

import { getAllUsers, getNotifications, respondInvitation } from '../redux/actions'
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
        if (props.accesstoken) {
            props.dispatch(getAllUsers(props.accesstoken))
            props.dispatch(getNotifications(props.accesstoken))
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
                            <div className="mr-4">
                                <Typeahead
                                    id="basic-example"
                                    onChange={setSelected}
                                    options={options}
                                    placeholder="Znajdź znajomych..."
                                    selected={selected}
                                />
                            </div>
                            <Dropdown>
                                <Dropdown.Toggle className="btn mr-4" variant="outline-success" id="dropdown-basic">
                                    Powiadomienia
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {props.notifications.map((value, idx) => (
                                        <Dropdown.Item key={idx}>
                                            <div class="card mb-2">
                                                <div class="card-body">
                                                    <p class="card-text m-2">Użytkownik {value.invitationAuthor.firstName} {value.invitationAuthor.lastName} zaprosił Cię do znajomych</p>
                                                    <Button className="mx-2" variant="success"
                                                        onClick={() => props.dispatch(respondInvitation(props.accesstoken, value.id, "accept"))}>
                                                        Potwierdź
                                                    </Button>
                                                    <Button className="mx-2" variant="secondary"
                                                        onClick={() => props.dispatch(respondInvitation(props.accesstoken, value.id, "reject"))}>
                                                        Odrzuć
                                                    </Button>
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Button className="btn mr-4" variant="outline-success" href="/dashboard">Tablica</Button>
                            <Button className="btn mr-4" variant="outline-success" href="/workouts">Treningi</Button>
                            <Button className="btn mr-4" variant="outline-success" href="/account">Moje konto</Button>
                            {/* {props.friends.map((e, idx) => (
                                    <ListGroup.Item key={idx} className="container-fluid">
                                        <Row>
                                            <Col sm={2} className="pl-1 pr-1"><Avatar sauce={e.avatarURL} /></Col>
                                            <Col sm={6} className="d-flex justify-content-center align-self-center" onClick={() => friendClicked(e.id)}>{e.firstName} {e.lastName}</Col>
                                            <Col sm={2} className="d-flex justify-content-center"><Button variant="none" onClick={() => challangeClicked(e)}><BsTrophy /></Button></Col>
                                            <Col sm={2} className="d-flex justify-content-center"><Button variant="none" onClick={() => meetingClicked(e)} ><BsCalendar /></Button></Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))} */}
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