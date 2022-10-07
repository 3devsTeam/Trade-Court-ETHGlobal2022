import React, { useEffect } from "react";
import { Logo } from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "./NavLink";
import { useAccount, useConnect, useSignMessage } from "wagmi";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "../../api/user.services";
import Cookies from "js-cookie";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ConnectButton } from "./ConnectButton";
import { SwitchNetwork } from "./SwitchNetwork";

export const Navbar = () => {
  const { isConnected, isDisconnected, address, connector } = useAccount();
  const navigate = useNavigate();

  const message = "login";

  const { data, isError, isSuccess, signMessage } = useSignMessage({
    message,
  });

  let isLogged = Boolean(localStorage.getItem("isLogged"));

  if (isSuccess) {
    UserService.login({
      address,
      messageRaw: message,
      signature: data,
    }).then(() => localStorage.setItem("isLogged", "true"));
  }

  // useEffect(() => {
  //   if (connector && isConnected && !isDisconnected && !Cookies.get("jwt")) {
  //     console.log("sign useeffect");
  //     signMessage();
  //   }
  // }, [isConnected, connector]);

  // useEffect(() => {
  //   if (isDisconnected) {
  //     console.log("disconnect useeffect");
  //     UserService.logout().then(() =>
  //       localStorage.setItem("isLogged", "false")
  //     );
  //     navigate("/");
  //   }
  // }, [isDisconnected]);

  return (
    <header>
      <div
        className={
          "p-5 flex justify-between items-center w-full border border-b-gray-300"
        }
      >
        <Logo />

        <div className='flex space-x-5 items-center'>
          {isConnected && <SwitchNetwork />}
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};
