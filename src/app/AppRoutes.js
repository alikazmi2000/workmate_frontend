import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './shared/Navbar';
import Sidebar from './shared/Sidebar';
import SettingsPanel from './shared/SettingsPanel';
import Footer from './shared/Footer';
import Spinner from '../app/shared/Spinner';

const Error404 = lazy(() => import('./error-pages/Error404'));
const Error500 = lazy(() => import('./error-pages/Error500'));

const Login = lazy(() => import('./user-pages/Login'));
const SignUp = lazy(() => import('./user-pages/Register'));
const Jobs = lazy(() => import('./jobs/index'));
const MyJobs = lazy(() => import('./my-jobs/index'));
const Workers = lazy(() => import('./workers/index'));
const Vendors = lazy(() => import('./vendors/index'));
const Customers = lazy(() => import('./customers/index'));
const Bids = lazy(() => import('./bids/index'));

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <>
            <div className="container-scroller">
              <Navbar />
              <div className="container-fluid page-body-wrapper">
                <Sidebar />
                <div className="main-panel">
                  <div className="content-wrapper">
                    <Component pageUrl={rest?.url || rest?.path} {...props} />
                    <SettingsPanel />
                  </div>
                  <Footer />
                </div>
              </div>
            </div>
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          {/* Public routes */}
          <Route path="/login" component={Login} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/error-pages/error-404" component={Error404} />
          <Route path="/error-pages/error-500" component={Error500} />

          {/* Private routes */}
          <PrivateRoute path="/my-jobs" component={MyJobs} />
          <PrivateRoute exact path="/" component={Jobs} />

          <PrivateRoute path="/workers" component={Workers} />
          <PrivateRoute path="/bid-list" component={Bids} />
          <PrivateRoute path="/vendors" component={Vendors} />
          <PrivateRoute path="/customers" component={Customers} />

          {/* Redirect to /jobs if no route matches */}
          <Redirect to="/" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
