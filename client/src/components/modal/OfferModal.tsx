import React from "react";
import { truncateAddress } from "../../utils/truncateAddress";
import { OfferInput } from "../home/OfferInput";
import { useNavigate } from "react-router";

export const OfferModal = () => {
  const navigate = useNavigate();

  return (
    <div className="border-2 border-purple rounded-[15px] grid grid-cols-2">
      <div className="flex flex-col gap-3 p-3 cursor-default">
        <div>
          <span>
            {truncateAddress("0x7Bae409c84E0C3e56F44dB24D05277bdd004aBbB")}
          </span>
        </div>
        <div>
          <span>Unit Price: </span>
          {"9384384839489"} {"RUB"}
        </div>
        <div>
          <span>Available: </span>
          {"23892382392390"} {"ETH"}
        </div>
        <div>
          <span>Limit: </span>
          {"3893292399"}-{"327832823832"} {"RUB"}
        </div>
        <div className="break-words">{"lalalalallala"}</div>
      </div>

      <div className="flex flex-col gap-3 border-l border-gray p-3 ">
        <OfferInput
          maxValue={"238823902"}
          value={""}
          height={"60px"}
          action={null}
          type="number"
          placeholder={"I pay"}
          elementInInput={"RUB"}
        />
        <OfferInput
          maxValue={"892399230"}
          value={""}
          height={"60px"}
          action={null}
          type="number"
          placeholder={"I receive"}
          elementInInput={"ETH"}
        />

        <div className="grid grid-cols-2 mt-[20px] gap-1">
          <button
            //onClick={() => resetStateWhenClose()}
            className="shadow-md font-bold p-2 rounded-[10px]"
          >
            <span className="text-gray">Back</span>
          </button>
          <button
            onClick={() => navigate("/transaction")}
            className="bg-purple font-bold p-2 shadow-md rounded-[10px] w-full"
          >
            <span className="text-white">Buy {"ETH"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
