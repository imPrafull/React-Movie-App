import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DateTime } from "luxon";

import './App.module.css';
import Dashboard from './pages/Dashboard/Dashboard';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import Error from './components/error/error';
import { httpGet } from './shared/api';

interface Config {
  imgBaseUrl: string;
  timestamp: string; // Changed from DateTime to string
}

// Define the expected API response structure
interface ConfigurationResponse {
  images: {
    base_url: string;
    [key: string]: any;
  };
  [key: string]: any;
}

// Configuration loader function
async function configLoader() {
  const storedConfig = localStorage.getItem('CONFIG');
  const config: Config | null = storedConfig ? JSON.parse(storedConfig) : null;

  if (!(config?.imgBaseUrl && checkTime(config?.timestamp))) {
    const data = await httpGet<ConfigurationResponse>('configuration');
    if (data) {
      const newConfig = {
        imgBaseUrl: data.images.base_url,
        timestamp: DateTime.local().toISO() // Convert DateTime to ISO string
      };
      localStorage.setItem('CONFIG', JSON.stringify(newConfig));
    } else {
      console.error('Configuration error');
    }
  }
  
  return null; // Loader doesn't need to return data since we're using localStorage
}

function checkTime(storedAt: string): boolean {
  const start = DateTime.fromISO(storedAt.substring(0, 10));
  const now = DateTime.local();
  const diffInDays = now.diff(start, 'days');
  const diffObject = diffInDays.toObject();
  return diffObject.days !== undefined && diffObject.days < 15;
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
      errorElement: <Error/>,
      loader: configLoader
    },
    {
      path: "movie/:id",
      element: <MovieDetail />,
      errorElement: <Error/>,
      loader: configLoader
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;