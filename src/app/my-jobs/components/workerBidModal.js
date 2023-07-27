import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray, useFormikContext } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatetimePicker from 'react-datetime-picker';
import { useDispatch } from 'react-redux';
import { DataRequestAction } from '../../redux/actions/actionUtils';
import SurveyViewModal from './surveyViewModal';

const validationSchema = Yup.object().shape({
    bidPrice: Yup.number().required('Bid price is required').min(0, 'Bid price must be a positive number'),
    workingHours: Yup.number().required('Working hours is required').min(0, 'Working hours must be a positive number'),
    milestones: Yup.array().of(Yup.string().required('Milestone is required')),
    appointmentDate: Yup.date().required('Appointment date is required'),
});

const Index = ({ openModal, setOpenModal, data, jobMode = '', setJobMode, role = 'worker' }) => {
    const dispatch = useDispatch();
    const handleClose = () => {
        setOpenModal(false);
    };
    const handleSubmit = (values) => {
        console.log('Form values:', values, data);
        if (jobMode == 'bid') {
            dispatch(DataRequestAction('POST', 'bids/create', {
                jobId: data._id,
                bidType: 'worker_bid',
                ...values

            }));
            setJobMode('')
        }
        else if (jobMode == 'initialize') {
            dispatch(DataRequestAction('POST', 'jobs/initializeJob', {
                _id: data._id,
                ...values

            }));
            setJobMode('')

        }
        else if (jobMode === 'completed' && role == 'worker') {
            dispatch(DataRequestAction('POST', 'jobs/completeJob', {
                _id: data._id,
                ...values

            }));
            setJobMode('')
        }
        else if (jobMode === 'not_paid' && role == 'manager') {
            dispatch(DataRequestAction('POST', 'jobs/askPayment', {
                _id: data._id,
                ...values

            }));
            setJobMode('')
        }
        handleClose();
    };

    let workerbid = data.assignedWorkerBid && data.assignedWorkerBid.workerBid || {}
    return (
        <Modal show={openModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Worker Bid</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SurveyViewModal surveyData={data.surveyForm} mode={'read'} />

                <Formik
                    initialValues={{
                        bidPrice: workerbid && workerbid.bidPrice || '',
                        workingHours: workerbid && workerbid.workingHours || '',
                        milestones: workerbid && workerbid.milestones || [''],
                        appointmentDate: workerbid && workerbid.appointmentDate || new Date(),
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
                                    readOnly={['initialize', 'completed'].includes(jobMode)}
                                />
                                {/* <ErrorMessage name="bidPrice" component="div" className="invalid-feedback" /> */}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Working Hours</label>
                                <Field
                                    type="number"
                                    name="workingHours"
                                    className={`form-control ${touched.workingHours && errors.workingHours ? 'is-invalid' : ''}`}
                                    readOnly={['initialize', 'completed'].includes(jobMode)}

                                />
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

                                                        readOnly={['initialize', 'completed'].includes(jobMode)}

                                                    />

                                                </div>
                                            ))}

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
                                    disabled={['initialize', 'completed'].includes(jobMode)}
                                    className={`form-control ${touched.appointmentDate && errors.appointmentDate ? 'is-invalid' : ''}`}
                                />
                            </div>
                            <div className="text-center">
                                <Button type="submit" variant="primary">
                                    {jobMode == 'bid'  && role == 'worker' && ' Submit Bid'}
                                    {jobMode == 'completed' && role == 'worker' && ' Submit For Review'}
                                    {jobMode == 'initialize'  && role == 'worker' && ' Initialize Job'}
                                    {jobMode == 'not_paid' && role == 'manager' && 'Request Payment'}
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
