import React, { useRef, useState } from "react";
import { truncateAddress } from "../../utils/truncateAddress";
import { OfferModal } from "../modal/OfferModal";
import { Modal } from "../modal/Modal";
import { off } from "process";

export const Offer = ({ offer }: any) => {
  console.log(offer);

  const {
    _id,
    amount,
    crypto,
    fiat,
    maker,
    offerComment,
    offerType,
    orderLimit,
    payMethods,
    quantity,
    room,
    unitPrice,
  } = offer;

  const { address } = maker;

  const { symbol } = crypto;
  const { ticker } = fiat;

  const [openOfferModal, setOpenOfferModal] = useState(false);

  const ref = useRef();
  return (
    <>
      <div
        key={_id}
        className="bg-white shadow-md grid text-sm grid-cols-offer gap-5 items-center h-[100px] w-full px-[20px] rounded-[20px] mb-[20px]"
      >
        <div className="text-md">
          <div>
            <p className="font-bold">{truncateAddress(address)}</p>
          </div>
        </div>

        <div>
          <div>
            <div>
              <p>Available </p>
              <span className="font-bold">{quantity}</span>
              <span> {symbol}</span>
            </div>
            <div>
              <p>Limit </p>
              <span className="font-bold">
                {orderLimit[0]}-{orderLimit[1]}
              </span>
              <span className="font-normal"> {ticker}</span>
            </div>
          </div>
        </div>

        <div className="text-md">
          <span className="text-md font-bold">{unitPrice}</span>
          <span className="text-sm font-normal"> {ticker}</span>
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
              <span className="text-md">Buy {symbol}</span>
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
        <OfferModal />
      </Modal>
    </>
  );
};
