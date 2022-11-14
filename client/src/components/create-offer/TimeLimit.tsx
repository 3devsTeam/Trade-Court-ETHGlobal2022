import React from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { Label } from '../ui/Label'

interface ITimeLimit {
  onAction: any
  times: string[]
  label: string
}

export const TimeLimit = ({ times, label, onAction }: ITimeLimit) => {
  const { timeLimit } = useTypedSelector((state) => state.createOfferReducer)

  return (
    <div>
      <Label label={label} />
      <div className={'flex items-center justify-between p-5'}>
        {times.map((t: string, i: number) => {
          return (
            <button
              type="button"
              onClick={() => onAction(t)}
              className={`${
                timeLimit === t ? 'text-purple' : 'text-gray'
              } font-bold cursor-pointer`}
              key={i}
            >{`${t} min`}</button>
          )
        })}
      </div>
    </div>
  )
}
