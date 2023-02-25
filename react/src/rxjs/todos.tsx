import { BehaviorSubject, combineLatest, map, reduce } from "rxjs";
import { useObservableState } from "observable-hooks";
import { useObservable } from "rxjs-hooks";
import { useState } from "react";
export interface Todo {
  id: number;
  text: string;
  completed?: boolean;
  assignee?: number;
}

export interface User {
  id: number;
  username: string;
  display_name?: string;
}

// const todos = {
//     id: 1,
//     text: "Todo 1",
//     completed: false,
//     assignee: {
//       id: 1,
//       username: "why520crazy",
//       display_name: "徐大海",
//     },
//   };

const todos = [
  {
    id: 1,
    text: "Todo 1",
    completed: false,
    assignee: 1,
  },
];

const users = [
  {
    id: 1,
    username: "why520crazy",
    display_name: "徐大海",
  },
];

class TodoListStore {
  todos$ = new BehaviorSubject<Todo[]>([]);
  users$ = new BehaviorSubject<User[]>([]);

  uncompletedTodoCount$ = this.todos$.pipe(
    map((todos) => {
      return todos ? todos.filter((todo) => !todo.completed).length : 0;
    })
  );

  todosWithRefs$ = combineLatest([this.todos$, this.users$]).pipe(
    map(([todos, users]) => {
      return todos.map((todo) => {
        return {
          ...todo,
          refs: {
            assignee: users.find((user) => user.id === todo.assignee),
          },
        };
      });
    })
  );

  constructor() {
    // 初始化数据
    this.todos$.next(todos);
    this.users$.next(users);
  }

  addTodo(text: string) {
    this.todos$.next([
      ...this.todos$.getValue(),
      { id: 100, text: text, assignee: 1 },
    ]);
  }
}

const todoListStore = new TodoListStore();

export function RxJSTodosView() {
  const todos = useObservable(() => todoListStore.todosWithRefs$);
  const uncompletedTodoCount = useObservable(
    () => todoListStore.uncompletedTodoCount$
  );
  const [addText, setAddText] = useState("");
  return (
    <>
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>
            {todo.text} - {todo.refs.assignee?.display_name}
          </li>
        ))}
      </ul>
      Uncompleted Todo Count: {uncompletedTodoCount}
      <input
        type="input"
        value={addText}
        onChange={(event) => {
          setAddText(event.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          todoListStore.addTodo(addText);
          setAddText("");
        }}
      >
        Add
      </button>
    </>
  );
}
