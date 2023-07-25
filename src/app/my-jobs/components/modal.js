import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import { DataRequestAction } from '../../redux/actions/actionUtils';

const Index = ({ openModal, setOpenModal, data }) => {
    const isEdit = data && data._id;
    const dispatch = useDispatch();
    const [serverErrors, setServerErrors] = useState(null);

    const initialValues = {
        name: isEdit ? data.name || '' : '',
        description: isEdit ? data.description || '' : '',
        category: isEdit ? data.category || '' : '',
        type: isEdit ? data.type || '' : '',
    };

    const validationSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        description: yup.string().required('Description is required'),
        category: yup.string().required('Category is required'),
        // jobManager: yup.string().required('Job Manager is required'),
        // jobVendor: yup.string().required('Job Vendor is required'),
        type: yup.string().required('Type is required'),
        // status: yup.string().required('Status is required'),
    });

    const handleSubmit = async (values) => {
        try {
            await validationSchema.validate(values, { abortEarly: false });
            if (isEdit) {
                dispatch(DataRequestAction('POST', 'jobs/update', { ...values, _id: data._id }));
            } else {
                dispatch(DataRequestAction('POST', 'jobs/create', values));
            }
            setOpenModal(false);
            // If validation succeeds, continue with form submission logic here
        } catch (error) {
            // If validation fails, handle the validation errors here
            const validationErrors = {};
            error.inner.forEach((err) => {
                validationErrors[err.path] = err.message;
            });
            setServerErrors(validationErrors);
        }
    };

    const onClose = () => {
        setOpenModal(false);
        setServerErrors(null);
    };

    return (
        <>
            <Modal show={openModal} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEdit ? 'Edit Job' : 'Add Job'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            handleSubmit(values);
                        }}
                    >
                        {({ errors, touched, values }) => (
                            <Form className="pt-3">
                                <div className="form-group">
                                    <Field type="text" name="name" className="form-control form-control-lg" placeholder="Name" />
                                    <div className="text-danger">{touched.name && errors.name}</div>
                                </div>
                                <div className="form-group">
                                    <Field type="text" name="description" className="form-control form-control-lg" placeholder="Description" />
                                    <div className="text-danger">{touched.description && errors.description}</div>
                                </div>
                                {/* <div className="form-group">
                                    <Field type="text" name="category" className="form-control form-control-lg" placeholder="Category" />
                                    <div className="text-danger">{touched.category && errors.category}</div>
                                </div> */}
                                {/* <div className="form-group">
                  <Field type="text" name="assignedTo" className="form-control form-control-lg" placeholder="Assigned To" />
                  <div className="text-danger">{touched.assignedTo && errors.assignedTo}</div>
                </div> */}
                                {/* <div className="form-group">
                  <Field type="text" name="jobRequester" className="form-control form-control-lg" placeholder="Job Requester" />
                  <div className="text-danger">{touched.jobRequester && errors.jobRequester}</div>
                </div> */}
                                {/* <div className="form-group">
                  <Field type="text" name="jobManager" className="form-control form-control-lg" placeholder="Job Manager" />
                  <div className="text-danger">{touched.jobManager && errors.jobManager}</div>
                </div> */}
                                {/* <div className="form-group">
                  <Field type="text" name="jobVendor" className="form-control form-control-lg" placeholder="Job Vendor" />
                  <div className="text-danger">{touched.jobVendor && errors.jobVendor}</div>
                </div> */}
                                <div className="form-group">
                                    <Field as="select" name="category" className="form-control form-control-lg">
                                        <option value="">Category</option>
                                        <option value="carpenting">Carpenting</option>
                                        <option value="plumbing">Plumbing</option>
                                        <option value="flooring">Flooring</option>
                                    </Field>
                                    <div className="text-danger">{touched.category && errors.category}</div>
                                </div>
                                <div className="form-group">
                                    <Field as="select" name="type" className="form-control form-control-lg">
                                        <option value="">Type</option>
                                        <option value="hourly">Hourly</option>
                                        <option value="fixed">Fixed</option>
                                    </Field>
                                    <div className="text-danger">{touched.type && errors.type}</div>
                                </div>
                                {/* <div className="form-group">
                  <Field type="text" name="status" className="form-control form-control-lg" placeholder="Status" />
                  <div className="text-danger">{touched.status && errors.status}</div>
                </div> */}
                                {serverErrors && (
                                    <div className="text-danger">Error: {JSON.stringify(serverErrors)}</div>
                                )}
                                <div className="mt-3">
                                    <Button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
                                        {isEdit ? 'Edit' : 'Add'}
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Index;
