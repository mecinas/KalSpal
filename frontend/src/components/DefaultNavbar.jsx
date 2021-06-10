import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Button, Image, Dropdown } from 'react-bootstrap'
import { useAuth0 } from "@auth0/auth0-react";
import { connect } from "react-redux";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { useHistory } from 'react-router-dom';

import { getAllUsers, getNotifications, respondInvitation, deleteChallenge } from '../redux/actions'
import logo from '../resources/company_logo.png'
import "../styles/DefaultNavbar.css"

function DefaultNavbar(props) {
    const { logout } = useAuth0();
    const history = useHistory();
    const [selected, setSelected] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (selected.length > 0) {
            history.push("/user/" + selected[0].id)
        }
    }, [selected])

    useEffect(() => {
        if (props.registered === "Registered" && props.accesstoken) {
            props.dispatch(getAllUsers(props.accesstoken))
            props.dispatch(getNotifications(props.accesstoken))
        }
    }, [props.accesstoken, props.registered])

    useEffect(() => {
        if (props.allusers !== undefined) {
            var array_of_names = []
            props.allusers.map((user) => {
                array_of_names.push({ label: user.firstName + " " + user.lastName, id: user.id })
            })
            setOptions(array_of_names)
        }
    }, [props.allusers])

    const LogoutButton = () => {
        return (
            <Button variant="outline-success" onClick={orderLogout}>
                Wyloguj
            </Button>
        );
    };

    const orderLogout = () => {
        sessionStorage.removeItem('isRegistered')
        logout({ returnTo: window.location.origin })
    }

    return (
        <div>
            <Navbar bg="warning" className="mb-3">
                <Navbar.Brand>
                    <Image src={logo} className="logo-img" />
                </Navbar.Brand>

                <Nav className="ml-auto">
                    {props.registered !== "Registered" &&
                        <Button className="btn-navbar" variant="outline-success" href="/">Dowiedz się więcej o nas</Button>
                    }
                    {props.registered === "Registered" &&
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

                                        value.text ? (
                                            <Dropdown.Item key={idx}>
                                                <div className="card my-2" >
                                                    <div className="card-body">
                                                        <div class="card-header">
                                                            Użytkownik {value.invitationAuthor.firstName} {value.invitationAuthor.lastName} rzucił ci wyzwanie
                                                        </div>
                                                        <p className="card-text mx-4 my-2">
                                                            {value.text.split(",")[0] + ","}
                                                            <br />
                                                            {value.text.split(",")[1]}
                                                        </p>
                                                        <Button className="mx-4" variant="secondary"
                                                            onClick={() => props.dispatch(deleteChallenge(props.accesstoken, value.id))}>
                                                            Usuń
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Dropdown.Item>
                                        ) : (
                                            <Dropdown.Item key={idx}>
                                                <div className="card my-2">
                                                    <div className="card-body">
                                                        <div class="card-header">
                                                            Użytkownik {value.invitationAuthor.firstName} {value.invitationAuthor.lastName} zaprosił cię do znajomych
                                                        </div>
                                                        <Button className="ml-4 mr-2 mt-2" variant="success"
                                                            onClick={() => props.dispatch(respondInvitation(props.accesstoken, value.id, "accept"))}>
                                                            Potwierdź
                                                        </Button>
                                                        <Button className="mx-2 mt-2" variant="secondary"
                                                            onClick={() => props.dispatch(respondInvitation(props.accesstoken, value.id, "reject"))}>
                                                            Odrzuć
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Dropdown.Item>
                                        )

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