
import React, { Component } from 'react';
import './App.css';
import './styles/index.css'

import NavBar from "./components/navbar";
import { useAuth0 } from "./react-auth0-wrapper";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import Profile from "./components/profile";
import Login from "./views/loginScreen";
import Listing from "./views/Listing";
import LocationForm from "./views/listingCreation/locationsForm";
import ProductInfoForm from "./views/listingCreation/productInfoForm";
import ModifierForm from "./views/listingCreation/modifierForm";
import FulfillmentForm from "./views/listingCreation/fulfillmentForm";
import PublishForm from "./views/listingCreation/publishForm";

import reducers from './redux/reducers';
import globalState from './redux/state';
import useCombinedReducers from 'use-combined-reducers';

import { StateContext, DispatchContext } from './redux/contexts';

function App() {

  const [state, dispatch] = useCombinedReducers({
    subscriptions: React.useReducer(reducers.listingReducer, globalState.subscriptions),
    currentProductInfo: React.useReducer(reducers.productInfoReducer, globalState.currentProductInfo),
    currentListing: React.useReducer(reducers.currentListingIDReducer, globalState.currentListing),
    currentModifiers: React.useReducer(reducers.modifierReducer, globalState.currentModifiers),
    currentServiceAreas:React.useReducer(reducers.serviceAreasReducer, globalState.currentServiceAreas)
  });

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      isAuthenticated === false
        ? <Redirect to='/login' />
        : <Component {...props} />
    )} />
  )

  return (

    <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
        <div className="App">
          <Router>
            {isAuthenticated && (
              <NavBar/>
            )}
            <Switch>
              <PrivateRoute exact path="/" component={Listing} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/profile" component={Profile} />
              <Route path="/listing/edit/locationForm" component={LocationForm} />
              <Route path="/listing/edit/modifierForm" component={ModifierForm} />
              <Route path="/listing/edit/fulfillmentForm" component={FulfillmentForm} />
              <Route path="/listing/edit/publishForm" component={PublishForm} />
              <Route path="/listing/edit/productInfo" component={ProductInfoForm} />
              <Route path="/login" component={Login} />
            </Switch>
          </Router>
        </div>
        </StateContext.Provider>
    </DispatchContext.Provider>
   
  );
}

export default App;
