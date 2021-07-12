import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import * as apiEndPoint from './apiEndPoint';
import {LOADING_START, LOADING_STOP} from '../context/actions/type';

const instance = axios.create({
  baseURL: apiEndPoint.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// instance.interceptors.request.use(
//   (config) => {
//     config.headers.Authorization = token;  // add any token if require
//     return config;
//   },
//   (err) => Promise.reject(err),
// );

const internet = async dispatchLoaderAction => {
  const netState = await NetInfo.fetch();
  if (!netState.isConnected) {
    dispatchLoaderAction({
      type: LOADING_STOP,
    });
    alert('No internet');
    return Promise.reject(new Error('No internet'));
  }
};

export const sendPostRequest = async (url, body, dispatch) => {
  dispatch({
    type: LOADING_START,
  });
  await internet(dispatch);
  return instance
    .post(url, body)
    .then(response => response.data)
    .catch(err => {
      console.log(' api err: ', err.response.data);
      throw err.response.data;
    })
    .finally(() => {
      dispatch({
        type: LOADING_STOP,
      });
    });
};

export const sendGetRequest = async (url, params, dispatch) => {
  dispatch({
    type: LOADING_START,
  });
  await internet(dispatch);
  return instance
    .get(url, {
      params,
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log('api err', err.response.data);
      alert('api err' + err.response.data);
      throw err.response.data;
    })
    .finally(() => {
      dispatch({
        type: LOADING_STOP,
      });
    });
};

export const sendDeleteRequest = async (url, body, dispatch) => {
  dispatch({
    type: LOADING_START,
  });
  await internet(dispatch);
  return instance
    .delete(url, body)
    .then(response => response.data)
    .catch(err => {
      console.log(' api err: ', err.response.data);
      throw err.response.data;
    })
    .finally(() => {
      dispatch({
        type: LOADING_STOP,
      });
    });
};

export const sendPutRequest = async (url, body, dispatch) => {
  dispatch({
    type: LOADING_START,
  });
  await internet(dispatch);
  return instance
    .put(url, body)
    .then(response => response.data)
    .catch(err => {
      console.log(' api err: ', err.response.data);
      throw err.response.data;
    })
    .finally(() => {
      dispatch({
        type: LOADING_STOP,
      });
    });
};
