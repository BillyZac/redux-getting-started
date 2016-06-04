/*jshint esversion: 6 */

import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux'

/* Reducer */
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

// Dumb component
const Counter = ({
    value,
    onIncrement,
    onDecrement
  }) => (
    <div>
      <h1>{ value }</h1>
      <button onClick={ onIncrement }>+</button>
      <button onClick={ onDecrement }>-</button>
    </div>
  );

const store = createStore(counter);

// Kinda weird
const myRender = () => {
  render(
    <Counter
      value={ store.getState() }
      onIncrement={ () =>
        store.dispatch({ type: 'INCREMENT' })
      }
      onDecrement={ () =>
        store.dispatch({ type: 'DECREMENT' })
      }
     />,
    document.getElementById('app'));
};

// Rerender every time store changes
store.subscribe(myRender);

// Render once at the beginning
myRender();

document.addEventListener('click', () => {
  store.dispatch({});
});
