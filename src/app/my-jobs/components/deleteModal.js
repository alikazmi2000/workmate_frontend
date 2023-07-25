import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const Index = ({openModal,setOpenModal}) => {
    console.log(openModal)
    const onClose = ()=>{
        setOpenModal(false)
    }
    return <>
        <Modal show={openModal} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Row</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={onClose}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    </>

}
export default Index