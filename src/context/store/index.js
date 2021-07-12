// @ts-nocheck
import {Loader, login, signup} from '../reducers';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';

const rootReducer = combineReducers({
  loaderReducer: Loader,
  loginReducer: login,
  signupReducer: signup,
});

const store = createStore(rootReducer, applyMiddleware(createLogger()));

export {store};
