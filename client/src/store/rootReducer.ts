import { combineReducers } from 'redux'
import { formReducer } from './form.slice'
import { offerReducer } from './offer.slice'

export const rootReducer = combineReducers({
  formReducer,
  offerReducer
})
