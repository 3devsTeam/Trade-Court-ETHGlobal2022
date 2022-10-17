import React from "react";
import { NavLink } from "./NavLink";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import { useNavigate } from "react-router-dom";
import { MenuButton } from "./MenuButton";
import { HomeIcon } from "../ui/icons/HomeIcon";
import { ProfileIcon } from "../ui/icons/ProfileIcon";
import { AddIcon } from "../ui/icons/AddIcon";
import { SettingsIcon } from "../ui/icons/SettingsIcon";
import { CopyIcon } from "../ui/icons/CopyIcon";
import { GoToLinkIcon } from "../ui/icons/GoToLinkIcon";
import { DisconnectIcon } from "../ui/icons/DisconnectIcon";
import { AvatarIcon } from "../ui/icons/AvatarIcon";

interface Props {
  address: string;
  balance: any;
  ensName: any;
  onClose: any;
  menuRef: React.MutableRefObject<null>;
}

export const Menu = ({
  address,
  balance,
  ensName,
  onClose,
  menuRef,
}: Props) => {
  const navigate = useNavigate();
  const { disconnect } = useDisconnect();

  const copyToClipBoard = (copyText: string) => {
    navigator.clipboard.writeText(copyText);
  };

  const disconnectHandler = () => {
    disconnect();
    onClose(false);
    navigate("/");
  };

  const navLinks = [
    {
      icon: <HomeIcon />,
      route: "/",
      name: "Home",
    },
    {
      icon: <ProfileIcon />,
      route: "/profile",
      name: "Profile",
    },
    {
      icon: <AddIcon />,
      route: "/create-offer",
      name: "Create offer",
    },
    {
      icon: <SettingsIcon />,
      route: "/settings",
      name: "Settings",
    },
  ];

  const menuButtons = [
    {
      caption: "Copy Address",
      onClick: () => copyToClipBoard(address!),
      icon: <CopyIcon />,
    },
    {
      caption: "Show on Etherscan",
      icon: <GoToLinkIcon />,
      href: `https://etherscan.io/address/${address}`,
    },
    {
      caption: "Disconnect",
      onClick: () => disconnectHandler(),
      icon: <DisconnectIcon />,
      captionColor: "bg-red-500",
    },
  ];

  return (
    <nav
      onMouseLeave={() => onClose(false)}
      className='flex justify-start flex-col absolute top-9 px-2 py-[12px] w-full z-50 bg-white shadow-customDark rounded-[20px]'
    >
      <div className={"flex justify-between"}>
        <div className='flex justify-between space-x-2'>
          <div>
            <AvatarIcon />
          </div>
          <div className={"flex flex-col font-bold"}>
            <span>{!ensName ? address : ensName}</span>
            <span>
              {balance?.formatted.slice(0, 8)} {balance?.symbol}
            </span>
          </div>
        </div>

        <div className={"flex items-center space-x-3"}>
          {menuButtons.map((button) => {
            return (
              <MenuButton
                onClick={button.onClick}
                icon={button.icon}
                href={button.href}
                caption={button.caption}
              />
            );
          })}
        </div>
      </div>

      <div className={"flex flex-col mt-[10px]"}>
        {navLinks.map((link) => (
          <NavLink icon={link.icon} name={link.name} route={link.route} />
        ))}
      </div>
    </nav>
  );
};
