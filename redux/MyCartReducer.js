import {createSlice} from "@reduxjs/toolkit"
import { CartSlice } from "./CartReducer"

export const MyCartSlice = createSlice({
    name:"MyCart",
    initialState:{
        MyCart:[],
    },
    reducers:{
        AddToMyCart: (state, action) => {
            state.MyCart.push({ ...action.payload })
        },
        RemoveFromMyCart:(state,action)=>{
            state.MyCart = []
        }
    }
})
export const {AddToMyCart,RemoveFromMyCart} = CartSlice.actions;
export default MyCartSlice.reducer;