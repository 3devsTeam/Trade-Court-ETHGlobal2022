import React, { useRef, useState } from "react";
import { truncateAddress } from "../../utils/truncateAddress";
import { OfferModal } from "../modal/OfferModal";
import { Modal } from "../modal/Modal";

export const Offer = ({ offer }: any) => {
  const [openOfferModal, setOpenOfferModal] = useState(false);

  const ref = useRef();
  return (
    <>
      <div className="bg-white shadow-md grid text-sm grid-cols-offer gap-5 items-center h-[100px] w-full px-[20px] rounded-[10px] mb-[20px]">
        <div className="text-md">
          <div>
            <span className="font-bold">
              {truncateAddress("0x7Bae409c84E0C3e56F44dB24D05277bdd004aBbB")}
            </span>
          </div>
        </div>

        <div>
          <div>
            <div>
              <span>Available </span>
              <span className="font-bold">{"7238923892393"} </span>
              {"ETH"}
            </div>
            <div>
              <span>Limit </span>
              <span className="font-bold">
                {"8923923923"}-{"2892392392"}
              </span>
              <span className="font-normal"> {"RUB"}</span>
            </div>
          </div>
        </div>

        <div className="text-md">
          <span className="text-md font-bold">
            {"120"} <span className="text-sm font-normal">{"RUB"}</span>
          </span>
        </div>

        <div>
          <div>{"payments"}</div>
        </div>

        <div>
          <div>
            <button
              onClick={() => setOpenOfferModal(!openOfferModal)}
              className="bg-lightGreen text-lg text-white px-[15px] rounded-[10px] font-bold h-[45px]
            transition-all duration-500 hover:bg-white
             hover:text-purple hover:scale-110 hover:shadow-lg"
            >
              <span className="text-md">Buy {"ETH"}</span>
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={openOfferModal}
        width={"700px"}
        header={"Transaction"}
        close={() => setOpenOfferModal(false)}
      >
        <OfferModal />
      </Modal>
    </>
  );
};
