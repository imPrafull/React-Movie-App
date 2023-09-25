import React from 'react';
import { useNavigate } from "react-router-dom";

import './Error.css';

function Error() {
  const navigate = useNavigate();

  function onNavigate() {
    navigate('/')
  } 

  return (
    <div className="error-container">
      <h1>Oops, Something Went Wrong! Try Again Later...</h1>
      <a href="javascript:void(0);" onClick={onNavigate}>Click here to refresh</a>      
    </div>
  )
}

export default Error;
