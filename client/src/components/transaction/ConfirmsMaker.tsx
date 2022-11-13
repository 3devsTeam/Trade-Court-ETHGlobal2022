import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { Button } from '../ui/Button'
import { ButtonDisabled } from '../ui/ButtonDisabled'

interface Props {
  makerConfirmed: () => void
}

export const ConfirmsMaker: React.FC<Props> = ({ makerConfirmed }) => {
  const { step } = useTypedSelector((state) => state.transactionReducer)

  const { next } = useActions()

  const navigate = useNavigate()

  return (
    <>
      {step === 1 || step === 2 ? (
        <ButtonDisabled
          name={'Funds recieved'}
          onClick={() => makerConfirmed()}
          disabled={step === 1}
        />
      ) : null}
      {step === 3 ? (
        <Button
          name="Go to Home page"
          onClick={() => navigate('/')}
          color={'bg-purple'}
          text={'text-white text-lg'}
        />
      ) : null}
    </>
  )
}
