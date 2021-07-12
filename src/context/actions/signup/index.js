import {SIGNUP_SUCCESS, SIGNUP_ERROR} from '../type';
import {sendPostRequest} from '../../../network';
import * as apiEndPoint from '../../../network/apiEndPoint';
import {Toast} from 'native-base';

const callSignUpApi = async (data, dispatch) => {
  try {
    const res = await sendPostRequest(apiEndPoint.SIGNUP, data, dispatch);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res,
    });
    // alert(JSON.stringify(res));
    return res;
  } catch (error) {
    dispatch({
      type: SIGNUP_ERROR,
      payload: error,
    });
    // alert('Something went wrong please try again later');
    Toast.show(error.message);
    console.log('error is', error);
  }
};

export default callSignUpApi;
