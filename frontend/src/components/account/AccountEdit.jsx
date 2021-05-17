import axios from 'axios';
import React from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

export default function EditProfileModal(props) {

  const onFormSubmit = (e) => {
    e.preventDefault();
    var formData = new FormData(e.target)
    formData = Object.fromEntries(formData.entries())
    formData["email"] = props.email
    updateProfileData(props.modalURL, formData)
    props.handleCloseEditModal();
  }

  const updateProfileData = (url, data) => {
    axios.put(url, data)
      .then(resp => {

      }).catch(error => {
        console.log(error.message)
      })
  }

  return (
    <Modal show={props.showEditModal} onHide={props.handleCloseEditModal} onSubmit={onFormSubmit}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {props.form}
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleCloseEditModal}>
              Zamknij
          </Button>
            <Button type="submit" variant="success">
              Zatwierdź
          </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
