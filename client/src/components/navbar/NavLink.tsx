import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface INavLink {
  name: string;
  route: string;
}

export const NavLink = ({ name, route }: INavLink) => {
  return (
    <div
      className={
        "cursor-pointer transition-colors duration-500 rounded-[10px] p-2 hover:bg-gray"
      }
    >
      <Link to={route}>
        <span className={"font-bold"}>{name}</span>
      </Link>
    </div>
  );
};
