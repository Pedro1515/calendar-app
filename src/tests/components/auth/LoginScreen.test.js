import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { LoginScreen } from "../../../components/auth/LoginScreen";
import { startLogin, startRegister } from "../../../actions/auth";
import Swal from "sweetalert2";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock("../../../actions/auth", () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn(),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

const initialState = {
  auth: { checking: true, uid: null },
};

const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
);

expect(wrapper).toMatchSnapshot();

describe("test in DeleteEventFab", () => {
  test("should show correctly", () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".form-group").exists()).toBe(true);
  });

  test("should work handleLogin", () => {
    wrapper.find('input[name="lEmail"]').simulate("change", {
      target: { name: "lEmail", value: "admin@gmail.com" },
    });

    wrapper.find('input[name="lPassword"]').simulate("change", {
      target: { name: "lPassword", value: "153426" },
    });

    wrapper.find("form").at(0).prop("onSubmit")({ preventDefault() {} });

    expect(startLogin).toHaveBeenCalledWith("admin@gmail.com", "153426");
  });

  test("should work handleRegister", () => {
    wrapper.find('input[name="rName"]').simulate("change", {
      target: { name: "rName", value: "admin" },
    });
    wrapper.find('input[name="rEmail"]').simulate("change", {
      target: { name: "rEmail", value: "admin@gmail.com" },
    });
    wrapper.find('input[name="rPassword1"]').simulate("change", {
      target: { name: "rPassword1", value: "153426" },
    });

    wrapper.find('input[name="rPassword2"]').simulate("change", {
      target: { name: "rPassword2", value: "153426" },
    });

    wrapper.find("form").at(1).prop("onSubmit")({ preventDefault() {} });

    expect(startRegister).toHaveBeenCalledWith("admin@gmail.com", "153426", "admin" );
  });

  test("should show Swal in the handleRegister", () => {
    wrapper.find('input[name="rName"]').simulate("change", {
      target: { name: "rName", value: "admin" },
    });
    wrapper.find('input[name="rEmail"]').simulate("change", {
      target: { name: "rEmail", value: "admin@gmail.com" },
    });
    wrapper.find('input[name="rPassword1"]').simulate("change", {
      target: { name: "rPassword1", value: "123456789" },
    });
    wrapper.find('input[name="rPassword2"]').simulate("change", {
      target: { name: "rPassword2", value: "123456" },
    });
    wrapper.find("form").at(1).prop("onSubmit")({ preventDefault() {} });

    expect(Swal.fire).toHaveBeenCalled();
  });
});
