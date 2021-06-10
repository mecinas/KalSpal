import React, { useState } from 'react';
import { Card, Button, Table, Form, Col } from 'react-bootstrap';
import { Pencil } from 'react-bootstrap-icons';
import { useAuth0 } from '@auth0/auth0-react';
import { connect } from 'react-redux'
import {useHistory} from 'react-router-dom'

import {removeUser, cleanRegistered} from '../../redux/actions'
import EditProfileModal from './AccountEdit'
import '../../styles/account/AccountInfoTable.css'

function AccountInfoTable(props) {
    const history = useHistory();
    const { user, logout } = useAuth0();
    const [modalTitle, setModalTitle] = useState();
    const [modalForm, setModalForm] = useState();
    const [modalURL, setModalURL] = useState();

    const [showEditModal, setShowEditModal] = useState(false);
    const handleShowEditModal = () => setShowEditModal(true);
    const handleCloseEditModal = () => setShowEditModal(false);

    const setModalForName = () => {
        setModalTitle("Edytuj swoje imię i nazwisko")
        setModalURL("http://localhost:5000/account/change/name")
        setModalForm(
            <div>
                <Form.Group controlId="formBasicFirstname">
                    <Form.Control type="text" name='firstName' placeholder="Podaj nowe imię" />
                </Form.Group>

                <Form.Group controlId="formBasicSurname">
                    <Form.Control type="text" name='lastName' placeholder="Podaj nowe nazwisko" />
                </Form.Group>
            </div>
        )
    }

    const setModalForDateOfBirth = () => {
        setModalTitle("Edytuj swoją datę urodzenia")
        setModalURL("http://localhost:5000/account/change/dateOfBirth")
        setModalForm(
            <div>
                <Form.Group controlId="formBasicDateOfBirth">
                    <Form.Control type="date" name='birthDate' placeholder="Podaj datę urodzenia" />
                </Form.Group>
            </div>
        )
    }
    
    const deleteUser = (e) => {
        props.dispatch(removeUser(props.accesstoken))
        sessionStorage.removeItem('isRegistered')
        logout({ returnTo: window.location.origin })
        history.push("/")
    }

    return (
        <Col xl={10}>
            {user &&
                <EditProfileModal
                    showEditModal={showEditModal}
                    handleCloseEditModal={handleCloseEditModal}
                    title={modalTitle}
                    form={modalForm}
                    modalURL={modalURL}
                    email={user.email} />
            }
                <Card className="text-center">
                    <Card.Header>Profil</Card.Header>
                    <Card.Body >
                        <Card.Title className="text-left">Twoje informacje</Card.Title>
                        <Table striped className="text-left">
                            <tbody>
                                <tr>
                                    <td>Imię i nazwisko</td>
                                    <td>{props.user.firstName} {props.user.lastName}</td>
                                    <td>
                                        <Button className="pencil_table_ico" variant="light" onClick={() => {
                                            setModalForName();
                                            handleShowEditModal();
                                        }}>
                                            <Pencil color="brown" size={20} />
                                        </Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Data urodzenia</td>
                                    <td>{props.user.birthDate}</td>
                                    <td>
                                        <Button className="pencil_table_ico" variant="light" onClick={() => {
                                            setModalForDateOfBirth();
                                            handleShowEditModal();
                                        }}>
                                            <Pencil color="brown" size={20} />
                                        </Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Adres e-mail</td>
                                    <td colSpan="2">{props.user.email}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer>
                        <Button 
                            variant="outline-danger" 
                            onClick={deleteUser}>
                            Usuń konto
                        </Button>{/* Dodać usuwanie usera */}
                    </Card.Footer>
                </Card>
        </Col>
    )
}
function mapStateToProps(state) {
    return state
}

export default AccountInfoTable = connect(mapStateToProps)(AccountInfoTable)
