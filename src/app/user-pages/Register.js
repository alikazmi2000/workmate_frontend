import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import { DataRequestAction } from "../redux/actions/actionUtils"
import { useHistory } from "react-router-dom";

const Index = () => {
  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
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
  const token = useSelector((state) => state.user.token);
  const history = useHistory();

  const handleSubmit = async (values) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      dispatch(DataRequestAction("POST", "users/signup", values));
      // If validation succeeds, continue with form submission logic here
    } catch (error) {
      // If validation fails, handle the validation errors here
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
    }
  }
  useEffect(() => {
    if (token != null) {
      history.push("/");
    }
  }, [token])
  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img src={require("../../assets/images/logo.svg")} alt="logo" />
              </div>
              <h4>New here?</h4>
              <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6>
              <Formik
                initialValues={{
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                  phoneNumber: '',
                  role: '',
                }}
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
                        <option value="customer">Customer</option>
                        <option value="vendor">Vendor</option>
                      </Field>
                      <div className="text-danger">{touched.role && errors.role}</div>
                    </div>
                    <div className="form-group">
                      <Field type="password" name="password" className="form-control form-control-lg" placeholder="Password" />
                      <div className="text-danger">{touched.password && errors.password}</div>
                    </div>
                    <div className="form-group">
                      <Field type="password" name="confirmPassword" className="form-control form-control-lg" placeholder="Confirm Password" />
                      <div className="text-danger">{touched.confirmPassword && errors.confirmPassword}</div>
                    </div>
                    <div className="form-group">
                      <Field type="email" name="email" className="form-control form-control-lg" placeholder="Email" />
                      <div className="text-danger">{touched.email && errors.email}</div>
                    </div>

                    <div className="mb-4">
                      <div className="form-check">
                        <label className="form-check-label text-muted">
                          <Field type="checkbox" name="termsAndConditions" className="form-check-input" />
                          <i className="input-helper"></i>
                          I agree to all Terms & Conditions
                        </label>
                      </div>
                    </div>
                    <div className="mt-3">
                      <button type="button" onClick={() => {
                        handleSubmit(values);
                      }} className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
                        SIGN UP
                      </button>
                    </div>
                    <div className="text-center mt-4 font-weight-light">
                      Already have an account? <Link to="/login" className="text-primary">Login</Link>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;