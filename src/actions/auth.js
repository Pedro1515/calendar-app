import { fetchSinToken, fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from "sweetalert2";
import { eventLogout } from "./events";

export const startLogin = (email, password) => {
  return async (dispatch) => {
    try {
      const resp = await fetchSinToken("auth", { email, password }, "POST");
      const body = await resp.json();

      if (body.ok) {
        localStorage.setItem("token", body.token);
        localStorage.setItem("token-init-date", new Date().getTime());

        dispatch(
          login({
            uid: body.uid,
            name: body.name,
          })
        );
        dispatch(submitActive());
      } else if (body.msg) {
        Swal.fire("Error", body.msg, "error");
        dispatch(submitActive());
      } else if (body.errors.email) {
        Swal.fire("Error", body.errors.email.msg, "error");
        dispatch(submitActive());
      } else if (body.errors.password) {
        Swal.fire("Error", body.errors.password.msg, "error");
        dispatch(submitActive());
      } else {
        Swal.fire("Error", "Fallo en el registro, intentar mas tarde", "error");
        dispatch(submitActive());
      }
    } catch (error) {
      Swal.fire("Error", "Fallo en el registro, intentar mas tarde", "error");
      dispatch(submitActive());
      console.error("error catch in startLogin. " + error);
    }
  };
};

export const startRegister = (email, password, name) => {
  return async (dispatch) => {
    try {
      const resp = await fetchSinToken(
        "auth/new",
        { email, password, name },
        "POST"
      );
      const body = await resp.json();

      if (body.ok) {
        localStorage.setItem("token", body.token);
        localStorage.setItem("token-init-date", new Date().getTime());

        dispatch(
          login({
            uid: body.uid,
            name: body.name,
          })
        );
        dispatch(submitActive());
      } else if (body.msg) {
        Swal.fire("Error", body.msg, "error");
        dispatch(submitActive());
      } else if (body.errors.name) {
        Swal.fire("Error", body.errors.name.msg, "error");
        dispatch(submitActive());
      } else if (body.errors.email) {
        Swal.fire("Error", body.errors.email.msg, "error");
        dispatch(submitActive());
      } else if (body.errors.password) {
        Swal.fire("Error", body.errors.password.msg, "error");
        dispatch(submitActive());
      } else {
        Swal.fire("Error", "Fallo en el registro, intentar mas tarde", "error");
        dispatch(submitActive());
      }
    } catch (error) {
      Swal.fire("Error", "Fallo en el registro, intentar mas tarde", "error");
      dispatch(submitActive());
      console.error("error catch in startRegister. " + error);
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchConToken("auth/renew");
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      dispatch(checkingFinish());
    }
  };
};

const checkingFinish = () => ({ type: types.authCheckingFinish });

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(eventLogout());
    dispatch(logout());
  };
};

const logout = () => ({ type: types.authLogout });

export const submitDisable = () => ({ type: types.authDisableSubmit });

export const submitActive = () => ({ type: types.authActiveteSubmit });
