import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import animeReducer from './animeSlice'

const appStore = configureStore({
    reducer:{
        user: userReducer,
        anime: animeReducer,
    }
})

export default appStore;