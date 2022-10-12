import React from "react";
import { Item } from "./Dropdown";

interface Props {
  virtualItem: any;
  item: Item;
  onSelect: React.SetStateAction<any>;
  option: string;
}

export const DropdownItem = ({
  item,
  virtualItem,
  onSelect,
  option,
}: Props) => {
  return (
    <button
      onClick={() => onSelect(item)}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: `${virtualItem.size}px`,
        transform: `translateY(${virtualItem.start}px)`,
      }}
      className='cursor-pointer hover:bg-lightGray transition-colors duration-300 rounded-[10px]'
    >
      <div className='flex items-center space-x-3 px-4'>
        <img
          src={item?.logoUrl}
          className='h-8 w-8 rounded-full object-cover'
        />
        <span className='font-bold'>{eval(option)}</span>
      </div>
    </button>
  );
};
