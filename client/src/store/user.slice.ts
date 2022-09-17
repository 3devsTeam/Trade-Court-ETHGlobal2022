import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLogged: true
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLogged: (state, action) => { state.isLogged = action.payload}
    }
})

export const userActions = UserSlice.actions
export const userReducer = UserSlice.reducer
