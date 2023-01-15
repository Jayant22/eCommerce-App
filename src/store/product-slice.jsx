import { createSlice } from '@reduxjs/toolkit';
const initialProductsState = { products: [] };

const productsSlice = createSlice({
  name: 'product',
  initialState: initialProductsState,
  reducers: {
    loadProducts(state, action) {
      state.products = action.payload;
    },
  },
});

export const productActions = productsSlice.actions;
export default productsSlice;
