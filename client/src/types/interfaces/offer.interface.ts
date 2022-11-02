import { IBank } from './bank.interface'
import { IFiat } from './fiat.interface'
import { IPayment } from './payment.interface'
import { IRegion } from './region.interface'
import { ICrypto } from './crypto.interface'
import { IMaker } from './maker.interface'

export interface IOffer {
  _id: string
  offerType?: 'buy' | 'sell'
  crypto: ICrypto
  fiat: IFiat
  unitPrice: number
  quantity: number
  payMethods: IPayment[]
  paymentMethod?: IBank
  region: IRegion
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
