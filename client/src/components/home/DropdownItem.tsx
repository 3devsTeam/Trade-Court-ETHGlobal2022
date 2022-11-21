import React from 'react'
import { Item } from './Dropdown'
import { VirtualItem } from '@tanstack/react-virtual'

interface Props {
  virtualItem: VirtualItem
  item: Item
  onSelect: React.SetStateAction<any>
  options: string
}

export const DropdownItem = ({ item, virtualItem, onSelect, options }: Props) => {
  return (
    <button
      onClick={() => onSelect(item)}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: `${virtualItem.size}px`,
        transform: `translateY(${virtualItem.start}px)`
      }}
      className="cursor-pointer hover:bg-lightGray transition-colors duration-300 rounded-[10px]">
      <div className="flex items-center space-x-3 px-4">
        <img
          src={item?.logoUrl}
          alt=""
          className="w-8 h-8 rounded-[50%] shadow-customDark object-cover"
        />
        <span className="font-bold">{item?.[options]}</span>
      </div>
    </button>
  )
}
