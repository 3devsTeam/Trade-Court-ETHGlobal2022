import { createSlice } from "@reduxjs/toolkit"
import { IForm } from "../models/models"

const initialState: any = {}

const formSlice = createSlice({
    name: 'form-slice',
    initialState,
    reducers: {}
})

export const formReducer = formSlice.reducer
export const formActions = formSlice.actions 