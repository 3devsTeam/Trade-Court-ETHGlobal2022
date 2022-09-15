import React from "react";
import { Logo } from "./Logo";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import { LoginButton } from "./LoginButton";
import { NavLink } from "./NavLink";
import { useAccount } from "wagmi";

export const Navbar = () => {
  const { isConnected } = useAccount();
  console.log(isConnected);

  return (
    <nav>
      <div className={"p-5 flex justify-between items-center w-full"}>
        <Logo />

        <div className={"flex items-center gap-10"}>
          <NavLink route={"/"} name={"Home"} />
          <NavLink route={"/create-offer"} name={"Create offer"} />
          <NavLink route={"/settings"} name={"Settings"} />
        </div>

        <LoginButton />
      </div>
    </nav>
  );
};
