import { useState } from "react";
import { atom, selector, useRecoilState } from "recoil";

export interface Todo {
  id: number;
  text: string;
  completed?: boolean;
}

const todosState = atom<Todo[]>({
  key: "todos",
  default: selector({
    key: "fetchTodos",
    get: async () => {
      const response = await fetch(
        `https://62f70d4273b79d015352b5e5.mockapi.io/todos`
      );
      const data = await response.json();
      return data;
      // return [{ id: 1, text: "Item1" }];
    },
  }),
});

export function RecoilTodos() {
  const [todos, setTodos] = useRecoilState(todosState);
  const [addText, setAddText] = useState("");

  const addTodo = function () {
    setTodos([...todos, { id: 100, text: addText }]);
    setAddText("");
  };
  return (
    <>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text} - {!!todo.completed ? "true" : "false"}
          </li>
        ))}
      </ul>
      <input
        type="input"
        value={addText}
        onChange={(event) => {
          setAddText(event.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          addTodo();
        }}
      >
        Add
      </button>
    </>
  );
}
