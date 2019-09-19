
import React, { Component,useReducer } from 'react';
import initialTodos from './state';

const filterReducer = (state, action) => {
    switch (action.type) {
      case 'SHOW_ALL':
        return 'ALL';
      case 'SHOW_COMPLETE':
        return 'COMPLETE';
      case 'SHOW_INCOMPLETE':
        return 'INCOMPLETE';
      default:
        return state;
    }
  };
  
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

  const subscriptionsReducer = (state, action) => {
      switch (action.type) {
          case 'ADD_SUBSCRIPTION':
            return state.concat({
                key: action.id,
                date: action.date,
                title: action.title,
                status:action.status,
                count: action.count
            });
          default:
            return state;
      }

  };

  const reducers = {
      "todoReducer":todoReducer,
      "subscriptionsReducer":subscriptionsReducer
  };

  export default reducers;

