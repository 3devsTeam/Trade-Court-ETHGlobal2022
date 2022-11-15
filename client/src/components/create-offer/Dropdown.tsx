import React, { useState, useRef } from 'react'
import useOnClickOutside from 'use-onclickoutside'
import { Arrow } from '../ui/icons/Arrow'
import { Label } from '../ui/Label'

interface IDropdown {
  value: string | undefined
  fullName?: string
  onAction: any
  label?: string
  data: any
  image: string | undefined
}

interface ISelect {
  ticker: string
  logoUrl: string
  name: string
}

export const Dropdown = ({ value, fullName, onAction, label, data, image }: IDropdown) => {
  const ref = useRef(null)
  useOnClickOutside(ref, () => setIsOpen(false))
  const [isOpen, setIsOpen] = useState(false)

  const clickHandler = (select: any) => {
    onAction(select)
    setIsOpen(false)
  }

  return (
    <div className={'relative w-full'} ref={ref}>
      {label ? <Label label={label} /> : null}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={
          'flex items-center justify-between cursor-pointer w-full inputBorder rounded-[15px] p-2'
        }>
        <div className={'flex items-center space-x-2'}>
          <img
            className={'w-8 h-8 rounded-[50%] shadow-customDark object-cover'}
            src={image}
            alt={''}
          />
          <span className={'font-bold'}>
            {value} <span className={'font-bold text-gray-300'}>{fullName}</span>
          </span>
        </div>
        <div className={`transition duration-300 ${isOpen && 'rotate-180'}`}>
          <Arrow />
        </div>
      </button>

      {isOpen && (
        <div
          className={
            'rounded-[10px] absolute w-full shadow-2xl bg-white h-[250px] overflow-y-auto z-50'
          }>
          {data.map((select: ISelect, i: number) => {
            const { ticker, logoUrl, name } = select

            return (
              <div
                onClick={() => clickHandler(data[i])}
                key={i}
                className={
                  'p-2 cursor-pointer flex items-center gap-1 hover:bg-lightGray transition-colors duration-300'
                }>
                <img
                  className={'w-8 h-8 rounded-full shadow-customDark object-cover'}
                  width={32}
                  height={32}
                  src={logoUrl}
                  alt=""
                />
                <span className={'font-bold'}>
                  {ticker} <span className="font-bold text-gray-300">{name}</span>
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
