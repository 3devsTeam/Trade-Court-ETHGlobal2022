import { configureStore } from '@reduxjs/toolkit'
import { offerReducer } from './offer.slice'
import { formReducer } from './form.slice'

export const store = configureStore({
	reducer: {offerReducer, formReducer}
})

export type RootState = ReturnType<typeof store.getState>
