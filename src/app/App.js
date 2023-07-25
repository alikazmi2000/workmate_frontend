import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';
import AppRoutes from './AppRoutes';
import { Provider } from 'react-redux';
import store from './store';

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
