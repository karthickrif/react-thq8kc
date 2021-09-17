import React from 'react';
import axios from 'axios';
var LoginAPI = 'https://staging-api.esquiretek.com/login';
var SessionAPI = 'https://staging-api.esquiretek.com/users/me';
export function FetchFromLoginApi(obj) {
  obj = JSON.stringify(obj);
  const request = axios({
    method: 'POST',
    url: LoginAPI,
    data: obj
  })
    .then(response => {
      // console.log('loginApi', response);
      return response.data;
    })
    .catch(error => {
      // console.log('login', error);
      return error;
    });
  return request;
}

export function FetchfromSessionApi(obj) {
  const request = axios({
    method: 'GET',
    url: SessionAPI,
    headers: {
      authorization: obj
    }
  })
    .then(response => {
      // console.log('sessionApi', response);
      return response.data;
    })
    .catch(error => {
      // console.log(error);
    });
  return request;
}
