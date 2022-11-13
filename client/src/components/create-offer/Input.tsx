import React from 'react'
import { Label } from '../ui/Label'

export interface IInput {
  onAction: any
  label?: string
  placeholder: string
  value: string | number
  element?: any
  maxValue?: any
  error?: any
}

export const Input = ({
  error,
  maxValue,
  onAction,
  label,
  placeholder,
  value,
  element
}: IInput) => {
  return (
    <div className="relative">
      <Label label={label!} />
      <div className="flex items-center">
        <input
          name={label}
          autoComplete={'off'}
          autoCorrect={'off'}
          spellCheck={false}
          onChange={(e) => onAction(e.target.value)}
          className={`rounded-[15px] w-full bg-transparent p-3 inputBorder`}
          placeholder={placeholder}
          value={value ? value : ''}
        />

        <div className={`absolute right-3 ${maxValue ? 'flex space-x-2 items-center' : null}`}>
          {maxValue ? (
            <>
              <button
                type="button"
                onClick={() => onAction(maxValue)}
                className={'font-bold text-purple'}
              >
                Max
              </button>
              <span className={'text-gray-300'}>|</span>
            </>
          ) : null}
          {element && <div className={'font-bold'}>{element}</div>}
        </div>
      </div>
    </div>
  )
}
