import React, { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "./NavLink";
import {
  useAccount,
  useBalance,
  useConnect,
  useEnsName,
  useSignMessage,
} from "wagmi";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "../../api/user.services";
import Cookies from "js-cookie";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ConnectButton } from "./ConnectButton";
import { SwitchNetwork } from "./SwitchNetwork";
import { Menu } from "./Menu";
import useOnClickOutside from "use-onclickoutside";

export const Navbar = () => {
  const navigate = useNavigate();

  const { signMessageAsync } = useSignMessage();

  const message = "login";

  // const { data, isError, isSuccess, signMessage } = useSignMessage({
  //   message,
  // });

  let isLogged = Boolean(localStorage.getItem("isLogged"));

  // if (isSuccess) {
  //   UserService.login({
  //     address,
  //     messageRaw: message,
  //     signature: data,
  //   }).then(() => localStorage.setItem("isLogged", "true"));
  // }

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

  const login = () => {};

  const { isConnected, address } = useAccount();
  const {
    data: balance,
    isError,
    isLoading,
  } = useBalance({
    addressOrName: address,
  });
  const { data: ensName, isSuccess } = useEnsName({
    address,
  });

  const [openConnectModal, setOpenConnectModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const menuRef = useRef(null);
  useOnClickOutside(menuRef, () => setOpenMenu(false));

  return (
    <nav className={"p-5 flex justify-between items-center w-full"}>
      <div>
        <Logo />
        <h1 className='text-purple text-sm'>
          Beta Version. Use at your own risk.
        </h1>
      </div>

      <div className='flex space-x-2 items-center relative h-10'>
        {isConnected && <SwitchNetwork />}
        <ConnectButton
          address={address!}
          ensName={ensName}
          balance={balance}
          isConnected={isConnected}
          openConnectModal={openConnectModal}
          openMenu={openMenu}
          setOpenConnectModal={setOpenConnectModal}
          setOpenMenu={setOpenMenu}
        />
        {openMenu && (
          <Menu
            address={address!}
            ensName={ensName}
            balance={balance}
            menuRef={menuRef}
            onClose={setOpenMenu}
          />
        )}
      </div>
    </nav>
  );
};
