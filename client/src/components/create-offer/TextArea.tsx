import React from 'react'
import { Label } from '../ui/Label'

interface ITextArea {
  value: string | undefined
  onAction: any
  label: string
  placeholder: string
}

export const TextArea = ({ value, label, placeholder, onAction }: ITextArea) => {
  return (
    <div>
      <Label label={label} />

      <textarea
        spellCheck={false}
        value={value}
        onChange={(e) => onAction(e.target.value)}
        placeholder={placeholder}
        className={`p-3 w-full min-h-[200px] rounded-[15px] inputBorder`}
      />
    </div>
  )
}
