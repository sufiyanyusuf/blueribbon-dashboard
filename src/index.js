// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "./react-auth0-wrapper";
import config from "./auth_config.json";
import './styles/_global_style.scss';

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};
ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    audience={config.audience}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
    LoadProfile={false}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
