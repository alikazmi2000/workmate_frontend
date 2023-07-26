import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray, useFormikContext } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatetimePicker from 'react-datetime-picker';
import { useDispatch } from 'react-redux';
import { DataRequestAction } from '../../redux/actions/actionUtils';

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

    const handleSubmit = (values) => {
        console.log('Form values:', values, data);
        dispatch(DataRequestAction('POST', 'bids/create', {
            jobId: data._id,
            bidType:'worker_bid',
            ...values

        }));
        handleClose();
    };

    const handleAddMilestone = (push) => {
        push('');
    };

    const handleRemoveMilestone = (index, remove) => {
        remove(index);
    };

    return (
        <Modal show={openModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Worker Bid</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        bidPrice: '',
                        workingHours: '',
                        milestones: [''],
                        appointmentDate: new Date(),
                    }}
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
                                />
                                <ErrorMessage name="bidPrice" component="div" className="invalid-feedback" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Working Hours</label>
                                <Field
                                    type="number"
                                    name="workingHours"
                                    className={`form-control ${touched.workingHours && errors.workingHours ? 'is-invalid' : ''}`}
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
                                                        className={`form-control ${touched.milestones?.[index] && errors.milestones?.[index] ? 'is-invalid' : ''
                                                            }`}
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
                                />
                                <ErrorMessage name="appointmentDate" component="div" className="invalid-feedback" />
                            </div>
                            <div className="text-center">
                                <Button type="submit" variant="success">
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
