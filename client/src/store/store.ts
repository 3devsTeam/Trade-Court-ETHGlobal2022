import { configureStore } from '@reduxjs/toolkit'
import { offerReducer } from './offer.slice'
import { formReducer } from './form.slice'
import { userReducer } from './user.slice'

export const store = configureStore({
	reducer: {offerReducer, formReducer, userReducer}
})

export type RootState = ReturnType<typeof store.getState>
