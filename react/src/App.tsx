import React from "react";
import { Provider } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import { TodoList } from "./redux/todos";
import { Counter } from "./redux/counter";
import { store } from "./redux/index";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import { todoListStore, TodosView } from "./mobx/todos";
import { RecoilTodos } from "./recoil/todos";
import { RecoilRoot } from "recoil";
import { RxJSTodosView } from "./rxjs/todos";
import { ZustandTodos } from "./zustand/todos";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <header>
          <Link to="todos">Redux Todos</Link> | <Link to="counter">Counter</Link> |{" "}
          <Link to="mobx-todos">MobX Todos</Link> |{" "}
          <Link to="recoil-todos">Recoil Todos</Link> |{" "}
          <Link to="rxjs-todos">RxJS Todos</Link>
        </header>
        <div>
          <Outlet />
        </div>
      </>
    ),
    children: [
      {
        path: "",
        element: <TodoList></TodoList>,
      },
      {
        path: "todos",
        element: <TodoList></TodoList>,
      },
      {
        path: "counter",
        element: <Counter></Counter>,
      },
      {
        path: "mobx-todos",
        element: <TodosView store={todoListStore}></TodosView>,
      },
      {
        path: "recoil-todos",
        element: (
          <RecoilRoot>
            <RecoilTodos></RecoilTodos>
          </RecoilRoot>
        ),
      },
      {
        path: "rxjs-todos",
        element: <RxJSTodosView></RxJSTodosView>,
      },
      {
        path: "zustand-todos",
        element: <><ZustandTodos></ZustandTodos><ZustandTodos></ZustandTodos></>,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;