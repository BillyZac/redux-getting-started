import { createStore } from 'redux'
import React from 'react'
import { render } from 'react-dom'

import './to-do'

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      console.log(state);
      return state + 1
    case 'DECREMENT':
      console.log('decrementing...', state);

      return state - 1
    default:
      return state
  }
}

const store = createStore(counter)

const Counter = ({
  value,
  onIncrement,
  onDecrement
}) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
)

const renderIt = () => {
  render(
    <Counter
      value={store.getState()}
      onIncrement={() =>
        store.dispatch({
          type: 'INCREMENT'
        })
      }
      onDecrement={() =>
        store.dispatch({
          type: 'DECREMENT'
        })
      }
    />,
  document.getElementById('app')
  )
}

renderIt()
store.subscribe(renderIt)
