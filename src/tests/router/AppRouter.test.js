import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { AppRouter } from "../../router/AppRouter";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// jest.mock('../../../actions/events', () => ({
//     eventStartDelete: jest.fn()
// }))

describe("test in DeleteEventFab", () => {
  test("should show correctly", () => {
    const initialState = {
      auth: { checking: true, uid: null },
    };

    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("should show correctly LoginScreen", () => {
    const initialState = {
      auth: { checking: false, uid: null },
    };

    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.login-container').exists()).toBe(true);
  });

  test("should show correctly CalendarScreen", () => {
    const initialState = {
      auth: { checking: false, uid: '123', name:'admin' },
      calendar: {events:[], activeEvent:null},
      ui: {modalOpen: false}
    };

    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.btn-outline-danger').exists()).toBe(true);
  });
});
