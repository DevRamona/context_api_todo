import React, { useState } from "react";
import { TiPencil } from "react-icons/ti";
import { BsTrash } from "react-icons/bs";
import { useTodo } from "./TodoContext";

const TodoList = () => {
  const { todoList, addTodo, updateTodo, toggleCompleted, deleteTodo } =
    useTodo();
  const [currentTodo, setCurrentTodo] = useState(null);
  const [newTask, setNewTask] = useState("");

  const handleAddTodo = () => {
    if (newTask.trim() !== "") {
      if (currentTodo) {
        updateTodo(currentTodo.id, newTask);
        setCurrentTodo(null);
      } else {
        addTodo(newTask);
      }
      setNewTask("");
    }
  };

  const handleUpdateClick = (todo) => {
    setCurrentTodo(todo);
    setNewTask(todo.task);
  };

  const handleCancel = () => {
    setCurrentTodo(null);
    setNewTask("");
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder={currentTodo ? "Update your task" : "Enter your task"}
          className="flex-grow mr-2 p-2 border rounded"
        />
        {currentTodo ? (
          <>
            <button
              onClick={handleAddTodo}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleAddTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        )}
      </div>
      <ul>
        {todoList.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between mb-2 p-2 border rounded"
          >
            <span className={todo.completed ? "line-through" : ""}>
              {todo.task}
            </span>
            <div>
              <button
                onClick={() => toggleCompleted(todo.id)}
                className="mr-2 text-green-500"
              >
                {todo.completed ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => handleUpdateClick(todo)}
                className="mr-2 text-blue-500"
              >
                <TiPencil />
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500"
              >
                <BsTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
