import _ from 'lodash';
import Object from 'lodash/Object';
import Array from 'lodash/Array';
import {
  getUsersData,
  appendUserData,
  removeUserData,
  editUserData
} from '../Action';
import axios from 'axios';
const usersState = {
  usersData: []
};

const UsersReducer = (state = usersState, action) => {
  switch (action.type) {
    case 'GetUsersData':
      return {
        usersData: action.value
      };
    case 'AppendUserData':
      var temp = _.concat(state.usersData, action.value);
      return {
        usersData: action.value.id != undefined ? temp : state.usersData,
        method: 'POST',
        formData: action.value,
        actionUrl: 'https://staging-api.esquiretek.com/users'
      };
    case 'RemoveUserData':
      temp = _.filter(state.usersData, function(n) {
        return n.id != action.value.id;
      });
      return {
        usersData: temp,
        method: 'DELETE',
        actionUrl: 'https://staging-api.esquiretek.com/users/' + action.value
      };
    case 'EditUserData':
      let updatedState;
      if (action.status == 'Updated') {
        updatedState = _.map(state.usersData, values => {
          if (action.userId == values.id) {
            values = action.value;
          }
          values = values;
          return values;
        });
      }
      return {
        usersData: action.status == 'Updated' ? updatedState : state.usersData,
        method: 'PUT',
        actionUrl: 'https://staging-api.esquiretek.com/users/' + action.userId,
        formData: action.value,
        userId: action.userId
      };

    default:
      return state;
  }
};
export default UsersReducer;

export const GetUsersTable = () => async (dispatch, getState) => {
  const token = getState().LoginReducer.authToken;
  // console.log("GetUserTable",token);
  axios({
    url: 'https://staging-api.esquiretek.com/users',
    method: 'GET',
    headers: {
      authorization: token
    }
  })
    .then(response => {
      // console.log('GetCasesTable_response', response);
      dispatch(getUsersData(response.data));
    })
    .catch(error => {
      // console.log(error);
    });
};

export const ModifyUser = () => (dispatch, getState) => {
  const token = getState().LoginReducer.authToken;
  const method = getState().UsersReducer.method;
  let formData = getState().UsersReducer.formData;
  const actionUrl = getState().UsersReducer.actionUrl;
  const userId = getState().UsersReducer.userId;
  // console.log("ModifyUser",method,formData,actionUrl);
  axios({
    method: method,
    url: actionUrl,
    headers: {
      authorization: token
    },
    data: JSON.stringify(formData)
  })
    .then(response => {
      // console.log('ModifyUser_response', response);
      if (method == 'POST') {
        dispatch(appendUserData(response.data));
      } else if (method == 'DELETE') {
        dispatch(removeUserData(response.data));
      } else if (method == 'PUT') {
        dispatch(editUserData(response.data, userId, 'Updated'));
      }
    })
    .catch(error => {
      // console.log('err', error);
    });
};
