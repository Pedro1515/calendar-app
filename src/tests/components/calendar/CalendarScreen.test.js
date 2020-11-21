import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { CalendarScreen } from "../../../components/calendar/CalendarScreen";
import { messages } from "../../../helpers/calendar-messages-es";
import { types } from "../../../types/types";
import { act } from "@testing-library/react";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

Storage.prototype.setItem = jest.fn()

const initialState = {
  auth: { checking: false, uid: "123", name: "admin" },
  calendar: { events: [], activeEvent: null },
  ui: { modalOpen: false },
};

const store = mockStore(initialState);

const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen />
  </Provider>
);

describe("test in Calendar Screen", () => {
  test("should show correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should work props of Calendar", () => {
    const calendar = wrapper.find("Calendar")
    
    expect(calendar.prop("messages")).toEqual(messages);

    calendar.prop("onDoubleClickEvent")();
    expect(store.getActions()).toEqual([{ type: types.uiOpenModal }]);

    calendar.prop("onSelectEvent")({any:'any'});
    expect(store.getActions()).toEqual([{type: types.uiOpenModal}, {payload: {any: "any"}, type: types.eventSetActive}]);

    act(()=>{
        calendar.prop("onView")('day');
    })
    expect(localStorage.setItem).toHaveBeenCalledWith("lastView", "day")
  });
});
