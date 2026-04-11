import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import animeReducer from './animeSlice'
import FindGptReducer from "./findGptSlice";

const appStore = configureStore({
    reducer:{
        user: userReducer,
        anime: animeReducer,
        FindGpt: FindGptReducer
    }
})

export default appStore;