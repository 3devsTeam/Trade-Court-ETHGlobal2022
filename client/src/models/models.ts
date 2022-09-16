import { BigNumber } from "ethers"

export interface IOffer {
    crypto: IToken[]
    fiat: IFiat[]
    unitPrice: number
    quantity: number
    paymentMethods: object[]
    paymentMethod?: object[]
    region?: object[]
    cardNumber?: string
    timeLimit: string
    priceLimit: [number, number]
    comment: string   
    paymentDescription?: string
}

export interface IForm {
    step: number
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

