import { BigNumber } from "ethers"

export interface IOffer {
    crypto: IToken[]
    fiat: string
    unitPrice: number
    quantity: number
    paymentMethods: object[]
    paymentMethod?: string
    region?: string
    cardNumber?: string
    timeLimit: number
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