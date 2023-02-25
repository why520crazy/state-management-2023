import { useSelector, useDispatch } from "react-redux";

export function counterReducer(
  state: { value: number } = { value: 0 },
  action: { type: string }
) {
  switch (action.type) {
    case "INCREMENT":
      return {
        value: state.value + 1,
      };
    case "DECREMENT":
      return {
        value: state.value - 1,
      };
    default:
      return state;
  }
}

export function Counter() {
  const counter = useSelector((state: { counter: { value: number } }) => {
    return state.counter;
  });
  const dispatch = useDispatch();
  return (
    <div>
      {counter.value}
      <button
        onClick={() => {
          dispatch({ type: "INCREMENT" });
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          dispatch({ type: "DECREMENT" });
        }}
      >
        -
      </button>
    </div>
  );
}
