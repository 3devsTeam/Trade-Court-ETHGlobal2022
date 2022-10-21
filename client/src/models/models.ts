import { BigNumber } from "ethers";

export interface IOffer {
  _id: string;
  offerType?: "buy" | "sell";
  crypto: IToken;
  fiat: IFiat;
  unitPrice: number;
  quantity: number;
  payMethods: IPayment[];
  paymentMethod?: IBank;
  region?: IRegion;
  cardNumber?: string;
  timeLimit: string;
  minLimit: number;
  maxLimit: number;
  offerComment: string;
  paymentDescription?: string;
  amount?: number;
  maker: IMaker;
  tokenAmount?: number;
  room: {
    roomId: string;
    stage: "no taker" | "taker";
    amount: number;
    createdAt: any;
  };
}

export enum ROLES {
  admin,
  user,
  moderator,
}

export interface IMaker {
  __v: number;
  _id: string;
  address: string;
  offers: IOffer[];
  role: ROLES;
}

export interface IForm {
  step: number;
}

export interface IPayment {
  id: string;
  cardNumber: string;
  paymentDescription: string;
  paymentMethod: IBank;
  region: IRegion;
}

export interface IToken {
  tokenAmount: number;
  address: string;
  balance: number | BigNumber | string;
  chainId: number;
  decimals: number;
  logoUrl: string;
  name: string;
  symbol: string;
  _id: string;
}

export interface IBank {
  _id: string;
  logoUrl: string;
  name: string;
  __v: number;
}

export interface IRegion {
  _id: string;
  name: string;
  logoUrl: string;
  __v: number;
}

export interface IFiat {
  _id: string;
  name: string;
  ticker: string;
  banks: IBank[];
  regions: IRegion[];
  logoUrl: string;
}
