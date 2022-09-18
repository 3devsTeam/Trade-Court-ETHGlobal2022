import { BigNumber } from "ethers"

export interface IOffer {
    offerType?: "buy" | "sell"
    crypto: IToken
    fiat: IFiat
    unitPrice: number
    quantity: number
    paymentMethods: IPayments[]
    paymentMethod?: IBank
    region?: IRegion
    cardNumber?: string
    timeLimit: string
    priceLimit: [number, number]
    comment: string   
    paymentDescription?: string
    amount?: number
}

export interface IForm {
    step: number
}

export interface IPayments {
    cardNumber: string
    paymentDescription: string
    paymentMethod: IBank
    region: IRegion
}

export interface IToken {
    tokenAmount: number 
	address: string
	balance: number | BigNumber | string
	chainId: number
	decimals: number
	logoUrl: string
	name: string
	symbol: string
	_id: string
}

export interface IBank {
    _id: string
    logoUrl: string
    name: string
    __v: number
}

export interface IRegion {
    _id: string,
    name: string,
    logoUrl: string,
    __v: number
}

export interface IFiat {
 
    _id: string
    name: string
    ticker: string
    banks: IBank[]
    regions: IRegion[]
    logoUrl: string  
}

