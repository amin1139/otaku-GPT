import { createSlice } from "@reduxjs/toolkit";

const animeSlice = createSlice({
    name: 'anime',
    initialState:{
        promo: null
    },
    reducers:{
        addPromo: (state, action) => {
            state.promo = action.payload
        }
    }
})

export const {addPromo} = animeSlice.actions;
export default animeSlice.reducer