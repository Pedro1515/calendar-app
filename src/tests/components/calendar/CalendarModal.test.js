import "@testing-library/jest-dom";
import moment from "moment";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

import { CalendarModal } from "../../../components/calendar/CalendarModal";
import { eventStartUpdate, eventClearActiveEvent, eventStartAddNew } from "../../../actions/events";
import { act } from "@testing-library/react";
import Swal from "sweetalert2";

jest.mock('../../../actions/events', ()=>({
    eventStartUpdate: jest.fn(),
    eventClearActiveEvent: jest.fn(),
    eventStartAddNew: jest.fn(),
}))

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}))

// Storage.prototype.setItem = jest.fn()

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlus1 = now.clone().add(1, "hours");

const initialState = {
  auth: { checking: false, uid: "123", name: "admin" },
  calendar: {
    events: [],
    activeEvent: {
      title: "titleTEST",
      notes: "you",
      start: now.toDate(),
      end: nowPlus1.toDate(),
    },
  },
  ui: { modalOpen: true },
};

const store = mockStore(initialState);
store.dispatch = jest.fn()

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
);

describe("test in CalendarModal", () => {
  test("should show correctly", () => {
      expect(wrapper.find('Modal').prop('isOpen')).toBe(true)
  });
  
  test("should update and close the modal", () => {
      wrapper.find('input[name="title"]').simulate('change', {target:{name:'title',value:'TEST'}})
      wrapper.find('form').simulate('submit', {
          preventDefault(){}
        })
        
        expect(eventStartUpdate).toHaveBeenCalledWith({end: expect.any(Date), notes: "you", start: expect.any(Date), title: "TEST"})
        expect(eventClearActiveEvent).toHaveBeenCalled()
        
    });
    
    test("should show error", () => {
          wrapper.find('input[name="title"]').simulate('change', {target:{name:'title',value:''}})
          wrapper.find('form').simulate('submit', {
              preventDefault(){}
          })
          
          expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true)
      });
    
    test('should create new event', () => {
    const initialState = {
        auth: { checking: false, uid: "123", name: "admin" },
        calendar: {
          events: [],
          activeEvent: null,
        },
        ui: { modalOpen: true },
      };
      
      const store = mockStore(initialState);
      store.dispatch = jest.fn()
      
      const wrapper = mount(
        <Provider store={store}>
          <CalendarModal />
        </Provider>
      );

      wrapper.find('input[name="title"]').simulate('change', {target:{name:'title',value:'TEST'}})
      
      wrapper.find('form').simulate('submit', {
        preventDefault(){}
    })

    expect(eventStartAddNew).toHaveBeenCalledWith({end: expect.any(Date), start: expect.any(Date), title: "TEST", notes:''})
    expect(eventClearActiveEvent).toHaveBeenCalled()
  })

  test('should valid date', () => {
    wrapper.find('input[name="title"]').simulate('change', {target:{name:'title',value:'TEST'}})
      
    const today = new Date()

    act(()=>{
        wrapper.find('DateTimePicker').at(1).prop('onChange')(today)
    })

    wrapper.find('form').simulate('submit', {
        preventDefault(){}
    })

    expect(Swal.fire).toHaveBeenCalled()
  })
  
});
