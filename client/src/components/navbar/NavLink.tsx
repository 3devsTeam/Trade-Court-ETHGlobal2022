import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface INavLink {
  icon: any;
  name: string;
  route: string;
  onClose: any;
}

export const NavLink = ({ name, route, icon, onClose }: INavLink) => {
  return (
    <Link to={route}>
      <button
        onClick={() => onClose(false)}
        className='flex items-center w-full hover:bg-gray-100 transition-colors duration-300 p-4 rounded-lg space-x-2'
      >
        <i>{icon}</i>

        <div
          className={
            "cursor-pointer w-full flex justify-start rounded-lg transition-colors duration-100"
          }
        >
          <span className={"font-bold"}>{name}</span>
        </div>
      </button>
    </Link>
  );
};
