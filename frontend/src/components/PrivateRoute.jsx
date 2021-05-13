import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'
import { Spinner } from 'react-bootstrap'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isLoading } = useAuth0()
  return (
    <Route
      {...rest}
      render={props =>
        isLoading ? (
          <div className="d-flex justify-content-center align-self-center mt-5"><Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner></div>
        ) : isAuthenticated ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to='/' />
        )
      }
    />
  );
};

export default PrivateRoute;