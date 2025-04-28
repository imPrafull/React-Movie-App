import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DateTime } from "luxon";

import './App.module.css';
import Dashboard from './pages/Dashboard/Dashboard';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import Error from './components/error/error';
import { httpGet } from './shared/api';

interface Config {
  imgBaseUrl: string;
  timestamp: DateTime;
}

function App() {
  const router = createBrowserRouter([
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

  const storedConfig = localStorage.getItem('CONFIG');
  const config: Config | null = storedConfig ? JSON.parse(storedConfig) : null;

  if (!(config?.imgBaseUrl && checkTime(config?.timestamp))) {
    httpGet('configuration')
      .then(data => {
        if (data) {
          const newConfig = {
            imgBaseUrl: data.images.base_url,
            timestamp: DateTime.local()
          };
          localStorage.setItem('CONFIG', JSON.stringify(newConfig));
        } else {
          console.error('Configuration error');
        }
      });
  }

  function checkTime(storedAt: string): boolean {
    const start = DateTime.fromISO(storedAt.substring(0, 10));
    const now = DateTime.local();
    const diffInDays = now.diff(start, 'days');
    const diffObject = diffInDays.toObject();
    return diffObject.days !== undefined && diffObject.days < 15;
  }

  return <RouterProvider router={router} />;
}

export default App