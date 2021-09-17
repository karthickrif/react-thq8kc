import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import LoginReducer from './Reducers/Reducer';
import ClientReducer from './Reducers/ClientReducer';
import CasesReducer from './Reducers/CasesReducer';
import UsersReducer from './Reducers/UsersReducer';
import App from './App';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './Sagas/Saga';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import ClientForm from './Forms/ClientForm';

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
