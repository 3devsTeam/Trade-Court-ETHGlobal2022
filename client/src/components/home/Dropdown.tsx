import { useVirtualizer } from "@tanstack/react-virtual";
import React, { useRef, useState } from "react";
import useOnClickOutside from "use-onclickoutside";
import { Arrow } from "../ui/icons/Arrow";
import { SearchField } from "../ui/SearchField";
import { DropdownItem } from "./DropdownItem";

interface Props {
  data: Item[];
  activeSelect: string;
}

export interface Item {
  name: string;
  symbol?: string;
  logoUrl: string;
}

export const Dropdown = ({ activeSelect, data }: Props) => {
  const [open, setOpen] = useState(false);

  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: data?.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const toggle = () => setOpen(!open);

  const filterItems = (items: Item[]) => {
    return items?.filter((i) =>
      i.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredItems = filterItems(data);

  return (
    <div className='border-2 border-gray-100 transition-all duration-300 hover:border-purple rounded-[10px]'>
      <button
        onClick={toggle}
        className='rounded-[10px] px-5 py-4 group w-full'
      >
        <div className='flex justify-between items-center'>
          <div>
            <span className='font-bold'>{activeSelect}</span>
          </div>
          <div
            className={`${
              open && "rotate-180 transition-transform duration-300"
            }`}
          >
            <Arrow />
          </div>
        </div>
      </button>

      {open && (
        <div className='space-y-3 p-2'>
          <SearchField
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
            placeholder={"Search..."}
          />

          <div ref={parentRef} className='h-52 overflow-auto'>
            <div
              className={`h-[${virtualizer.getTotalSize()}px] w-full relative`}
            >
              {virtualizer.getVirtualItems().map((virtualItem) => {
                const item = filteredItems[virtualItem.index];

                return (
                  <DropdownItem
                    key={virtualItem.key}
                    virtualItem={virtualItem}
                    item={item}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
