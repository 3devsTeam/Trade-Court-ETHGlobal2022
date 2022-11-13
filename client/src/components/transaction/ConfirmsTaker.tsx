import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { Button } from '../ui/Button'

interface Props {
  takerConfirmed: () => void
}

export const ConfirmsTaker: React.FC<Props> = ({ takerConfirmed }) => {
  const { step } = useTypedSelector((state) => state.transactionReducer)

  const { next } = useActions()

  return (
    <>
      {step === 1 ? (
        <Button
          onClick={() => takerConfirmed()}
          name="Done"
          color={'bg-purple'}
          text={'text-white text-lg'}
        />
      ) : null}
      {step === 2 ? <span>Wating for confirmation...</span> : null}
      {step === 3 ? (
        <Button
          onClick={() => next()}
          name="Claim"
          color={'bg-purple'}
          text={'text-white text-lg'}
        />
      ) : null}
    </>
  )
}
