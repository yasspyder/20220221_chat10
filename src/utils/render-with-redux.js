import { render } from "@testing-library/react";
import { createStore } from "redux";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { reducer } from "../store";

export function renderWithRedux(component, initialState) {
  const store = createStore(reducer, initialState);

  return {
    store,
    ...render(
      <Provider store={store}>
        <BrowserRouter>{component}</BrowserRouter>
      </Provider>
    ),
  };
}
