import React from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { IStep } from './ProgressBar'

export const ProgressBarStep: React.FC<IStep> = ({ step, name, currentStep }) => {
  const { step: stepNum } = useTypedSelector((state) => state.createOfferReducer)

  return (
    <div className="flex items-center gap-x-2">
      <div
        className={`text-white h-[40px] w-[40px] rounded-[9999px] flex justify-center items-center font-bold ${
          step === stepNum ? 'bg-purple' : 'bg-gray-200'
        } transition duration-300`}>
        {currentStep! + 1}
      </div>
      <div>
        <span
          className={`${
            step === stepNum ? 'text-black' : 'text-gray-300'
          } transition duration-300 font-bold mb-2`}>
          {name}
        </span>
      </div>
    </div>
  )
}
