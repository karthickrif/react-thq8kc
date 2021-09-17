import _ from 'lodash';
import Object from 'lodash/Object';
import Array from 'lodash/Array';
import {
  getClientData,
  appendClientData,
  removeClientData,
  editClientData
} from '../Action';
import axios from 'axios';

const clientState = {
  clientData: []
};
const ClientReducer = (state = clientState, action) => {
  switch (action.type) {
    case 'GetClientData':
      return {
        clientData: action.value
      };
    case 'AppendClientData':
      var temp = _.concat(state.clientData, action.value);
      return {
        clientData: action.value.id != undefined ? temp : state.clientData,
        method: 'POST',
        formData: action.value,
        actionUrl: 'https://staging-api.esquiretek.com/clients'
      };
    case 'removeClientData':
      temp = _.filter(state.clientData, function(n) {
        return n.id != action.value.id;
      });
      return {
        clientData: temp,
        method: 'DELETE',
        actionUrl: 'https://staging-api.esquiretek.com/clients/' + action.value
      };
    case 'editClientData':
      let updatedState;
      if (action.status == 'Updated') {
        updatedState = _.map(state.clientData, values => {
          if (action.clientId == values.id) {
            values = action.value;
          }
          values = values;
          return values;
        });
      }
      return {
        clientData:
          action.status == 'Updated' ? updatedState : state.clientData,
        method: 'PUT',
        actionUrl:
          'https://staging-api.esquiretek.com/clients/' + action.clientId,
        formData: action.value,
        clientId: action.clientId
      };
    default:
      return state;
  }
};
export default ClientReducer;

export const GetClientTable = () => (dispatch, getState) => {
  const token = getState().LoginReducer.authToken;
  const method = getState().ClientReducer.method;
  // console.log("GetUserTable",method);
  axios({
    method: 'GET',
    url: 'https://staging-api.esquiretek.com/clients',
    headers: {
      authorization: token
    }
  })
    .then(response => {
      // console.log('GetUserTable_response', response);
      dispatch(getClientData(response.data));
    })
    .catch(error => {
      // console.log("err",error);
    });
};

export const ModifyClient = () => (dispatch, getState) => {
  const token = getState().LoginReducer.authToken;
  const method = getState().ClientReducer.method;
  let formData = getState().ClientReducer.formData;
  const actionUrl = getState().ClientReducer.actionUrl;
  const clientID = getState().ClientReducer.clientId;
  // console.log("ModifyClient",method,formData,actionUrl);
  axios({
    method: method,
    url: actionUrl,
    headers: {
      authorization: token
    },
    data: JSON.stringify(formData)
  })
    .then(response => {
      // console.log('ModifyClient_response', response);
      if (method == 'POST') {
        dispatch(appendClientData(response.data));
      } else if (method == 'DELETE') {
        dispatch(removeClientData(response.data));
      } else if (method == 'PUT') {
        dispatch(editClientData(response.data, clientID, 'Updated'));
      }
    })
    .catch(error => {
      // console.log('err', error);
    });
};
