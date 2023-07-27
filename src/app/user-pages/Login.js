import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import { DataRequestAction } from "../redux/actions/actionUtils";
import { Button } from 'react-bootstrap';
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required'),
    role: yup.string().required('Role is required'),
  });
  const token = useSelector((state) => state.user.token);
  debugger;
  console.log("STATE=========",token);
  const history = useHistory();
  const handleSubmit = async (values) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      dispatch(DataRequestAction("POST", "users/login", values));
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      console.log('Validation errors:', validationErrors);
    }
  }
  useEffect(() => {
    console.log("STATE=========",token);
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
              <h4>Hello! Welcome back</h4>
              <h6 className="font-weight-light">Sign in to your account.</h6>
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                  role: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, values }) => (
                  <Form className="pt-3">
                    <div className="form-group">
                      <Field type="email" name="email" className="form-control form-control-lg" placeholder="Email" />
                      <div className="text-danger">{touched.email && errors.email}</div>
                    </div>
                    <div className="form-group">
                      <Field type="password" name="password" className="form-control form-control-lg" placeholder="Password" />
                      <div className="text-danger">{touched.password && errors.password}</div>
                    </div>
                    <div className="form-group">
                      <Field as="select" name="role" className="form-control form-control-lg">
                        <option value="">Role</option>
                        <option value="worker">Worker</option>
                        <option value="customer">Customer</option>
                        <option value="vendor">Vendor</option>
                        <option value="manager">Manager</option>
                      </Field>
                      <div className="text-danger">{touched.role && errors.role}</div>
                    </div>
                    <div className="mt-3">
                      <Button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN IN</Button>
                    </div>
                    <div className="my-2 d-flex justify-content-between align-items-center">
                      <div className="form-check">
                        <label className="form-check-label text-muted">
                          <Field type="checkbox" name="keepSignedIn" className="form-check-input" />
                          <i className="input-helper"></i>
                          Keep me signed in
                        </label>
                      </div>
                      <Link to="/forgot-password" className="auth-link text-black">Forgot password?</Link>
                    </div>
                    <div className="mb-2">
                      <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                        <i className="mdi mdi-facebook mr-2"></i>Connect using Facebook
                      </button>
                    </div>
                    <div className="text-center mt-4 font-weight-light">
                      Don't have an account? <Link to="/sign-up" className="text-primary">Create</Link>
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

export default Login;
