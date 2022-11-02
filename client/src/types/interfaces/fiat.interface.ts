import { IBank } from './bank.interface'
import { IRegion } from './region.interface'

export interface IFiat {
  _id: string
  name: string
  ticker: string
  banks: IBank[]
  regions: IRegion[]
  logoUrl: string
}
