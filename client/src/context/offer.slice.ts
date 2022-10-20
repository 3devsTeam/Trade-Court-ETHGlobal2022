import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOffer, ROLES } from "../models/models";
import defaultImg from "../assets/defaultImg.svg";

const initialState: IOffer = {
  room: {
    roomId: "",
    stage: "no taker",
    amount: 0,
    createdAt: "",
  },
  _id: "",
  crypto: {
    address: "",
    balance: "",
    chainId: 0,
    decimals: 0,
    logoUrl: "",
    name: "",
    symbol: "",
    _id: "",
    tokenAmount: 0,
  },
  maker: {
    _id: "",
    address: "",
    offers: [],
    role: ROLES.user,
    __v: 0,
  },
  fiat: {
    _id: "",
    name: "",
    ticker: "",
    banks: [],
    regions: [],
    logoUrl: "",
  },
  unitPrice: 0,
  quantity: 0,
  payMethods: {
    items: [],
  },
  timeLimit: "15",
  minLimit: 0,
  maxLimit: 0,
  paymentMethod: {
    _id: "",
    logoUrl: "",
    name: "",
    __v: 0,
  },
  region: {
    _id: "",
    name: "",
    logoUrl: "",
    __v: 0,
  },
  offerComment: "",
};

export const offerSlice = createSlice({
  name: "create-offer",
  initialState,
  reducers: {
    setCrypto: (state, action) => {
      state.crypto = action.payload;
    },
    setFiat: (state, action) => {
      state.fiat = action.payload;
    },
    setUnitPrice: (state, action) => {
      state.unitPrice = action.payload;
    },
    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    setTimeLimit: (state, action) => {
      state.timeLimit = action.payload;
    },
    setMinPriceLimit: (state, action) => {
      state.minLimit = action.payload;
    },
    setMaxPriceLimit: (state, action) => {
      state.maxLimit = action.payload;
    },
    setComment: (state, action) => {
      state.offerComment = action.payload;
    },
    setRegion: (state, action) => {
      state.region = action.payload;
    },
    setBank: (state, action) => {
      state.paymentMethod = action.payload;
    },
    addPaymentMethod: (state, action) => {
      state.payMethods = [
        {
          ...state.payMethods,
          ...action.payload,
        },
      ];
    },
    // removePaymentMethod: (state, action) => ({
    //   ...state.payMethods,
    //   items: state.payMethods.filter((item) => item !== action.payload),
    // }),
  },
});

export const offerReducer = offerSlice.reducer;
export const offerActions = offerSlice.actions;
