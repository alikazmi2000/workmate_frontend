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
    const [bidData, setBidData] = useState(undefined);

    const handleSubmit = (values) => {
        console.log('Form values:', values, data);
        dispatch(DataRequestAction('POST', 'bids/create', {
            jobId: data._id,
            bidType: 'worker_bid',
            ...values
        }));
        handleClose();
    };

    const fetchData = async () => {
        const isBided = await DataRequestNoDispatch("POST", 'bids/getUserBidById', { jobId: data._id });
        console.log(isBided);
        if (isBided && isBided.data && isBided.data.workerBid) {
            setBidData(isBided.data.workerBid);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Update the Formik initialValues once bidData is available
    let initialValues = {
        bidPrice: bidData ? bidData.bidPrice : 0,
        workingHours: bidData ? bidData.workingHours : 0,
        milestones: bidData ? bidData.milestones : [''],
        appointmentDate: new Date(),
    };

    const handleAddMilestone = (push) => {
        push('');
    };

    const handleRemoveMilestone = (index, remove) => {
        remove(index);
    };
    console.log(initialValues);
    return (
        <Modal show={openModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Worker Bid</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SurveyViewModal surveyData={data.surveyForm} />
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, touched, errors, setFieldValue }) => (
                        <Form>
                            <div className="mb-3">
                                <label className="form-label">Bid Price</label>
                                <Field
                                    type="number"
                                    name="bidPrice"
                                    className={`form-control ${touched.bidPrice && errors.bidPrice ? 'is-invalid' : ''}`}
                                    readOnly={!!bidData} // If bidData is set, mark the field as read-only
                                />
                                <ErrorMessage name="bidPrice" component="div" className="invalid-feedback" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Working Hours</label>
                                <Field
                                    type="number"
                                    name="workingHours"
                                    className={`form-control ${touched.workingHours && errors.workingHours ? 'is-invalid' : ''}`}
                                    readOnly={!!bidData} // If bidData is set, mark the field as read-only
                                />
                                <ErrorMessage name="workingHours" component="div" className="invalid-feedback" />
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
                                                        readOnly={!!bidData} // If bidData is set, mark the field as read-only
                                                    />
                                                    <Button variant="danger" onClick={() => handleRemoveMilestone(index, remove)}>
                                                        -
                                                    </Button>
                                                    <ErrorMessage name={`milestones[${index}]`} component="div" className="invalid-feedback" />
                                                </div>
                                            ))}
                                            <Button variant="primary" onClick={() => handleAddMilestone(push)}>
                                                Add Milestone
                                            </Button>
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
                                    disabled={!!bidData} // If bidData is set, mark the field as read-only
                                />
                                <ErrorMessage name="appointmentDate" component="div" className="invalid-feedback" />
                            </div>
                            <div className="text-center">
                                <Button type="submit" variant="success" disabled={!!bidData}>
                                    Submit Bid
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Index;
