import { IBank } from './bank.interface'
import { ICrypto } from './crypto.interface'
import { IFiat } from './fiat.interface'
import { IOffer } from './offer.interface'

export interface IActiveOffer extends Omit<IOffer, 'timeLimit' | 'fiat' | 'crypto'> {
  fiat: IFiat[]
  crypto: ICrypto[]
  offer: IOffer[]
  banks: IBank[]
  stage: string
  roomId: string
}
