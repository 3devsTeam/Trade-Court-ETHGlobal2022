import { IBank } from './IBank'
import { IRegion } from './IRegion'

export interface IFiat {
  _id: string
  name: string
  ticker: string
  banks: IBank[]
  regions: IRegion[]
  logoUrl: string
}
