import React, { useEffect } from "react";
import { Logo } from "./Logo";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import { LoginButton } from "./LoginButton";
import { NavLink } from "./NavLink";
import { useAccount, useSignMessage } from "wagmi";
import { verifyMessage } from "ethers/lib/utils"
import { useMutation } from "@tanstack/react-query";
import { UserService } from "../../services/user.services";

export const Navbar = () => {
  const { isConnected } = useAccount();

  // const { data, isError, isSuccess, signMessage } = useSignMessage({
  //   message: "login",
  //   onSuccess: (data, variables) => {
  //     console.log(data);
  //     console.log(variables);
  //     const address = verifyMessage(variables.message, data);
  //     console.log(address);
  //     // const mutation = useMutation(() =>
  //     //   UserService.userLogin({
  //     //     address,
  //     //     messageRaw: "login",
  //     //     signature: data!,
  //     //   })
  //     // );
  //     // mutation.mutateAsync();
  //   },
  // });

  // if (isSuccess) {
  // }

  // useEffect(() => {
  //   if (isConnected) {
  //     signMessage();
  //   }
  // }, [isConnected]);

  return (
    <nav>
      <div className={"p-5 flex justify-between items-center w-full"}>
        <Logo />

        <div className={"flex items-center gap-10"}>
          <NavLink route={"/"} name={"Home"} />
          <NavLink route={"/create-offer"} name={"Create offer"} />
          <NavLink route={"/settings"} name={"Settings"} />
        </div>

        <ConnectButton />
      </div>
    </nav>
  );
};
