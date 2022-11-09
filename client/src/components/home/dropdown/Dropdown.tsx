import { useVirtualizer } from '@tanstack/react-virtual'
import React, { useEffect, useRef, useState } from 'react'
import useOnClickOutside from 'use-onclickoutside'
import { Arrow } from '../../ui/icons/Arrow'
import { SearchField } from '../../ui/SearchField'
import { DropdownItem } from './DropdownItem'

interface Props {
  activeSelect: any
  data: {
    items: [Item]
    options: string
  }
  label: string
  onSelect: React.SetStateAction<any>
}

export interface Item {
  name: string
  symbol?: string
  logoUrl: string
}

export const Dropdown = ({ label, data, onSelect, activeSelect }: Props) => {
  const [open, setOpen] = useState(false)

  const { items, options } = data

  const parentRef = useRef(null)

  const virtualizer = useVirtualizer({
    count: items?.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60
  })

  const [searchTerm, setSearchTerm] = useState('')

  const toggle = () => setOpen(!open)

  const filterItems = (items: Item[]) => {
    return items?.filter((i) => i.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  const filteredItems = filterItems(items)

  return (
    <div className="border-2 border-gray-100 transition-all duration-300 hover:border-purple rounded-[15px]">
      <button onClick={toggle} className="rounded-[10px] group w-full p-3">
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            {activeSelect ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <img className={'image'} src={activeSelect.logoUrl} alt={''} />

                  <span className="font-bold">{eval(`activeSelect.${options}`)}</span>
                </div>

                <span className="font-bold text-gray-300">{label}</span>
              </div>
            ) : (
              <span className="font-bold">{label}</span>
            )}

            <div className={`transition duration-300 ${open && 'rotate-180'}`}>
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

          <div ref={parentRef} className="h-52 overflow-auto">
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
