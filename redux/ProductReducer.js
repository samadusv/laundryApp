import { createSlice } from "@reduxjs/toolkit"

export const ProductSlice = createSlice({
    name: "product",
    initialState: {
        product: []
    },
    reducers: {
        addProduct: (state, action) => {
            state.product.push({ ...action.payload })
        },
        incrementQty: (state, action) => {
            const itemPresent = state.product.find((item) => item.id === action.payload.id);
            if (itemPresent) {
                itemPresent.quantity++;
            }
        },
        decrementQty: (state, action) => {
            const itemPresent = state.product.find((item) => item.id === action.payload.id);
            if (itemPresent.quantity == 1) {
                itemPresent.quantity = 0;
                // const removeItem = state.product.filter((item) => item.id !== action.payload.id);
                // state.product = removeItem; //this code only necessary for cart []
            } else {
                itemPresent.quantity--;
            }
        }
    }
})
export const {addProduct,incrementQty,decrementQty} = ProductSlice.actions;
export default ProductSlice.reducer;