import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DateTime } from "luxon";

import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import MovieDetail from './Components/MovieDetail/MovieDetail';
import Error from './Components/Error/Error';
import { httpGet } from './Shared/Api';

function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
      errorElement: <Error/>
    },
    {
      path: "movie/:id",
      element: <MovieDetail />,
      errorElement: <Error/>,
    },
  ]);

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
          console.error('Configuration error')
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
    <RouterProvider router={router} />
  );
}

export default App;
