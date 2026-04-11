import { createSlice } from "@reduxjs/toolkit";

const findGptSlice = createSlice({
    name:"findGpt",
    initialState:{
        isActive: false,
        findAnimeList: null,
        findAnimeLoading: false
    },
    reducers:{
        toggleActiveBtn:(state)=>{
            state.isActive = !state.isActive
        },
        findAnimeList:(state, actions) => {
            state.findAnimeList = actions.payload
        },
        findAnimeLoading:(state, actions) => {
            state.findAnimeLoading = actions.payload
        }
    }

})

export const { toggleActiveBtn, findAnimeList, findAnimeLoading } = findGptSlice.actions

export default findGptSlice.reducer