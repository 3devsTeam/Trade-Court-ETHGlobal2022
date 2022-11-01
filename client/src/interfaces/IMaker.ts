import { ROLES } from './ERoles'
import { IOffer } from './IOffer'

export interface IMaker {
  __v: number
  _id: string
  address: string
  offers: IOffer[]
  role: ROLES
}
