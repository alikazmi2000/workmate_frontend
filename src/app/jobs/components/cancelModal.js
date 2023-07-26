import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DataRequestAction } from '../../redux/actions/actionUtils';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Index = ({ openModal, setOpenModal, data, type = 'cancel' }) => {
    const dispatch = useDispatch();
    const [cancelReason, setCancelReason] = useState('');

    const onClose = () => {
        setOpenModal(false);
    };

    const onCancel = () => {
        dispatch(DataRequestAction('POST', 'jobs/cancelJob', { _id: data._id, cancelReason: cancelReason }));
        // Reset the cancelReason state after submitting the reason
        setCancelReason('');
        setOpenModal(false);
    };

    return (
        <>
            <Modal show={openModal} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cancel Job</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {data && data.cancelReason && data.cancelReason != null && data.status == 'cancelled' && (
                        <>
                            <p style={{fontWeight:'500',fontSize:'1.2rem'}}>The reason it was cancelled because :</p>
                            <p style={{fontWeight:'400',fontSize:'1.1rem'}}>{data.cancelReason}</p>
                        </>

                    )}
                    {
                        data.status !== 'cancelled' && (
                            <>
                                <p>Are you sure you want to cancel?</p>
                                {/* Form input for the cancel reason */}
                                <input
                                    type="text"
                                    value={cancelReason}
                                    onChange={(e) => setCancelReason(e.target.value)}
                                    placeholder="Reason for cancellation"
                                    className="form-control"
                                />
                            </>
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    {data.status !== 'cancelled' && (
                        <Button variant="danger" onClick={onCancel}>
                            Cancel
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Index;
