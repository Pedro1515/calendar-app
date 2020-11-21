import { types } from "../types/types";

const initialState = {
  checking: true,
  disabledSubmit: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        ...action.payload,
        checking: false,
      };

    case types.authCheckingFinish:
      return {
        ...state,
        checking: false,
      };

    case types.authLogout:
      return {
        checking: false,
      };

    case types.authDisableSubmit:
      return {
        ...state,
        disabledSubmit: true,
      };

    case types.authActiveteSubmit:
      return {
        ...state,
        disabledSubmit: false,
      };

    default:
      return state;
  }
};
