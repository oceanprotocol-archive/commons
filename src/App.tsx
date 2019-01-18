import React, { Component } from 'react';
import { userDefults, User } from './context/User';
import Routes from './Routes';
import './App.css';

class App extends Component {
  render() {
    return (
      <User.Provider value={userDefults}>
        <Routes />
      </User.Provider>
    );
  }
}

export default App;
