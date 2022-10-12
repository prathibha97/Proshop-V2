import { configureStore } from '@reduxjs/toolkit';
import { productListReducer, productDetailsReducer } from './reducers/productReducer'

export default configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
  },
});
