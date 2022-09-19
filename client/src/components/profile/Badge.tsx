import React from "react";
import { truncateAddress } from "../../utils/truncateAddress";
import avatar from "../../assets/images/profile_pic.png";
import { Link } from "react-router-dom";
import { useAccount, useEnsName } from "wagmi";

export const Badge = () => {
  const { address } = useAccount();

  return (
    <div className={"bg-white rounded-[20px] p-[20px] shadow-lg"}>
      <div>
        <img src={avatar} alt="" />
        <span className={"font-bold"}>{truncateAddress(address!)}</span>
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
