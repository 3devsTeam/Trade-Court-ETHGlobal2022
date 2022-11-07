import { IOffer } from './offer.interface'

export interface IProfileOffer extends Omit<IOffer, ''> {
  amount: number
  totalAmount: number
}
