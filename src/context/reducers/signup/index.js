import {SIGNUP_SUCCESS, SIGNUP_ERROR} from '../../actions/type';

const initialState = {
  success: false,
  error: null,
  signupInfo: null,
  errorInfo: null,
};

const signup = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loginInfo: payload,
        success: true,
        error: false,
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        error: true,
        success: false,
        errorInfo: payload,
      };

    default:
      return state;
  }
};

export default signup;
