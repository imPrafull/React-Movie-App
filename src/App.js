import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import MovieDetail from './Components/MovieDetail/MovieDetail';
import { httpGet } from './Shared/Api';

function App() {

  useEffect(() => {
    onLoad();
  }, [])

  const onLoad = () => {
    let imgBaseUrl = localStorage.getItem('IMG_BASE_URL');
    if (imgBaseUrl) {
      return;
    }
    else {
      httpGet('configuration')
        .then(data => {
          if (data.errors) {
            console.log(data.errors[0]);
            return;
          }
          localStorage.setItem('IMG_BASE_URL', data.images.base_url);
        });
    }
  }

  

  httpGet('genre/movie/list', {language: 'en-US'})
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
