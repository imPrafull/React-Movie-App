import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import MovieDetail from './Components/MovieDetail/MovieDetail';
import { getConfig, getGenres } from './Shared/Api';

function App() {

  getConfig()
    .then(data => {
      if (data.errors) {
        console.log(data.errors[0]);
        return;
      }
    });

  getGenres()
    .then(data => {
      if (data.errors) {
        console.log(data.errors[0]);
        return;
      }
    });

  return (
    <Router>
      <Switch>
        <Route path="/:id" component={MovieDetail} />
        <Route path="/" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
