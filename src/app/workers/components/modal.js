import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import { DataRequestAction } from "../../redux/actions/actionUtils"

const Index = ({ openModal, setOpenModal, data }) => {
    const isEdit = data && data._id || undefined;
    const dispatch = useDispatch();
    let initialValues = {};
    let validationSchema = undefined;

    if (isEdit) {
        initialValues = {
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            phoneNumber: data.phoneNumber || '',
            role: data.role || '',
        }
        validationSchema = yup.object().shape({
            firstName: yup.string().required('First Name is required'),
            lastName: yup.string().required('Last Name is required'),
            phoneNumber: yup.string().required('Phone Number is required'),
            role: yup.string().required('Role is required'),
            email: yup.string().email('Invalid email format').required('Email is required'),
        });
    }
    else {
        initialValues = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            role: '',
            password: '',
            confirmPassword: '',
        }
        validationSchema = yup.object().shape({
            firstName: yup.string().required('First Name is required'),
            lastName: yup.string().required('Last Name is required'),
            phoneNumber: yup.string().required('Phone Number is required'),
            role: yup.string().required('Role is required'),
            password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long'),
            confirmPassword: yup
                .string()
                .oneOf([yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required'),
            email: yup.string().email('Invalid email format').required('Email is required'),
        });
    }

    const handleSubmit = async (values) => {
        try {
            await validationSchema.validate(values, { abortEarly: false });
            if (isEdit) {
                dispatch(DataRequestAction("POST", "users/update", { ...values, _id: data._id }));
            } else {
                dispatch(DataRequestAction("POST", "users/addUser", values));
            }
            setOpenModal(false);
            // If validation succeeds, continue with form submission logic here
        } catch (error) {
            // If validation fails, handle the validation errors here
            const validationErrors = {};
            error.inner.forEach((err) => {
                validationErrors[err.path] = err.message;
            });
            console.log('Validation errors:', validationErrors);
        }
    }
    const onClose = () => {
        setOpenModal(false)
    }

    return <>
        <Modal show={openModal} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema} // Add this line to apply validation
                // onSubmit={async (values) => {
                //   await new Promise((r) => setTimeout(r, 500));
                //   alert(JSON.stringify(values, null, 2));
                // }}
                >
                    {({ errors, touched, values }) => (
                        <Form className="pt-3" >
                            <div className="form-group">
                                <Field type="text" name="firstName" className="form-control form-control-lg" placeholder="First Name" />
                                <div className="text-danger">{touched.firstName && errors.firstName}</div>
                            </div>
                            <div className="form-group">
                                <Field type="text" name="lastName" className="form-control form-control-lg" placeholder="Last Name" />
                                <div className="text-danger">{touched.lastName && errors.lastName}</div>
                            </div>
                            <div className="form-group">
                                <Field type="text" name="phoneNumber" className="form-control form-control-lg" placeholder="Phone Number" />
                                <div className="text-danger">{touched.phoneNumber && errors.phoneNumber}</div>
                            </div>
                            <div className="form-group">
                                <Field as="select" name="role" className="form-control form-control-lg">
                                    <option value="">Role</option>
                                    <option value="worker">Worker</option>
                                </Field>
                                <div className="text-danger">{touched.role && errors.role}</div>
                            </div>
                            {!isEdit && (
                                <>
                                    <div className="form-group">
                                        <Field type="password" name="password" className="form-control form-control-lg" placeholder="Password" />
                                        <div className="text-danger">{touched.password && errors.password}</div>
                                    </div>
                                    <div className="form-group">
                                        <Field type="password" name="confirmPassword" className="form-control form-control-lg" placeholder="Confirm Password" />
                                        <div className="text-danger">{touched.confirmPassword && errors.confirmPassword}</div>
                                    </div>
                                </>
                            )}
                            <div className="form-group">
                                <Field type="email" name="email" className="form-control form-control-lg" placeholder="Email" />
                                <div className="text-danger">{touched.email && errors.email}</div>
                            </div>

                            <div className="mt-3">
                                <button type="button" onClick={() => {
                                    handleSubmit(values);
                                }} className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
                                    {isEdit ? "Edit" : "Add"}
                                </button>
                            </div>

                        </Form>
                    )}
                </Formik>
            </Modal.Body>
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