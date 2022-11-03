import { createSlice } from '@reduxjs/toolkit'

interface IForm {
  step: number
}

const initialState: IForm = {
  step: 1
}

const formSlice = createSlice({
  name: 'form-slice',
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step++
    },
    prevStep: (state) => {
      state.step--
    },
    resetStep: () => initialState
  }
})

export const formReducer = formSlice.reducer
export const formActions = formSlice.actions
