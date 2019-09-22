
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
import PricingForm from "./views/listingCreation/pricingForm";
import FulfillmentForm from "./views/listingCreation/fulfillmentForm";

import reducers from './redux/reducers';
import globalState from './redux/state';
import useCombinedReducers from 'use-combined-reducers';

import { StateContext, DispatchContext } from './redux/contexts';

function App() {

  const [state, dispatch] = useCombinedReducers({
    subscriptions: React.useReducer(reducers.listingReducer, globalState.subscriptions),
    currentProductInfo: React.useReducer(reducers.productInfoReducer, globalState.currentProductInfo)
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
              <Route path="/listing/new/locationForm" component={LocationForm} />
              <Route path="/listing/new/modifierForm" component={ModifierForm} />
              <Route path="/listing/new/pricingForm" component={PricingForm} />
              <Route path="/listing/new/fulfillmentForm" component={FulfillmentForm} />
              <Route path="/listing/new/productInfo" component={ProductInfoForm} />
              <Route path="/login" component={Login} />
            </Switch>
          </Router>
        </div>
        </StateContext.Provider>
    </DispatchContext.Provider>
   
  );
}

export default App;
