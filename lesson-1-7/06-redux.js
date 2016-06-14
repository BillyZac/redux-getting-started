const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const { createStore } = Redux // ES6 syntax
// var createStore = Redux.createStore // ES5 syntax
// import { createStore } from 'redux' // As npm module

const store = createStore(counter)

// Implementation of our render method.
const render = () => {
  document.body.innerText = store.getState()
}

// Render the initial state.
render()

// The three methods of the Redux store in action:

// The function we pass to subscribe() is called every time an action is dispatched.
store.subscribe(render)

// Dispatch an action whenever the body is clicked.
document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' })
})
