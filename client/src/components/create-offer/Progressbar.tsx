import React from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'

interface IProgressBar {
  steps: string[]
  step: number
}

export const Progressbar = ({ steps, step }: IProgressBar) => {
  return (
    <div
      className={
        'bg-white flex justify-between rounded-[20px] px-[21px] py-[12px] shadow-customDark'
      }
    >
      {steps.map((stepElement, i) => {
        return (
          <div key={i} className={'flex flex-col items-center'}>
            <p
              className={`${
                step === i + 1 ? 'text-black' : 'text-gray'
              } transition duration-300 font-bold mb-2`}
            >
              {stepElement}
            </p>
            <div
              className={`text-white h-[40px] w-[40px] rounded-[9999px] flex justify-center items-center font-bold ${
                step === i + 1 ? 'bg-purple' : 'bg-gray-200'
              } transition duration-300`}
            >
              {i + 1}
            </div>
          </div>
        )
      })}
    </div>
  )
}
