import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { username: '', city: [] },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        registerName: (state, action) => {
            state.value.username = action.payload;
        },
        addPlace: (state,action) => {
            state.value.city.push(action.payload)
        },

        removePlace: (state,action) => {
            state.value.city = state.value.city.filter(e => e.name !== action.payload)
        }


    },
});

export const {registerName, addPlace, removePlace} = userSlice.actions;
export default userSlice.reducer;
