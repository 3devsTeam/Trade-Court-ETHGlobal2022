import React, { useRef, useState } from "react";
import useOnClickOutside from "use-onclickoutside";
import { Arrow } from "../../assets/icons/Arrow";

interface Props {
  activeSelect: string;
  children: React.ReactNode;
}

export const Dropdown = ({ activeSelect, children }: Props) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <div>
      <button
        onClick={toggle}
        className={`border border-gray-100 px-5 py-4 rounded-[10px] w-full transition-colors duration-300 hover:border-purple`}
      >
        <div className='flex justify-between items-center'>
          <div>
            <span className='font-bold'>{activeSelect}</span>
          </div>
          <div className={`${open && "rotate-180"}`}>
            <Arrow />
          </div>
        </div>

        {open && <div className='bg-white mt-5'>{children}</div>}
      </button>

      {open && <hr className='mt-5' />}
    </div>
  );
};
