import React from "react";
import { Logo } from "./Logo";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import { LoginButton } from "./LoginButton";

export const Navbar = () => {
  return (
    <nav>
      <div className={"p-5 flex justify-between items-center w-full"}>
        <Logo />

        <ul className={"flex items-center gap-10 font-bold text-md"}>
          <li className="hover:underline underline-offset-2">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="hover:underline underline-offset-2">
            <Link to={"/create-offer"}>Create offer</Link>
          </li>
          <li className="hover:underline underline-offset-2">
            <Link to={"/settings"}>Settings</Link>
          </li>
        </ul>

        <LoginButton />
      </div>
    </nav>
  );
};
