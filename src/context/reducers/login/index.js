import {LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT} from '../../actions/type';

const initialState = {
  success: false,
  error: null,
  loginInfo: null,
  errorInfo: null,
};

const login = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginInfo: payload,
        success: true,
        error: false,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: true,
        success: false,
        errorInfo: payload,
      };
    case LOGOUT:
      return {
        ...state,
        loading: false,
        success: false,
        error: null,
        loginInfo: null,
        errorInfo: null,
      };
    default:
      return state;
  }
};

export default login;
