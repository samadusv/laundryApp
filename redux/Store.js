import {configureStore} from "@reduxjs/toolkit"
import CartReducer from "./CartReducer"
import ProductReducer from "./ProductReducer"
import MyCartReducer from "./MyCartReducer"

export default configureStore({
    reducer:{
        cart:CartReducer,
        product:ProductReducer,
        MyCart:MyCartReducer
    }
})