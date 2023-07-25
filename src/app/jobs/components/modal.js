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
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>

}
export default Index