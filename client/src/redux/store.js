import { legacy_createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { productListReducer, productDetailsReducer } from './reducers/productReducer'
import { cartReducer } from './reducers/cartReducers'

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
  cart: { cartItems: cartItemsFromStorage }
}

const reducer = combineReducers({

  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer
});

const middleware = [thunk]

const store = legacy_createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store

