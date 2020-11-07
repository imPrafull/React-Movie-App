import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";

import './Error.css';

function Error() {
  const history = useHistory();

  function onNavigate() {
    history.push('/')
  } 

  return (
    <div className="error-container">
      <h1>Oops, Something Went Wrong! Try Again Later...</h1>
      <a href="javascript:;" onClick={onNavigate}>Click here to refresh</a>      
    </div>
  )
}

export default Error;
