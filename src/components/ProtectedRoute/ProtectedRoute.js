import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = (props) => {
  return (
    <Route>
      {props.isLoggedIn ||  !props.isLoad ? props.children : <Redirect to="./" />}
    </Route>
  );
};

export default ProtectedRoute;