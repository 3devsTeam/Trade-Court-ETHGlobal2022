import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { Button } from '../ui/Button'
import { ButtonDisabled } from '../ui/ButtonDisabled'

interface Props {
  takerConfirmed: () => Promise<void>
  takerClaim: () => Promise<void>
}

export const ConfirmsTaker: React.FC<Props> = ({ takerConfirmed, takerClaim }) => {
  const { step } = useTypedSelector((state) => state.transactionReducer)

  return (
    <>
      {step === 1 ? (
        <ButtonDisabled onClick={() => takerConfirmed()} name="Done" color={'bg-purple'} />
      ) : null}
      {step === 2 ? <span className="text-xl font-bold">Waiting for confirmation...</span> : null}
      {step === 3 ? (
        <ButtonDisabled onClick={() => takerClaim()} name="Claim" color={'bg-purple'} />
      ) : null}
    </>
  )
}
