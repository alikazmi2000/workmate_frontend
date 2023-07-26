import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray, useFormikContext } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatetimePicker from 'react-datetime-picker';
import { useDispatch } from 'react-redux';
import { DataRequestAction, DataRequestNoDispatch } from '../../redux/actions/actionUtils';
import SurveyViewModal from './surveyViewModal';

const validationSchema = Yup.object().shape({
    bidPrice: Yup.number().required('Bid price is required').min(0, 'Bid price must be a positive number'),
    workingHours: Yup.number().required('Working hours is required').min(0, 'Working hours must be a positive number'),
    milestones: Yup.array().of(Yup.string().required('Milestone is required')),
    appointmentDate: Yup.date().required('Appointment date is required'),
});

const Index = ({ openModal, setOpenModal, data }) => {
    const dispatch = useDispatch();
    const handleClose = () => {
        setOpenModal(false);
    };

    const handleAssign = (values) => {
        dispatch(DataRequestAction('POST', 'bids/assignWorkerBid', {
            jobId: data.jobData._id,
            workerId: data.bidData && data.bidData.bidder[0] && data.bidData.bidder[0]._id,
            bidId:data.bidData._id
        }));
        handleClose();
    };



    // Update the Formik initialValues once bidData is available
    let initialValues = {
        bidPrice: data.bidData.workerBid.bidPrice,
        workingHours: data.bidData.workerBid.workingHours,
        milestones: data.bidData.workerBid.milestones,
        appointmentDate: data.bidData.workerBid.appointmentDate,
    };


    console.log(data);
    return (
        <Modal show={openModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Worker Bid</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SurveyViewModal surveyData={data.jobData.surveyForm} />
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >
                    {({ values, touched, errors, setFieldValue }) => (
                        <Form>
                            <div className="mb-3">
                                <label className="form-label">Bid Price</label>
                                <Field
                                    type="number"
                                    name="bidPrice"
                                    className={`form-control ${touched.bidPrice && errors.bidPrice ? 'is-invalid' : ''}`}
                                    readOnly={true} // If bidData is set, mark the field as read-only
                                />
                                {/* <ErrorMessage name="bidPrice" component="div" className="invalid-feedback" /> */}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Working Hours</label>
                                <Field
                                    type="number"
                                    name="workingHours"
                                    className={`form-control ${touched.workingHours && errors.workingHours ? 'is-invalid' : ''}`}
                                    readOnly={true} // If bidData is set, mark the field as read-only
                                />
                                {/* <ErrorMessage name="workingHours" component="div" className="invalid-feedback" /> */}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Milestones</label>
                                <FieldArray name="milestones">
                                    {({ push, remove }) => (
                                        <div>
                                            {values.milestones.map((milestone, index) => (
                                                <div key={index} className="input-group mb-3">
                                                    <Field
                                                        type="text"
                                                        name={`milestones[${index}]`}
                                                        className={`form-control ${touched.milestones?.[index] && errors.milestones?.[index] ? 'is-invalid' : ''}`}
                                                        readOnly={true} // If bidData is set, mark the field as read-only
                                                    />
                                                    {/* <Button variant="danger" onClick={() => handleRemoveMilestone(index, remove)}>
                                                        -
                                                    </Button> */}
                                                    {/* <ErrorMessage name={`milestones[${index}]`} component="div" className="invalid-feedback" /> */}
                                                </div>
                                            ))}
                                            {/* <Button variant="primary" onClick={() => handleAddMilestone(push)}>
                                                Add Milestone
                                            </Button> */}
                                        </div>
                                    )}
                                </FieldArray>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Appointment Date</label>
                                <DatetimePicker
                                    name="appointmentDate"
                                    value={values.appointmentDate}
                                    onChange={(value) => setFieldValue('appointmentDate', value)}
                                    className={`form-control ${touched.appointmentDate && errors.appointmentDate ? 'is-invalid' : ''}`}
                                    disabled={true} // If bidData is set, mark the field as read-only
                                />
                                {/* <ErrorMessage name="appointmentDate" component="div" className="invalid-feedback" /> */}
                            </div>

                        </Form>
                    )}
                </Formik>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAssign}>
                    Assign
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Index;
