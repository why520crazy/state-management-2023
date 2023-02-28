import {
  makeAutoObservable,
  makeObservable,
  observable,
  computed,
  action,
} from "mobx";
import { observer } from "mobx-react";
import { useEffect } from "react";

export interface Todo {
  id: number;
  text: string;
  completed?: boolean;
}

let id = 1;
class TodoListStore {
  // @observable v6 之前的写法
  todos: Todo[] = [];

  // @computed v6 之前的写法
  get uncompletedTodoCount() {
    return this.todos.filter((todo) => !todo.completed).length;
  }

  constructor() {
    makeAutoObservable(this); // 自动推断所有的属性
    // makeObservable(this, {
    //   todos: observable,
    //   uncompletedTodoCount: computed,
    //   // fetchTodos: action
    // })
  }

  async fetchTodos() {
    const response = await fetch(
      `https://62f70d4273b79d015352b5e5.mockapi.io/todos`
    );
    const data = await response.json();
    this.todos = data;
  }

  addTodo(text: string) {
    this.todos.push({ id: id++, text: text, completed: false });
  }

  toggleTodo(id: number) {
    const todo = this.todos.find((item) => item.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }
}

export const TodosView = observer(({ store }: { store: TodoListStore }) => {
  useEffect(() => {
    store.fetchTodos();
  }, []);
  return (
    <>
      <ul>
        {store.todos.map((todo) => (
          <li key={todo.id} onClick={() => store.toggleTodo(todo.id)}>
            {todo.text} - {!!todo.completed ? "true" : "false"}
          </li>
        ))}
      </ul>
      Uncompleted Todo Count: {store.uncompletedTodoCount}
    </>
  );
});

export const todoListStore = new TodoListStore();

function App() {
  return <TodosView store={todoListStore}></TodosView>;
}

// let a = 10;
// let b = 20;
// let c = a + b; // 计算得到 30
// a = 20;
// console.log(c); // 还是30
