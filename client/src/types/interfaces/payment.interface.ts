import { IBank } from './bank.interface'
import { IRegion } from './region.interface'

export interface IPayment {
  id: string
  cardNumber: string
  paymentDescription: string
  paymentMethod: IBank
  region: IRegion
}
