import { createSlice } from '@reduxjs/toolkit'
import { IPayment } from '../types/interfaces/payment.interface'
import { TRANSACTION_ROLES } from '../types/interfaces/roles.enum'

interface ITransactionSlice {
  step: number
  role: string
  room: string
  selectedPayment: any
}

const initialState: ITransactionSlice = {
  step: 1,
  role: '',
  room: '',
  selectedPayment: {}
}

export const TransactionSlice = createSlice({
  name: 'transaction slice',
  initialState,
  reducers: {
    setStep: (state, { payload }) => {
      state.step = payload
    },
    next: (state) => {
      state.step++
    },
    setRole: (state, { payload }) => {
      state.role = payload
    },
    setSelectedPayment: (state, { payload }) => {
      state.selectedPayment = payload
    },
    setRoom: (state, { payload }) => {
      state.room = payload
    }
  }
})

export const transactionReducer = TransactionSlice.reducer
export const transactionActions = TransactionSlice.actions
