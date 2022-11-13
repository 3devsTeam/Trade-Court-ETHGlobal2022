import React from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { IOffer } from '../../types/interfaces/offer.interface'
import { ApprovalStep } from './ApprovalStep'
import { SuccessPage } from './SuccessPage'
import { WaitingTransactionStep } from './WaitingTransactionStep'

interface Props {
  offer: IOffer
}

export const TransactionMaker: React.FC<Props> = ({ offer }) => {
  const { step } = useTypedSelector((state) => state.transactionReducer)

  return (
    <>
      {step === 1 ? <WaitingTransactionStep /> : null}
      {step === 2 ? <ApprovalStep amount={offer?.amount!} fiat={offer?.fiat.name} /> : null}
      {step === 3 ? <SuccessPage /> : null}
    </>
  )
}
