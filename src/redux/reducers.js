
import React, { Component,useReducer } from 'react';
import Actions from './actions';
import { Action } from 'rxjs/internal/scheduler/Action';

//   {key:1,date:"date",title:"title",status:"live",count:"232"},

  const listingReducer = (state, action) => {
    switch (action.type) {
   
    case Actions.listing.updateStatus:
        return action.status;
    case Actions.listing.updateAll:
        return action.listings;
    default:
        return state;
    }
  };

  const currentListingReducer = (state, action) => {

    var listing = Object.assign({},state);

    switch (action.type){
        case Actions.listing.updateNewListingID:
          console.log(action.id,state);
          return ({
            id: action.id
          });
          
        case Actions.listing.updateCurrentListing:
          return ({
            id: action.listing.key,
            date: action.listing.date,
            title: action.listing.title,
            status:action.listing.status,
            count: action.listing.count
          });

        case Actions.listing.updateCurrentListingStatus:
          listing.status = action.status
          return listing;

        default:
          return state;
    }
  };

  const productInfoReducer = (state,action) => {
    var info = Object.assign({},state);
    switch (action.type) {
        case Actions.productInfo.updateProductInfo:      
            console.log(action, state, info);
            return action.productInfo;

        case Actions.productInfo.updateTitle:
            info.title = action.title;
            return info;

        case Actions.productInfo.updateDescription:
            info.description = action.description;
            return info;

        case Actions.productInfo.updateUnit:
            info.unit = action.unit;
            return info;

        case Actions.productInfo.updateType:
            info.type = action.subType;
            return info;

        case Actions.productInfo.updateID:
            info.id = action.id;
            return info;
        
        case Actions.productInfo.updateImageUrl:
            info.imageUrl = action.imageUrl;
            return info;

        case Actions.productInfo.update:
            return info;
        
        case Actions.productInfo.updateBasePrice:
            info.basePrice = action.basePrice
            return info
        
        case Actions.productInfo.updateCurrency:
            info.currency = action.currency
            return info

        case Actions.productInfo.clear:
            return {}

        default:
            return state;
    }
  };

  const modifierReducer = (state,action) => {
    switch (action.type){
      case Actions.modifier.setModifiers:
        return action.modifiers;
      default:
        return state;
    }
  };

  const serviceAreasReducer = (state,action) => {
    switch (action.type){
      case Actions.serviceAreas.updateServiceAreas:
        return action.areas;
      default:
        return state;
    }
  };
  
const accessTokenReducer = (state, action) => {
  switch (action.type){
    case Actions.token.setToken:
      return action.token;
    default:    
      return state;
  }
}

const businessProfileReducer = (state, action) => {
    switch (action.type){
      case Actions.businessProfile.setProfile:
        console.log('profile', action.profile)
        return {id:action.profile.id,title:action.profile.title,logo:action.profile.logo}
      default:
          return state;
    }
  }

  const reducers = {
    "listingReducer":listingReducer,
    "productInfoReducer":productInfoReducer,
    'currentListingReducer':currentListingReducer,
    'modifierReducer':modifierReducer,
    'serviceAreasReducer': serviceAreasReducer,
    'accessTokenReducer': accessTokenReducer,
    'businessProfileReducer':businessProfileReducer
  };

  export default reducers;

