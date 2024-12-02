import { TodoProvider } from './TodoContext';
import TodoList from './TodoList';

function App() {
  return (
    <TodoProvider>
      <div className="App">
        <h1 className="text-3xl font-bold text-center my-8">Todo List App</h1>
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default App;