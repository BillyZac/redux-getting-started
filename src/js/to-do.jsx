const todos = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state.map(todo => {
        if (todo.id !== action.id) {
          return todo
        }
        return {
          ...todo,
          completed: !todo.completed
        }
      })
    default:
      return state
  }
}

const stateBefore = [{
  id: 0,
  text: 'Do it, do it.',
  completed: false
},
{
  id: 1,
  text: 'Do it, do it.',
  completed: false
}]

const action = {
  type: 'TOGGLE_TODO',
  id: 1
}

console.log(stateBefore);
const stateAfter = todos(stateBefore, action)
console.log(stateAfter);
console.log(stateBefore);
