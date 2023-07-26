import React, { Component } from 'react';
import { useDispatch } from 'react-redux';
import { DataRequestAction } from '../../redux/actions/actionUtils';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const Index = ({ openModal, setOpenModal, data }) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("userData"));
    const onClose = () => {
        setOpenModal(false)
    }
    const onAccept = () => {
        dispatch(DataRequestAction('POST', 'jobs/startJob', { _id: data._id }));

    }
    return <>
        <Modal show={openModal} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Dear {user.first_name + ' ' + user.last_name} </Modal.Title>
            </Modal.Header>
            <Modal.Body>You are ready to manage this job</Modal.Body>
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