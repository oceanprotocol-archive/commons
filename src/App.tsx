import React, { Component } from 'react';
import { userDefaults, User } from './context/User';
import Routes from './Routes';

class App extends Component {
  render() {
    return (
      <User.Provider value={userDefaults}>
        <Routes />
      </User.Provider>
    );
  }
}

export default App;
