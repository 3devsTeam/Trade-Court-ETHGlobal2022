import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IOffer } from "../models/models"
import defaultImg from "../assets/defaultImg.svg"

const initialState: IOffer = {
    crypto: [{
        address: '',
        balance: '',
        chainId: 0,
        decimals: 0,
        logoUrl: defaultImg,
        name: '',
        symbol: 'Unknown token',
        _id: '',
        tokenAmount: 0
    }],
    fiat: [{
        _id: '',
        name: '',
        ticker: '',
        banks: [],
        regions: [],
        logoUrl: ''
    }],
    unitPrice: 0,
    quantity: 0,
    paymentMethods: [],
    timeLimit: '15',
    priceLimit: [0, 0],
    paymentMethod: [{
        _id: '',
        name: '',
        __v: 0
    }],  
    region: [{
        _id: '',
        name: '',
        logoUrl: '',
        __v: 0

    }], 
    cardNumber: '',
    paymentDescription: '',
    comment: '',
}

export const offerSlice = createSlice({
    name: "create-offer",
    initialState,
    reducers: {
        setCrypto: (state, action) => {state.crypto = action.payload},
        setFiat: (state, action) => {state.fiat = action.payload},
        setUnitPrice: (state, action) => {state.unitPrice = action.payload},
        setQuantity: (state, action) => {state.quantity = action.payload},
        addPaymentMethod: (state, action) => { state.paymentMethods.push(action.payload)},
        setTimeLimit: (state, action) => { state.timeLimit = action.payload },
        setMinPriceLimit: (state, action) => { state.priceLimit[0] = action.payload},
        setMaxPriceLimit: (state, action) => { state.priceLimit[1] = action.payload},
        setComment: (state, action) => { state.comment = action.payload},
        setRegion: (state, action) => { state.region = action.payload},
        setCardNumber: (state, action) => { state.cardNumber = action.payload},
        setPaymentDescription: (state, action) => { state.paymentDescription = action.payload},
        setPaymentMethod: (state, action) => { state.paymentMethod = action.payload},
        // resetPayment: (state) => {
        //     state.paymentMethod = {}
        //     state.region = {}
        //     state.cardNumber = ''
        //     state.paymentDescription = ''
        // }
    }
})

export const offerReducer = offerSlice.reducer
export const offerActions = offerSlice.actions