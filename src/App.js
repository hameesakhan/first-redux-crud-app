import React from 'react'
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import logo from './logo.svg';
import './App.css';

import { UsersList } from './features/users/UsersList'
import { UserPage } from './features/users/UserPage'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/users" element={<UsersList />} />
              <Route exact path="/users/:userId" element={<UserPage />} />
            </Switch>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
