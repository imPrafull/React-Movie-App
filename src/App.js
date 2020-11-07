import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { DateTime } from "luxon";

import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import MovieDetail from './Components/MovieDetail/MovieDetail';
import { httpGet } from './Shared/Api';

function App() {

  let config = JSON.parse(localStorage.getItem('CONFIG'));
  if (!(config?.imgBaseUrl && checkTime(config?.timestamp))) {
    httpGet('configuration')
      .then(data => {
        if (data.errors) {
          console.log(data.errors[0]);
          return;
        }
        let config = {
          imgBaseUrl: data.images.base_url,
          timestamp: DateTime.local()
        }
        localStorage.setItem('CONFIG', JSON.stringify(config));
      });
  }

  function checkTime(storedAt) {
    let start = DateTime.fromISO(storedAt.substring(0, 10));
    let now = DateTime.local();
    let diffInDays = now.diff(start, 'days');
    let diffObject = diffInDays.toObject();
    if (diffObject.days < 15) {
      return true;
    }
    else {
      return false
    }
  }

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
