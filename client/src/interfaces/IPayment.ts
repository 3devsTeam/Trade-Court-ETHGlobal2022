import { IBank } from './IBank'
import { IRegion } from './IRegion'

export interface IPayment {
  id: string
  cardNumber: string
  paymentDescription: string
  paymentMethod: IBank
  region: IRegion
}
