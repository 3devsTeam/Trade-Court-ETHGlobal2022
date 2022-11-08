import React from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { IOffer } from '../../types/interfaces/offer.interface'
import { SuccessPage } from './SuccessPage'
import { TransferStep } from './TransferStep'

interface Props {
  offer: IOffer
}

export const TransactionTaker: React.FC<Props> = ({ offer }) => {
  const { step } = useTypedSelector((state) => state.transactionReducer)

  return (
    <>
      {step === 1 || step === 2 ? <TransferStep payMethods={offer.payMethods} /> : null}
      {step === 3 ? <SuccessPage /> : null}
    </>
  )
}
