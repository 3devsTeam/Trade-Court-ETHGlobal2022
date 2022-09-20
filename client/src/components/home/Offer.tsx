import React, { useRef, useState } from "react";
import { truncateAddress } from "../../utils/truncateAddress";
import { OfferModal } from "../modal/OfferModal";
import { Modal } from "../modal/Modal";
import { IOffer } from "../../models/models";

export const Offer = (offer: IOffer) => {
  const {
    _id,
    crypto,
    fiat,
    maker,
    orderLimit,
    payMethods,
    quantity,
    unitPrice,
  } = offer;
  const payments = payMethods.map((e: any) => e.bank.name);
  const { address } = maker;
  const { symbol } = crypto;
  const { ticker } = fiat;
  const [openOfferModal, setOpenOfferModal] = useState(false);
  const ref = useRef();
  return (
    <div>
      <div className="bg-white shadow-md grid text-sm grid-cols-offer gap-5 items-center h-[100px] w-full px-[20px] rounded-[20px] mb-[20px]">
        <div className="text-md">
          <div>
            <p className="font-bold">{truncateAddress(address)}</p>
          </div>
        </div>
        <div>
          <div>
            <div>
              <p className={"text-gray font-bold"}>Available </p>
              <span>{quantity}</span>
              <span> {symbol}</span>
            </div>
            <div>
              <p className={"text-gray font-bold"}>Limit </p>
              <span>
                {orderLimit[0]}-{orderLimit[1]}
              </span>
              <span className="font-normal"> {ticker}</span>
            </div>
          </div>
        </div>
        <div className="text-md">
          <span className={"text-purple font-bold"}>
            {unitPrice} {ticker}
          </span>
        </div>
        <div>
          <div>
            {payments.map((p: string, i: number) => (
              <div key={i}>{p}</div>
            ))}
          </div>
        </div>
        <div>
          <div>
            <button
              onClick={() => setOpenOfferModal(!openOfferModal)}
              className="bg-lightGreen text-lg text-white rounded-[10px] font-bold p-2
            transition-all duration-500 hover:bg-white
             hover:text-purple hover:scale-110 hover:shadow-lg"
            >
              <span className={"text-md"}>Buy {symbol}</span>
            </button>
          </div>
        </div>
      </div>
      <Modal
        canClose={true}
        isOpen={openOfferModal}
        width={"700px"}
        header={"Transaction"}
        close={() => setOpenOfferModal(false)}
      >
        <OfferModal {...offer} />
      </Modal>
    </div>
  );
};
