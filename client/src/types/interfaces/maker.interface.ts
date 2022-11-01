import { ROLES } from './roles.enum'
import { IOffer } from './offer.interface'

export interface IMaker {
  __v: number
  _id: string
  address: string
  offers: IOffer[]
  role: ROLES
}
