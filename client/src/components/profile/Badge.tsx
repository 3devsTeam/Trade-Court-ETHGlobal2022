import React from "react";
import { truncateAddress } from "../../utils/truncateAddress";
import defaultAvatar from "../../assets/images/ava.svg";
import { Link } from "react-router-dom";
import { useAccount, useEnsName } from "wagmi";

interface IBadge {
  name: any;
  avatar: any;
}

export const Badge = ({ name, avatar }: IBadge) => {
  const { address } = useAccount();

  return (
    <div className={"bg-white rounded-[20px] p-[20px] shadow-customDark"}>
      <div>
        <img src={avatar ? avatar : defaultAvatar} alt={""} />

        <span className={"font-bold"}>
          {name ? name : truncateAddress(address!)}
        </span>
      </div>

      <div className={"flex justify-between mt-[20px]"}>
        <ul className={"flex flex-col gap-2 font-bold"}>
          <Link to={"#"}>
            <li>History</li>
          </Link>
          <Link to={"#"}>
            <li>Settings</li>
          </Link>
          <Link to={"#"}>
            <li>Disconnect</li>
          </Link>
        </ul>

        <ul className={"flex flex-col gap-2 font-bold text-gray"}>
          <Link to={"#"}>
            <li>Stats</li>
          </Link>
          <Link to={"#"}>
            <li>Staking</li>
          </Link>
          <Link to={"#"}>
            <li>Referal</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};
