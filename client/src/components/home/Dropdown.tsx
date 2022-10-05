import React, { useState } from "react";
import { Arrow } from "../../icons/Arrow";

interface Props {
  activeSelect: string;
  children: React.ReactNode;
}

export const Dropdown = ({ activeSelect, children }: Props) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <button
      onClick={toggle}
      className='bg-white px-5 py-4 border-2 border-purple rounded-2xl w-full'
    >
      <div className='flex justify-between items-center'>
        <div>
          <span className='font-bold'>{activeSelect}</span>
        </div>
        <div className={`${open && "rotate-180"}`}>
          <Arrow />
        </div>
      </div>

      {open && <div className='bg-white border border-black'>{children}</div>}
    </button>
  );
};
