import { TodoProvider } from './TodoContext';
import TodoList from './TodoList';

function App() {
  return (
    <TodoProvider>
      <div className="App">
        <h1 className="text-3xl font-bold text-green-500 text-center my-8">Todo List App</h1>
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default App;