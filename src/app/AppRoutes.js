import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './shared/Navbar';
import Sidebar from './shared/Sidebar';
import SettingsPanel from './shared/SettingsPanel';
import Footer from './shared/Footer';

import Spinner from '../app/shared/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const Buttons = lazy(() => import('./basic-ui/Buttons'));
const Dropdowns = lazy(() => import('./basic-ui/Dropdowns'));

const BasicElements = lazy(() => import('./form-elements/BasicElements'));

const BasicTable = lazy(() => import('./tables/BasicTable'));

const Mdi = lazy(() => import('./icons/Mdi'));

const ChartJs = lazy(() => import('./charts/ChartJs'));

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


const PublicRoute = ({ component: Component, ...rest }) => {

  return <Route
    {...rest}
    render={props => {
      return <>
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
    }

    }
  />
}
class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <PublicRoute exact path="/" component={BasicTable} />


          <PublicRoute path="/jobs" component={Jobs} />
          <PublicRoute path="/my-jobs" component={MyJobs} />
          <PublicRoute path="/workers" component={Workers} />
          <PublicRoute path="/bid-list" component={Bids} />
          <PublicRoute path="/vendors" component={Vendors} />
          <PublicRoute path="/customers" component={Customers} />
          <Route path="/login" component={Login} />
          <Route path="/sign-up" component={SignUp} />

          <PublicRoute path="/error-pages/error-404" component={Error404} />
          <PublicRoute path="/error-pages/error-500" component={Error500} />


          <Redirect to="/dashboard" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;