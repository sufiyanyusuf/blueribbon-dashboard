
import React, { Component,useReducer } from 'react';
import initialTodos from './state';
import Actions from './actions';
import { Action } from 'rxjs/internal/scheduler/Action';

  
const todoReducer = (state, action) => {
    switch (action.type) {
      case 'DO_TODO':
        return state.map(todo => {
          if (todo.id === action.id) {
            return { ...todo, complete: true };
          } else {
            return todo;
          }
        });
      case 'UNDO_TODO':
        return state.map(todo => {
          if (todo.id === action.id) {
            return { ...todo, complete: false };
          } else {
            return todo;
          }
        });
      case 'ADD_TODO':
        return state.concat({
          task: action.task,
          id: action.id,
          complete: false,
        });
      default:
        return state;
    }
  };

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
    console.log(state, info);
    switch (action.type) {
        case Actions.productInfo.updateProductInfo:
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


        case Actions.productInfo.updateID:
                info.id = action.id;
                return info;

        case Actions.productInfo.update:
            info = action;
            return info;

        default:
            return state;
    }
  };



  const reducers = {
      "todoReducer":todoReducer,
      "listingReducer":listingReducer,
      "productInfoReducer":productInfoReducer,
      'currentListingIDReducer':currentListingIDReducer,
  };

  export default reducers;

