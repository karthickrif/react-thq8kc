import { takeLatest, put, call, delay } from 'redux-saga/effects';
import { FetchFromLoginApi, FetchfromSessionApi } from './FetchData';

function* loginAsync(action) {
  const authData = yield call(FetchFromLoginApi, action.value);
  yield delay(1000);
  if (authData.authToken != undefined) {
    const sessionData = yield call(FetchfromSessionApi, authData.authToken);
    yield put({ type: 'ReceiveApiData', value: sessionData });
    yield put({ type : 'ReceiveAuthToken' , value: authData.authToken})
    yield put({ type : 'FailedAuthToken' , value: authData,status : "success"})
    yield delay(5000);
    yield put({ type : 'FailedAuthToken' , value: authData, status : ""});
  } else {
    yield put({ type : 'FailedAuthToken' , value: authData, status : "failed"})
    yield delay(5000);
    yield put({ type : 'FailedAuthToken' , value: authData, status : ""});
  }
}

export function* rootSaga() {
  yield takeLatest('GetLoginData', loginAsync);
}
