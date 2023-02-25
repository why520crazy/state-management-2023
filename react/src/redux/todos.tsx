import { connect, useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { combineReducers, createStore, Dispatch, applyMiddleware } from "redux";
import thunk from "redux-thunk";

export interface Todo {
  id: number;
  text: string;
  completed?: boolean;
}

let nextTodoId = 0;
export const addTodo = (text: string) => ({
  type: "ADD_TODO",
  id: nextTodoId++,
  text,
});

export const toggleTodo = (id: number) => ({
  type: "TOGGLE_TODO",
  id,
});

export const todosLoaded = (todos: Todo[]) => ({
  type: "TODOS_RECEIVED",
  todos: todos,
});

export const fetchTodos = () => {
  return async function fetchTodoByIdThunk(dispatch: Dispatch) {
    const response = await fetch(
      `https://62f70d4273b79d015352b5e5.mockapi.io/todos`
    );
    const data = await response.json();
    dispatch(todosLoaded(data as unknown as Todo[]));
  };
};

export function todosReducer(
  state: Todo[] = [],
  action: { type: string; id: number; text: string; todos?: Todo[] }
) {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
      ];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case "TODOS_RECEIVED":
      return action.todos;
    default:
      return state;
  }
}

function getUncompletedTodoCount(todos: Todo[]) {
  return todos.filter((todo) => !todo.completed).length;
}

export function TodoList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos() as any);
  }, []);
  const todos = useSelector((state: { todos: Todo[] }) => {
    return state.todos;
  });
  const uncompletedTodoCount = getUncompletedTodoCount(todos);

  const [addText, setAddText] = useState("");
  return (
    <>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => dispatch({ type: "TOGGLE_TODO", id: todo.id })}
          >
            {todo.text} - {todo.completed ? "completed" : "uncompleted"}
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
          dispatch(addTodo(addText));
          setAddText("");
        }}
      >
        Add
      </button>
    </>
  );
}

// const mapStateToProps = (state: {
//   todos: Todo[];
//   counter: { value: number };
// }) => ({
//   todos: state.todos, //getVisibleTodos(state.todos, state.visibilityFilter),
// });

// const mapDispatchToProps = (dispatch: Dispatch) => ({
//   toggleTodo: (id: number) => dispatch(toggleTodo(id)),
//   fetchTodos: () => dispatch(fetchTodos() as any),
//   addTodo: (text: string) => dispatch(addTodo(text)),
// });

// export const Todos = connect(mapStateToProps, mapDispatchToProps)(TodoList);

// export const Todos = function () {
//   console.log("Todos Render");
//   const todos = useSelector((state: any) => {
//     return state.todos;
//   }) as Todo[];
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(todosLoaded([{ id: 1, text: "text 1" }]));
//   }, []);
//   return (
//     <ul>
//       {todos.map((todo) => (
//         <li key={todo.id} onClick={() => toggleTodo(todo.id)}>
//           {todo.text}
//         </li>
//       ))}
//     </ul>
//   );
// };
