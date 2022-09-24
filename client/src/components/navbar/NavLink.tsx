import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface INavLink {
  name: string;
  route: string;
}

export const NavLink = ({ name, route }: INavLink) => {
  return (
    <Link to={route}>
      <div
        className={
          "cursor-pointer transition-colors duration-500 rounded-[10px] p-2 hover:bg-gray"
        }
      >
        <span className={"font-bold"}>{name}</span>
      </div>
    </Link>
  );
};
