import { IBank } from './bank.interface'
import { ICreateOfferPayment } from './create-offer-payment'
import { IOffer } from './offer.interface'
import { IRegion } from './region.interface'

export interface ICreateOffer extends Omit<IOffer, 'bank'> {
  timeLimit: string
  paymentMethod: IBank
  region: IRegion
}
