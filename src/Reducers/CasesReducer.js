import _ from 'lodash';
import Object from 'lodash/Object';
import Array from 'lodash/Array';
import axios from 'axios';
import {
  getCasesData,
  appendCasesData,
  removeCasesData,
  editCasesData
} from '../Action';
const casesState = {
  casesData: []
};

const CasesReducer = (state = casesState, action) => {
  switch (action.type) {
    case 'GetCasesData':
      return {
        casesData: action.value
      };
      case 'AppendCasesData':
      var temp = _.concat(state.casesData, action.value);
      return {
        casesData: action.value.id != undefined ? temp : state.casesData,
        method: 'POST',
        formData: action.value,
        actionUrl: 'https://staging-api.esquiretek.com/cases'
      };
      case 'removeCasesData':
        temp = _.filter(state.casesData, function(n) {
          return n.id != action.value.id;
        });
        return {
          casesData: temp,
          method: 'DELETE',
          actionUrl: 'https://staging-api.esquiretek.com/cases/' + action.value
        };
      case 'editCasesData':
        let updatedState;
        if (action.status == 'Updated') {
          updatedState = _.map(state.casesData, values => {
            if (action.caseId == values.id) {
              values = action.value;
            }
            values = values;
            return values;
          });
        }
        return {
          casesData:
            action.status == 'Updated' ? updatedState : state.casesData,
          method: 'PUT',
          actionUrl:
            'https://staging-api.esquiretek.com/cases/' + action.caseId,
          formData: action.value,
          caseId: action.caseId
        };
    default:
      return state;
  }
};
export default CasesReducer;

export const GetCasesTable = () => (dispatch, getState) => {
  const token = getState().LoginReducer.authToken;
  axios({
    url: 'https://staging-api.esquiretek.com/cases',
    method: 'GET',
    headers: {
      authorization: token
    }
  })
    .then(response => {
      // console.log('GetCasesTable_response', response);
      dispatch(getCasesData(response.data));
    })
    .catch(error => {
      // console.log(error);
    });
};

export const ModifyCases = () => (dispatch, getState) => {
  const token = getState().LoginReducer.authToken;
  const method = getState().CasesReducer.method;
  let formData = getState().CasesReducer.formData;
  const actionUrl = getState().CasesReducer.actionUrl;
  const caseId = getState().CasesReducer.caseId;
  // console.log("ModifyCase",method,formData,actionUrl);
  axios({
    method: method,
    url: actionUrl,
    headers: {
      authorization: token
    },
    data: JSON.stringify(formData)
  })
    .then(response => {
      // console.log('ModifyCases_response', response);
      if (method == 'POST') {
        dispatch(appendCasesData(response.data));
      } else if (method == 'DELETE') {
        dispatch(removeCasesData(response.data));
      } else if (method == 'PUT') {
        dispatch(editCasesData(response.data, caseId, 'Updated'));
      }
    })
    .catch(error => {
      // console.log('err', error);
    });
};
