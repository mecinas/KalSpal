import {connect} from 'react-redux'
import {useState, useEffect} from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import {updateUser} from '../../redux/actions'

function AccountEdit(props) {
  const [rerender, setRerender] = useState();

  const onFormSubmit = (e) => {
    e.preventDefault();
    var formData = new FormData(e.target)
    formData = Object.fromEntries(formData.entries())
    props.dispatch(updateUser(props.accesstoken, formData))
    props.handleCloseEditModal();
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

function mapStateToProps(state){
    return state
}

export default AccountEdit = connect(mapStateToProps)(AccountEdit)