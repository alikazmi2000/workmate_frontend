import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DataRequestAction } from '../../redux/actions/actionUtils';
import Button from 'react-bootstrap/Button';
import DateTimePicker from 'react-datetime-picker';
import Modal from 'react-bootstrap/Modal';
const Index = ({ openModal, setOpenModal, data }) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("userData"));
    const [value, setValue] = useState(new Date());

    const onClose = () => {
        setOpenModal(false)
    }
    const onAccept = () => {
        dispatch(DataRequestAction('POST', 'jobs/startJob', { _id: data._id }));

    }
    return <>
        <Modal show={openModal} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Dear {user.firstName + ' ' + user.lastName} </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <p>Please Select a Appointment Time</p>
                <div>
                    <DateTimePicker onChange={setValue} value={value} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="success" onClick={onAccept}>
                    I am
                </Button>
            </Modal.Footer>
        </Modal>
    </>

}
export default Index