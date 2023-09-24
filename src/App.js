import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { DateTime } from "luxon";

import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import MovieDetail from './Components/MovieDetail/MovieDetail';
import Error from './Components/Error/Error';
import { httpGet } from './Shared/Api';

function App() {
  const history = useNavigate();

  let config = JSON.parse(localStorage.getItem('CONFIG'));
  if (!(config?.imgBaseUrl && checkTime(config?.timestamp))) {
    httpGet('configuration')
      .then(data => {
        if (data) {
          let config = {
            imgBaseUrl: data.images.base_url,
            timestamp: DateTime.local()
          }
          localStorage.setItem('CONFIG', JSON.stringify(config));
        } else {
          history.push("/error");
        }
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
    <Routes>
      <Route exact path="/" element={<Dashboard/>} />
      <Route exact path="/error" element={<Error/>} />
      <Route exact path="/:id" element={<MovieDetail/>} />
    </Routes>
  );
}

export default App;
