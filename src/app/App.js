import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';
import AppRoutes from './AppRoutes';
import { Provider } from 'react-redux';
import store from './store';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
class App extends Component {
  state = {}
  componentDidMount() {
    this.onRouteChanged();
  }
  render() {
    return (
      <Provider store={store}>

        <AppRoutes />
        {/* {SettingsPanelComponent} */}

      </Provider>

    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
  
  }

}

export default withRouter(App);
