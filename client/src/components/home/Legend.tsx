import React, { ReactNode } from 'react'

interface ILegend {
  fields: { name: string; className: string }[]
}

export const Legend = ({ fields }: ILegend) => {
  return (
    <div className="flex items-center font-bold px-4 select-none">
      {fields.map((field, i) => {
        return (
          <div className={field.className} key={i}>
            {field.name}
          </div>
        )
      })}
    </div>
  )
}
