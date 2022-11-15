import { createOfferActions } from '../state/create-offer.slice'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { transactionActions } from '../state/transaction.slice'
const allActions = {
  ...createOfferActions,
  ...transactionActions
}

export const useActions = () => {
  const dispatch = useDispatch()

  return bindActionCreators(allActions, dispatch)
}
