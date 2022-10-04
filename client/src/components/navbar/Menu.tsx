import React from "react";
import { NavLink } from "./NavLink";
import {
  ArrowTopRightOnSquareIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/20/solid";
import { useAccount, useDisconnect } from "wagmi";
import { MenuButton } from "./MenuButton";
import { CopyToClipBoard } from "../../icons/CopyToClipBoard";
import { HomeIcon } from "../../icons/HomeIcon";
import { ProfileIcon } from "../../icons/ProfileIcon";
import { ThreeDotsIcon } from "../../icons/ThreeDotsIcon";
import { PlusIcon } from "../../icons/PlusIcon";
import { useNavigate } from "react-router-dom";

interface Props {
  onClose: any;
  menuRef: React.MutableRefObject<null>;
}

export const Menu = ({ onClose, menuRef }: Props) => {
  const navigate = useNavigate();
  const { address } = useAccount();
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
      action: () => onClose(false),
      icon: <HomeIcon />,
      route: "/",
      name: "Home",
    },
    {
      action: () => onClose(false),
      icon: <ProfileIcon />,
      route: "/profile",
      name: "Profile",
    },
    {
      action: () => onClose(false),
      icon: <PlusIcon />,
      route: "/create-offer",
      name: "Create offer",
    },
    {
      action: () => onClose(false),
      icon: <ThreeDotsIcon />,
      route: "/settings",
      name: "Settings",
    },
  ];

  const menuButtons = [
    {
      caption: "Copy Address",
      onClick: () => copyToClipBoard(address!),
      icon: <CopyToClipBoard />,
    },
    {
      caption: "Show on Etherscan",
      icon: <ArrowTopRightOnSquareIcon width={30} height={30} />,
      href: `https://etherscan.io/address/${address}`,
    },
    {
      caption: "Disconnect",
      onClick: () => disconnectHandler(),
      icon: <ArrowRightOnRectangleIcon width={30} height={30} />,
    },
  ];

  return (
    <nav
      ref={menuRef}
      className='flex flex-col absolute w-full rounded-lg z-50'
    >
      <div className='mt-3 bg-white p-3 rounded-lg flex flex-col shadow-customDark'>
        {navLinks.map((link) => (
          <NavLink
            onClose={link.action}
            icon={link.icon}
            route={link.route}
            name={link.name}
          />
        ))}
      </div>

      <div className='flex justify-between bg-white p-3 rounded-lg shadow-customDark mt-2'>
        {menuButtons.map((btn) => {
          if (btn.href) {
            return (
              <a target={"_blank"} href={btn.href}>
                <MenuButton caption={btn.caption} icon={btn.icon} />
              </a>
            );
          } else {
            return (
              <MenuButton
                caption={btn.caption}
                icon={btn.icon}
                onClick={btn.onClick}
              />
            );
          }
        })}
      </div>
    </nav>
  );
};
