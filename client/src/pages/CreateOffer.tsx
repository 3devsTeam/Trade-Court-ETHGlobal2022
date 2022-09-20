import React, { useState, useEffect } from "react";
import { Form } from "../components/create-offer/Form";
import { FormNav } from "../components/create-offer/FormNav";
import { Preview } from "../components/create-offer/Preview";
import { Progressbar } from "../components/create-offer/Progressbar";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Step1 } from "../components/create-offer/form-pages/Step1";
import { Step2 } from "../components/create-offer/form-pages/Step2";
import { Step3 } from "../components/create-offer/form-pages/Step3";
import { useActions } from "../hooks/useActions";
import { useNavigate } from "react-router-dom";
import { OfferService } from "../services/offer.services";
import { totalAmount } from "../utils/totalAmount";
import { Modal } from "../components/modal/Modal";
import { Button } from "../components/create-offer/Button";

export const CreateOffer = () => {
  const { step } = useTypedSelector((state) => state.formReducer);

  const { nextStep, prevStep } = useActions();

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
      amount: totalAmount(),
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

  const steps = ["Offer Price", "Payment method", "Settings"];

  return (
    <>
      <Progressbar steps={steps} step={step} />
      <div className={"grid grid-cols-2 gap-5"}>
        <Form>
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}
        </Form>
        <Preview />
        <FormNav>
          <div className="flex gap-3">
            {step > 1 && (
              <Button
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
            onAction={null}
            name={"Help"}
            fWeight={"bold"}
            fSize={"lg"}
            tColor={"purple"}
          />
        </FormNav>

        <Modal
          width={"700px"}
          canClose={false}
          isOpen={successModal}
          close={() => openSuccessModal(false)}
          header={"You did it!"}
        >
          <h1>Offer is created, some magic happens</h1>
        </Modal>
      </div>
    </>
  );
};
