import { IOffer } from './offer.interface'

export interface IMaker {
  __v: number
  _id: string
  address: string
  offers: IOffer[]
  role: 'maker'
}
