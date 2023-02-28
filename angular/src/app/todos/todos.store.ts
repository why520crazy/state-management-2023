import { Injectable } from '@angular/core';

const todos = [
  {
    id: 1,
    text: 'Todo 1',
    completed: false,
    assignee: 1,
  },
];

const users = [
  {
    id: 1,
    username: 'why520crazy',
    display_name: '徐大海',
  },
];

@Injectable()
export class TodoListStore {
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
