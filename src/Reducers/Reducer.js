import { getClientData, getCasesData, getUsersData } from '../Action';
import axios from 'axios';
const initialState = {
  loginData: {}
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GetLoginData':
      return {
        loginData: action.value
      };
    case 'ReceiveApiData':
      return {
        loginData: state.loginData,
        sessionData: action.value
      };
    case 'ReceiveAuthToken':
      return {
        loginData: state.loginData,
        sessionData: state.sessionData,
        authToken: action.value
      };
    case 'FailedAuthToken':
      return {
        loginData: state.loginData,
        sessionData: state.sessionData,
        authToken: state.authToken,
        authStatus: action.status,
        authStatusData: action.value
      };
    default:
      return state;
  }
};
export default LoginReducer;

