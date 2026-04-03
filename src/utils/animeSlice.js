import { createSlice } from "@reduxjs/toolkit";

const animeSlice = createSlice({
    name: 'anime',
    initialState:{
        promo: null,
        topAnime: null,
        seasonAnime: null
    },
    reducers:{
        addPromo: (state, action) => {
            state.promo = action.payload
        },
        addTopAnime: (state, action) => {
            state.topAnime = action.payload
        },
        addSeasonAnime: (state, action) => {
            state.seasonAnime = action.payload
        }
    }
})

export const {addPromo, addTopAnime, addSeasonAnime} = animeSlice.actions;
export default animeSlice.reducer