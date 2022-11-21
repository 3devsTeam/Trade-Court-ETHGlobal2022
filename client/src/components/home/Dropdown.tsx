import { useVirtualizer } from '@tanstack/react-virtual'
import React, { useEffect, useRef, useState } from 'react'
import { ICrypto } from '../../types/interfaces/crypto.interface'
import { IFiat } from '../../types/interfaces/fiat.interface'
import { IPayment } from '../../types/interfaces/payment.interface'
import { IRegion } from '../../types/interfaces/region.interface'
import { Arrow } from '../ui/icons/Arrow'
import { SearchField } from '../ui/SearchField'
import { DropdownItem } from './DropdownItem'

interface Props {
  // activeSelect: IFiat | ICrypto | IPayment | IRegion | null
  // items: [IFiat | ICrypto | IPayment | IRegion | null]
  activeSelect: any
  items: any
  options: string
  label: string
  onSelect: React.SetStateAction<any>
}

export interface Item {
  [options: string]: string
}

export const Dropdown = ({ label, items, options, onSelect, activeSelect }: Props) => {
  const [open, setOpen] = useState(false)

  const parentRef = useRef(null)

  const virtualizer = useVirtualizer({
    count: items?.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60
  })

  const [searchTerm, setSearchTerm] = useState('')

  const toggle = () => setOpen(!open)

  const filteredItems = items?.filter((i: any) =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="border-2 border-gray-100 transition-all duration-300 hover:border-purple rounded-[15px]">
      <button onClick={toggle} className="rounded-[10px] p-2 group w-full focus:outline-none">
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            {activeSelect ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <img
                    className="w-8 h-8 rounded-full shadow-customDark object-cover"
                    src={activeSelect.logoUrl}
                  />

                  <span className="font-bold">{activeSelect?.[options]}</span>
                </div>

                <span className="font-bold text-gray-300">{label}</span>
              </div>
            ) : (
              <span className="font-bold">{label}</span>
            )}

            <div className={`${open && 'rotate-180 transition-transform duration-300'}`}>
              <Arrow />
            </div>
          </div>
        </div>
      </button>

      {open && (
        <div className="space-y-3 p-2">
          <SearchField
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
            placeholder={'Search...'}
          />

          <div ref={parentRef} className="h-52 overflow-y-auto">
            <div className={`h-[${virtualizer.getTotalSize()}px] w-full relative`}>
              {virtualizer.getVirtualItems().map((virtualItem) => {
                const item = filteredItems[virtualItem.index]

                return (
                  <DropdownItem
                    options={options}
                    onSelect={onSelect}
                    key={virtualItem.key}
                    virtualItem={virtualItem}
                    item={item}
                  />
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
