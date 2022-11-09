import { combineReducers } from 'redux'
import { createOfferReducer } from './create-offer.slice'
import { transactionReducer } from './transaction.slice'

export const rootReducer = combineReducers({
  createOfferReducer,
  transactionReducer
})
