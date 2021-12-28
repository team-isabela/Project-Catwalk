import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer.js';
// import api from '../api.js';

const axios = require('axios');

//Initial state
const initialState = {
  allProducts: [],
  currentProductId: 40344
}

//create context
export const GlobalContext = createContext(initialState);

//provider component
// eslint-disable-next-line react/prop-types
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //actions/functions
  function getAllProducts() {
    axios.get('http://localhost:3000/products')
      .then((productsPayload) => {
        dispatch({
          type: 'GET_ALL_PRODUCTS',
          payload: productsPayload
        });
      })
      .catch((error) => {
        console.error(error);
      })
  }

  function updateCurrentProductId(id) {
    axios.get(`http://localhost:3000/products/${id}`)
    .then((currentProductPayload) => {
      dispatch({
        type: 'UPDATE_CURRENT_ID',
        payload: id
      })
    })
    .catch((error) => {
      console.error(error);
    })
  }


  return(<GlobalContext.Provider value={{
    allProducts: state.allProducts,
    currentProductId: state.currentProductId,
    getAllProducts,
    updateCurrentProductId
  }}>
    {children}
  </GlobalContext.Provider>)
}