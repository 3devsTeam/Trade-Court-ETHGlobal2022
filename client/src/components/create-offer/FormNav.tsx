import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { OfferService } from "../../services/offer.services";
import { multiply } from "../../utils/multiply";
import { Modal } from "../modal/Modal";
import { useNavigate } from "react-router";

export const FormNav = () => {
  const { nextStep, prevStep } = useActions();
  const { step } = useTypedSelector((state) => state.formReducer);

  const [successModal, openSuccessModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (successModal) {
      const timeOut = 3000;

      const closeTimeout = setTimeout(() => {
        navigate("/");
      }, timeOut);

      return () => {
        openSuccessModal(false);
        clearTimeout(closeTimeout);
      };
    }
  }, [successModal]);

  const {
    crypto,
    fiat,
    unitPrice,
    quantity,
    orderLimit,
    offerComment,
    payMethods,
  } = useTypedSelector((state) => state.offerReducer);

  const arr = payMethods.map((e) => {
    return {
      bank: e.paymentMethod._id,
      cardNumber: e.cardNumber,
      region: e.region._id,
      paymentDescription: e.paymentDescription,
    };
  });

  const createHandler = () => {
    console.log("create offer");

    OfferService.create({
      offerType: "buy",
      fiat: fiat._id,
      unitPrice,
      amount: multiply(unitPrice, quantity),
      quantity,
      orderLimit,
      crypto: crypto._id,
      offerComment,
      payMethods: arr,
    }).then(() => {
      openSuccessModal(true);
      //resetOffer();
    });
  };

  return (
    <>
      <div
        className={
          "bg-white rounded-[20px] shadow-lg p-5 max-h-[100px] flex justify-between items-center"
        }
      >
        <div className="flex gap-3">
          {step > 1 && (
            <Button
              type={"button"}
              onAction={prevStep}
              name={"Prev"}
              color={"purple"}
              rounded={"20px"}
              fWeight={"bold"}
              fSize={"lg"}
              tColor={"white"}
            />
          )}
          <Button
            type={"button"}
            onAction={() => {
              step < 3 ? nextStep() : step === 3 ? createHandler() : null;
            }}
            name={step === 3 ? "Create offer" : "Next"}
            color={"purple"}
            rounded={"20px"}
            fWeight={"bold"}
            fSize={"lg"}
            tColor={"white"}
          />
        </div>
        <Button
          type={"button"}
          onAction={null}
          name={"Help"}
          fWeight={"bold"}
          fSize={"lg"}
          tColor={"purple"}
        />
      </div>

      <Modal
        width={"700px"}
        canClose={false}
        isOpen={successModal}
        close={() => openSuccessModal(false)}
        header={"You did it!"}
      >
        <h1>Offer is created, some magic happens</h1>
      </Modal>
    </>
  );
};
