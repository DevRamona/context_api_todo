import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const TodoContext = createContext();

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TODO_LIST':
      return { ...state, todoList: action.payload };
    case 'ADD_TODO':
      return { ...state, todoList: [...state.todoList, action.payload] };
    case 'UPDATE_TODO':
      return {
        ...state,
        todoList: state.todoList.map(todo =>
          todo.id === action.payload.id ? { ...todo, task: action.payload.task } : todo
        )
      };
    case 'TOGGLE_COMPLETED':
      return {
        ...state,
        todoList: state.todoList.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todoList: state.todoList.filter(todo => todo.id !== action.payload)
      };
    default:
      return state;
  }
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, { todoList: [] });

  const setTodoList = (todoList) => {
    dispatch({ type: 'SET_TODO_LIST', payload: todoList });
  };

  const addTodo = (task) => {
    dispatch({ type: 'ADD_TODO', payload: { id: Date.now(), task, completed: false } });
  };

  const updateTodo = (id, task) => {
    dispatch({ type: 'UPDATE_TODO', payload: { id, task } });
  };

  const toggleCompleted = (id) => {
    dispatch({ type: 'TOGGLE_COMPLETED', payload: id });
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  return (
    <TodoContext.Provider value={{ 
      todoList: state.todoList, 
      setTodoList, 
      addTodo, 
      updateTodo, 
      toggleCompleted, 
      deleteTodo 
    }}>
      {children}
    </TodoContext.Provider>
  );
};
TodoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const useTodo = () => useContext(TodoContext);