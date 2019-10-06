
import React, { Component,useReducer } from 'react';
import Actions from './actions';

//   {key:1,date:"date",title:"title",status:"live",count:"232"},

  const listingReducer = (state, action) => {
    switch (action.type) {
    case Actions.listing.currentListing:
        return ({
            key: action.id,
            date: action.date,
            title: action.title,
            status:action.status,
            count: action.count
        });
    case Actions.listing.updateAll:
        return action.listings;
    default:
        return state;
    }
  };

  const currentListingIDReducer = (state, action) => {
    switch (action.type){

        case Actions.listing.updateCurrentListingID:
            return ({
              id: action.id
            });
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

        case Actions.productInfo.update:
            return info;

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

  const reducers = {
      "listingReducer":listingReducer,
      "productInfoReducer":productInfoReducer,
      'currentListingIDReducer':currentListingIDReducer,
      'modifierReducer':modifierReducer,
      'serviceAreasReducer':serviceAreasReducer,
  };

  export default reducers;

