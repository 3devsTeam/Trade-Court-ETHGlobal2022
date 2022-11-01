import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {IBank} from '../types/interfaces/bank.interface'
import {IFiat} from '../types/interfaces/fiat.interface'
import {IOffer} from '../types/interfaces/offer.interface'
import {IPayment} from '../types/interfaces/payment.interface'
import {IRegion} from '../types/interfaces/region.interface'
import {ICrypto} from '../types/interfaces/crypto.interface'
import {ROLES} from '../types/interfaces/roles.enum'

const initialState: IOffer = {
  room: {
    roomId: '',
    stage: 'no taker',
    amount: 0,
    createdAt: ''
  },
  _id: '',
  crypto: {
    address: '',
    balance: '',
    chainId: 0,
    decimals: 0,
    logoUrl: '',
    name: '',
    symbol: '',
    _id: '',
    tokenAmount: 0
  },
  maker: {
    _id: '',
    address: '',
    offers: [],
    role: ROLES.user,
    __v: 0
  },
  fiat: {
    _id: '',
    name: '',
    ticker: '',
    banks: [],
    regions: [],
    logoUrl: ''
  },
  unitPrice: 0,
  quantity: 0,
  payMethods: [],
  timeLimit: '15',
  minLimit: 0,
  maxLimit: 0,
  paymentMethod: {
    _id: '',
    logoUrl: '',
    name: '',
    __v: 0
  },
  region: {
    _id: '',
    name: '',
    logoUrl: '',
    __v: 0
  },
  offerComment: ''
}

export const offerSlice = createSlice({
  name: 'create-offer',
  initialState,
  reducers: {
    setCrypto: (state, { payload }: PayloadAction<ICrypto>) => {
      state.crypto = payload
    },
    setFiat: (state, { payload }: PayloadAction<IFiat>) => {
      state.fiat = payload
    },
    setUnitPrice: (state, { payload}: PayloadAction<number>) => {
      state.unitPrice = payload
    },
    setQuantity: (state, { payload }: PayloadAction<number>) => {
      state.quantity = payload
    },
    setTimeLimit: (state, { payload }: PayloadAction<string>) => {
      state.timeLimit = payload
    },
    setMinPriceLimit: (state, { payload }: PayloadAction<number>) => {
      state.minLimit = payload
    },
    setMaxPriceLimit: (state, { payload }: PayloadAction<number>) => {
      state.maxLimit = payload
    },
    setComment: (state, { payload }: PayloadAction<string>) => {
      state.offerComment = payload
    },
    setRegion: (state, {  payload }: PayloadAction<IRegion>) => {
      state.region = payload
    },
    setBank: (state, { payload }: PayloadAction<IBank>) => {
      state.paymentMethod = payload
    },
    addPaymentMethod: (state, { payload }: PayloadAction<IPayment>) => {
      state.payMethods.push(payload)
    },
    removePaymentMethod: (state, { payload }: PayloadAction<string>) => {
      state.payMethods = state.payMethods.filter((payment) => payment.id !== payload)
    },
    updatePaymentMethod: (state, { payload }: PayloadAction<IPayment>) => {
      const payment = state.payMethods.find((p) => p.id === payload.id)

      if (payment) {
        const index = state.payMethods.indexOf(payment)
        state.payMethods[index] = payload
      }
    },
    clearPayments: (state) => {
      state.payMethods = []
    },
    resetOffer: () => initialState
  }
})

export const offerReducer = offerSlice.reducer
export const offerActions = offerSlice.actions
