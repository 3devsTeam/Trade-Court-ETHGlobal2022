import React, { forwardRef, useRef, useState } from "react";
import { truncateAddress } from "../../utils/truncateAddress";
import { OfferModal } from "./OfferModal";
import { Modal } from "../ui/Modal";
import { IOffer } from "../../models/models";

export const Offer = forwardRef<any, any>((offer: IOffer, ref) => {
  const {
    _id,
    crypto,
    fiat,
    maker,
    minLimit,
    maxLimit,
    payMethods,
    quantity,
    unitPrice,
  } = offer;
  const payments = payMethods?.map((e: any) => e.bank.name);
  const { address } = maker;
  const { symbol } = crypto;
  const { ticker } = fiat;
  const [openOfferModal, setOpenOfferModal] = useState(false);

  const offerBody = (
    <>
      <div className='shadow-customDark bg-white grid text-sm grid-cols-offer gap-5 items-center h-[100px] w-full px-[20px] rounded-[20px]'>
        <div className='text-md'>
          <div>
            <p className='font-bold'>{truncateAddress(address)}</p>
          </div>
        </div>
        <div>
          <div>
            <div>
              <p className={"text-sm"}>
                <span className={"font-normal"}>Available: </span>
                <span className={"font-bold"}>
                  {parseFloat(quantity).toFixed(4)} {symbol}
                </span>
              </p>
            </div>
            <div>
              <p className={"text-sm"}>
                <span className={"font-normal"}>Limit: </span>
                <span className={"font-bold"}>
                  {minLimit}-{maxLimit} {ticker}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className='text-md'>
          <p className={""}>
            <span className={"font-bold text-lg"}>{unitPrice}</span>
            <span className={"text-sm text-gray font-bold"}> {ticker}</span>
          </p>
        </div>
        <div>
          <div>
            {payments.map((p: string, i: number) => (
              <div key={i} className={"text-sm font-bold"}>
                {p}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div>
            <button
              onClick={() => setOpenOfferModal(!openOfferModal)}
              className='bg-green text-lg text-white rounded-[10px] font-bold p-[6px]
            transition-all duration-500 hover:bg-lightGreen w-full'
            >
              <span className={"text-lg"}>Buy {symbol}</span>
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
        <OfferModal close={() => setOpenOfferModal(false)} offer={offer} />
      </Modal>
    </>
  );

  return ref ? (
    <div id='lastItem' ref={ref}>
      {offerBody}
    </div>
  ) : (
    <div>{offerBody}</div>
  );
});
