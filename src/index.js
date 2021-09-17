import App from './App';
import React from 'react';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { rootSaga } from './Sagas/Saga';
import createSagaMiddleware from 'redux-saga';
import LoginReducer from './Reducers/Reducer';
import UsersReducer from './Reducers/UsersReducer';
import CasesReducer from './Reducers/CasesReducer';
import { reducer as formReducer } from 'redux-form';
import ClientReducer from './Reducers/ClientReducer';
import { createStore, applyMiddleware, combineReducers } from 'redux';

const rootReducer = combineReducers({
  LoginReducer,
  ClientReducer,
  CasesReducer,
  UsersReducer,
  form: formReducer
});

function Main() {
  const sagaMiddleware = createSagaMiddleware();
  let store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  // store.subscribe(() => store.getState());
  store.subscribe(() => console.log('Store : ', store.getState()));
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
ReactDOM.render(<Main />, document.getElementById('root'));
