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
    bidPrice: Yup.number().required('Total cost is required').min(0, 'Total cost must be a positive number'),
    equipments: Yup.array().of(
        Yup.object().shape({
            equipmentName: Yup.string().required('Equipment name is required'),
            description: Yup.string().required('Description is required'),
            timeOfDelivery: Yup.date().required('Time of delivery is required'),
        })
    ),
    appointmentDate: Yup.date().required('Schedule time is required'),
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
            bidType: 'vendor_bid',
            ...values,
        }));
        handleClose();
    };

    const fetchData = async () => {
        const isBided = await DataRequestNoDispatch("POST", 'bids/getUserBidById', { jobId: data._id });
        console.log(isBided);
        if (isBided && isBided.data && isBided.data.vendorBid) {
            setBidData(isBided.data.vendorBid);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    let initialValues = {
        bidPrice: bidData ? bidData.bidPrice : 0,
        equipments: bidData ? bidData.equipments : [{ equipmentName: '', description: '', timeOfDelivery: new Date() }],
        appointmentDate: new Date(),
    };

    const handleAddEquipment = (push) => {
        push({ equipmentName: '', description: '', timeOfDelivery: new Date() });
    };

    const handleRemoveEquipment = (index, remove) => {
        remove(index);
    };

    return (
        <Modal show={openModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Vendor Bid</Modal.Title>
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
                                <label className="form-label">Total Cost of Equipments</label>
                                <Field
                                    type="number"
                                    name="bidPrice"
                                    className={`form-control ${touched.bidPrice && errors.bidPrice ? 'is-invalid' : ''}`}
                                    readOnly={!!bidData}
                                />
                                <ErrorMessage name="bidPrice" component="div" className="invalid-feedback" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Equipments Breakdown</label>
                                <FieldArray name="equipments">
                                    {({ push, remove }) => (
                                        <div>
                                            {values.equipments.map((equipment, index) => (
                                                <div key={index}>
                                                    <div className="mb-3">
                                                        <label className="form-label">Equipment Name</label>
                                                        <Field
                                                            type="text"
                                                            name={`equipments[${index}].equipmentName`}
                                                            className={`form-control ${
                                                                touched.equipments?.[index]?.equipmentName && errors.equipments?.[index]?.equipmentName
                                                                    ? 'is-invalid'
                                                                    : ''
                                                            }`}
                                                            readOnly={!!bidData} 
                                                        />
                                                        <ErrorMessage
                                                            name={`equipments[${index}].equipmentName`}
                                                            component="div"
                                                            className="invalid-feedback"
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Description</label>
                                                        <Field
                                                            as="textarea"
                                                            name={`equipments[${index}].description`}
                                                            className={`form-control ${
                                                                touched.equipments?.[index]?.description &&
                                                                errors.equipments?.[index]?.description
                                                                    ? 'is-invalid'
                                                                    : ''
                                                            }`}
                                                            readOnly={!!bidData} 
                                                        />
                                                        <ErrorMessage
                                                            name={`equipments[${index}].description`}
                                                            component="div"
                                                            className="invalid-feedback"
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Time of Delivery</label>
                                                        <DatetimePicker
                                                            name={`equipments[${index}].timeOfDelivery`}
                                                            value={values.equipments[index].timeOfDelivery}
                                                            onChange={(value) =>
                                                                setFieldValue(`equipments[${index}].timeOfDelivery`, value)
                                                            }
                                                            className={`form-control ${
                                                                touched.equipments?.[index]?.timeOfDelivery &&
                                                                errors.equipments?.[index]?.timeOfDelivery
                                                                    ? 'is-invalid'
                                                                    : ''
                                                            }`}
                                                            disabled={!!bidData} 
                                                        />
                                                        <ErrorMessage
                                                            name={`equipments[${index}].timeOfDelivery`}
                                                            component="div"
                                                            className="invalid-feedback"
                                                        />
                                                    </div>
                                                    <Button variant="danger" onClick={() => handleRemoveEquipment(index, remove)}>
                                                        Remove Equipment
                                                    </Button>
                                                </div>
                                            ))}
                                            <Button variant="primary" onClick={() => handleAddEquipment(push)}>
                                                Add Equipment
                                            </Button>
                                        </div>
                                    )}
                                </FieldArray>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description of How Equipments Will Be Provided</label>
                                <Field
                                    as="textarea"
                                    name="descriptionOfDelivery"
                                    className={`form-control ${
                                        touched.descriptionOfDelivery && errors.descriptionOfDelivery
                                            ? 'is-invalid'
                                            : ''
                                    }`}
                                    readOnly={!!bidData} 
                                />
                                <ErrorMessage name="descriptionOfDelivery" component="div" className="invalid-feedback" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Schedule Time</label>
                                <DatetimePicker
                                    name="appointmentDate"
                                    value={values.appointmentDate}
                                    onChange={(value) => setFieldValue('appointmentDate', value)}
                                    className={`form-control ${touched.appointmentDate && errors.appointmentDate ? 'is-invalid' : ''}`}
                                    disabled={!!bidData} 
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
