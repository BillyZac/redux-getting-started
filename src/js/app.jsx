import { createStore } from 'redux'
import { combineReducers } from 'redux'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'

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

const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

const todoApp = combineReducers({
  todos,
  visibilityFilter
})


const { Component } = React

const Link = ({
  active,
  children,
  onClick
}) => {
  if (active) {
    return (
      <span>{children}</span>
    )
  }
  return (
    <a href='#'
      onClick={event => {
        event.preventDefault()
        onClick()
      }}
    >
        {children}
    </a>
  )
}

const mapStateToLinkProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
})
const mapDispatchToLinkProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter: ownProps.filter
    })
  }
})
const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link)

let AddTodo = ({ dispatch }) => {
  let input
  return (
    <div>
      <input ref={node => {
          input = node
        }} />
      <button onClick={() => {
          dispatch({
            type: 'ADD_TODO',
            id: nextTodoId++,
            text: input.value
          })
          input.value=''
        }}>Add item</button>
    </div>
  )
}

AddTodo = connect()(AddTodo)

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
  }
}

const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}>
    {text}
  </li>
)

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {
      todos.map(todo => (
        <Todo
          key={todo.id}
          onClick={() => onTodoClick(todo.id)}
          {...todo} />
      ))
    }
  </ul>
)

const Footer = () => (
  <div>
    {'  '}
    <FilterLink
      filter='SHOW_ALL'
    >All</FilterLink>
    {'  '}
    <FilterLink
      filter='SHOW_ACTIVE'
    >Active</FilterLink>
    {'  '}
    <FilterLink
      filter='SHOW_COMPLETED'
    >Completed</FilterLink>
  </div>
)

let VisibleTodoList = ({todos, visibilityFilter, onTodoClick})  => {
  return (
    <TodoList
      todos={todos}
      onTodoClick={onTodoClick}/>
  )
}
const mapTodoListStateToProps = state => (
  {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  }
)
const mapTodoListDispatchToProps = dispatch => (
  {
    onTodoClick: id=>{
      dispatch({
        type: 'TOGGLE_TODO',
        id
      })
    }
  }
)
VisibleTodoList = connect(
  mapTodoListStateToProps,
  mapTodoListDispatchToProps
)(VisibleTodoList)

let nextTodoId = 0

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
)
