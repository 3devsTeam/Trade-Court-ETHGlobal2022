import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import React from 'react'
import { escapeRegExp } from '../../utils/escapeRegExp'
import { Label } from '../ui/Label'

export interface Props {
  onUserInput: ActionCreatorWithPayload<string> | React.Dispatch<React.SetStateAction<string>>
  label?: string
  placeholder: string
  value: string | number
  element?: string | number
  maxValue?: string
  readOnly?: boolean
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`)

export const NumericalInput: React.FC<Props> = ({
  maxValue,
  onUserInput,
  label,
  placeholder,
  value,
  element,
  readOnly
}) => {
  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      onUserInput(nextUserInput)
    }
  }

  return (
    <div className="relative">
      <Label label={label!} />
      <div className="flex items-center">
        <input
          title={label}
          inputMode="decimal"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          onChange={(event) => enforcer(event.target.value.replace(/,/g, '.'))}
          className={`rounded-[15px] w-full bg-transparent p-3 inputBorder`}
          placeholder={placeholder || '0.0'}
          pattern="^[0-9]*[.,]?[0-9]*$"
          type="text"
          minLength={1}
          maxLength={79}
          readOnly={readOnly}
          value={value}
        />

        <div className={`absolute right-3 ${maxValue ? 'flex space-x-2 items-center' : null}`}>
          {maxValue ? (
            <>
              <button
                type="button"
                onClick={() => onUserInput(maxValue)}
                className={'font-bold text-purple'}>
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
