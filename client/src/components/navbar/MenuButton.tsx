import React from "react";

interface Props {
  href?: string;
  icon: any;
  onClick?: any;
  caption: string;
}

export const MenuButton = ({ href, icon, onClick, caption }: Props) => {
  return href ? (
    <a href={href} target={"_blank"}>
      <button className='hover:bg-gray-200 transition-colors duration-500 p-2 rounded-md relative group'>
        {icon}
        <figure
          className={`z-50 absolute hidden group-hover:block text-[15px] bg-white shadow-customDark p-2 rounded-md right-0 mt-2`}
        >
          <span className='font-bold'>{caption}</span>
        </figure>
      </button>
    </a>
  ) : (
    <button
      onClick={onClick}
      className='hover:bg-gray-200 transition-colors duration-500 rounded-md relative group p-2'
    >
      {icon}
      <figure
        className={`z-50 absolute hidden group-hover:block text-[15px] bg-white shadow-customDark p-2 rounded-md right-0 mt-2`}
      >
        <span className='font-bold'>{caption}</span>
      </figure>
    </button>
  );
};
