import {LOGIN_SUCCESS, LOGIN_ERROR} from '../type';
import {sendPostRequest} from '../../../network';
import * as apiEndPoint from '../../../network/apiEndPoint';
import Toast from 'react-native-simple-toast';

const callLoginApi = async (data, dispatch, navigation) => {
  try {
    const res = await sendPostRequest(apiEndPoint.LOGIN, data, dispatch);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res,
    });
    return res;
  } catch (error) {
    dispatch({
      type: LOGIN_ERROR,
      payload: error,
    });
    Toast.show(error.message);
    // alert(
    //   'Something went wrong please try again later' + JSON.stringify(error),
    // );

    console.log('error is', error);
  }
};

export default callLoginApi;
