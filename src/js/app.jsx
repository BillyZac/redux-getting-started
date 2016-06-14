import { createStore } from 'redux'
import React from 'react'
import { render } from 'react-dom'

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state
      }
      return {
        ...state,
        completed: !state.completed
      }
    default:
      return state
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action))
    default:
      return state
  }
}


const store = createStore(todos)

console.log('Initial state');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching ADD_TODO');
store.dispatch({
  type: 'ADD_TODO',
  id: 0,
  text: 'Do it.'
})

console.log('Current state');
console.log(store.getState());
console.log('--------------');
