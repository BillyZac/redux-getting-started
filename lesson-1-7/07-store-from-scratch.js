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


//****************************************/
// Implementing the Redux store
//****************************************/

// Takes a reducer function as its one argument
const createStore = (reducer) => {
  let state // Hold the application state here.

  // Keep track of all the things that want to know when the state is changed. Like render, for instance.
  let listeners = []

  const getState = () => state

  // The only thing allowed to change the state is dispatch
  const dispatch = (action) => {
    // Update the state
    state = reducer(state, action)

    // Notify every listener by calling it.
    listeners.forEach(listener => listener())
  }

  const subscribe = (listener) => {
    listeners.push(listener)

    // Unsubscribe. How does this work?
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }

  // Dispatch a dummy action just to get the reducer to return an inital value, which populates the state variable.
  dispatch({})

  return { getState, dispatch, subscribe }
}

/****************************************/



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
