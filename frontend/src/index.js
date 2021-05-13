import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react'
import store from "./redux/store"
import { Provider } from 'react-redux'

import './styles/app.scss';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const redirectEndpoint = `/redirectAfterLogin`
ReactDOM.render(

  <Provider store={store}>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin + redirectEndpoint}
    >
      <App />
    </Auth0Provider>
  </Provider>,
  document.getElementById('root')
);
