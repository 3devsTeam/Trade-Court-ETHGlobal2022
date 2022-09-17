import { createSlice } from "@reduxjs/toolkit"

const initialState: any = {
    isLogged: false
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
