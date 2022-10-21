import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IBank,
  IFiat,
  IOffer,
  IPayment,
  IRegion,
  IToken,
  ROLES,
} from "../models/models";
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
  payMethods: [],
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
    setCrypto: (state, action: PayloadAction<IToken>) => {
      state.crypto = action.payload;
    },
    setFiat: (state, action: PayloadAction<IFiat>) => {
      state.fiat = action.payload;
    },
    setUnitPrice: (state, action: PayloadAction<number>) => {
      state.unitPrice = action.payload;
    },
    setQuantity: (state, action: PayloadAction<number>) => {
      state.quantity = action.payload;
    },
    setTimeLimit: (state, action: PayloadAction<string>) => {
      state.timeLimit = action.payload;
    },
    setMinPriceLimit: (state, action: PayloadAction<number>) => {
      state.minLimit = action.payload;
    },
    setMaxPriceLimit: (state, action: PayloadAction<number>) => {
      state.maxLimit = action.payload;
    },
    setComment: (state, action: PayloadAction<string>) => {
      state.offerComment = action.payload;
    },
    setRegion: (state, action: PayloadAction<IRegion>) => {
      state.region = action.payload;
    },
    setBank: (state, action: PayloadAction<IBank>) => {
      state.paymentMethod = action.payload;
    },
    addPaymentMethod: (state, action: PayloadAction<IPayment>) => {
      state.payMethods.push(action.payload);
    },
    removePaymentMethod: (state, action: PayloadAction<string>) => {
      const newPayments = state.payMethods.filter(
        (payment) => payment.id !== action.payload
      );
      state.payMethods = newPayments;
    },
    updatePaymentMethod: (state, action) => {
      const { id, updatedItem } = action.payload;

      // const updated = state.payMethods.find(
      //   (payment) => payment.id === action.payload.id
      // );
    },
  },
});

export const offerReducer = offerSlice.reducer;
export const offerActions = offerSlice.actions;
