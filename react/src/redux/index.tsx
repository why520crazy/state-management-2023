import { combineReducers, createStore, applyMiddleware } from "redux";
import { counterReducer } from "./counter";
import { todosReducer } from "./todos";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  todos: todosReducer,
  counter: counterReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

store.subscribe(() => {
  console.log(`changed`, store.getState());
});

// store.dispatch({
//   type: "ADD_TODO",
//   id: nextTodoId++,
//   text: "Todo 1",
// });
