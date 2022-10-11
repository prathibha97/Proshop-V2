import { configureStore } from '@reduxjs/toolkit';
import {productListReducer} from './reducers/productReducer'

export default configureStore({
  reducer: {
    productList: productListReducer
  },
});
