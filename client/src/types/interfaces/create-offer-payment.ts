import { IBank } from './bank.interface'
import { IPayment } from './payment.interface'

export interface ICreateOfferPayment extends Omit<IPayment, 'bank'> {
  paymentMethod: IBank
}
