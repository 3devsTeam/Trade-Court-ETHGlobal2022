import React from 'react'
import { ProgressBarStep } from './ProgressBarStep'

export interface IStep {
  step: number
  name: string
  currentStep?: number
}

interface IProgressBar {
  steps: IStep[]
}

export const ProgressBar = ({ steps }: IProgressBar) => {
  return (
    <div className={'bg-white flex justify-between rounded-[20px] p-5 shadow-customDark'}>
      {steps.map((s, i) => {
        const { step, name } = s

        return <ProgressBarStep step={step} name={name} currentStep={i} key={i} />
      })}
    </div>
  )
}
