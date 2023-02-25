import create from "zustand";

export interface Todo {
  id: number;
  text: string;
  completed?: boolean;
}

interface TodoState {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  toggleCompletedState: (id: number) => void;
}

const useTodosStore = create<TodoState>((set) => ({
  // initial state
  todos: [{ id: 1, text: "Item 1" }],
  // methods for manipulating state
  addTodo: (text: string) => {
    set((state) => ({
      todos: [
        ...state.todos,
        {
          text,
          completed: false,
        } as Todo,
      ],
    }));
  },
  toggleTodo: (id) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  },
  toggleCompletedState: (id) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? ({ ...todo, completed: !todo.completed } as Todo)
          : todo
      ),
    }));
  },
}));

export function ZustandTodos() {
  const { addTodo, toggleTodo, toggleCompletedState, todos } = useTodosStore();
  return (
    <>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => toggleTodo(todo.id)}>
            {todo.text} - {!!todo.completed ? "true" : "false"}
          </li>
        ))}
      </ul>
      {/* Uncompleted Todos Count: {todoList.uncompletedTodoCount} */}
    </>
  );
}
// function BearCounter() {
//   const bears = useBearStore((state) => state.bears);
//   return <h1>{bears} around here ...</h1>;
// }

// function Controls() {
//   const increasePopulation = useBearStore((state) => state.increasePopulation);
//   return <button onClick={increasePopulation}>one up</button>;
// }
