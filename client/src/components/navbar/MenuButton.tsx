import React from "react";

interface Props {
  icon: any;
  onClick?: any;
  caption: string;
}

export const MenuButton = ({ icon, onClick, caption }: Props) => {
  return (
    <button
      onClick={() => onClick()}
      className='hover:bg-gray-200 transition-colors duration-500 p-1 rounded-md relative group'
    >
      <figure className='z-50 absolute hidden group-hover:block text-[15px] bg-white shadow-customDark p-2 rounded-md mt-8 right-0'>
        <span className='font-bold'>{caption}</span>
      </figure>
      <i>{icon}</i>
    </button>
  );
};
