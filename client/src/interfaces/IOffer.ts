import { IBank } from './IBank'
import { IFiat } from './IFiat'
import { IPayment } from './IPayment'
import { IRegion } from './IRegion'
import { IToken } from './IToken'
import { IMaker } from './IMaker'

export interface IOffer {
  _id: string
  offerType?: 'buy' | 'sell'
  crypto: IToken
  fiat: IFiat
  unitPrice: number
  quantity: number
  payMethods: IPayment[]
  paymentMethod?: IBank
  region?: IRegion
  cardNumber?: string
  timeLimit: string
  minLimit: number
  maxLimit: number
  offerComment: string
  paymentDescription?: string
  amount?: number
  maker: IMaker
  tokenAmount?: number
  room: {
    roomId: string
    stage: 'no taker' | 'taker'
    amount: number
    createdAt: any
  }
}
