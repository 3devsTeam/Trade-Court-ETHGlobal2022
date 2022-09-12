import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IOffer } from "../models/models"

const initialState: any = {}

export const offerSlice = createSlice({
    name: "create-offer",
    initialState,
    reducers: {}
})

export const offerReducer = offerSlice.reducer
export const offerActions = offerSlice.actions