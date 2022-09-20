import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { OfferService } from "../services/offer.services";
import { Form } from "../components/create-offer/Form";
import { FormNav } from "../components/create-offer/FormNav";
import { Chat } from "../components/transaction/Chat";
import { Circle } from "../components/create-offer/Circle";
import transfer from "../assets/images/transfer.svg";
import lock from "../assets/images/lock.svg";
import success from "../assets/images/success.svg";
import { ProgressBar } from "../components/transaction/ProgressBar";
import { IOffer, IPayment } from "../models/models";
import { Payment } from "../components/create-offer/Payment";
import { sliceCardNumber } from "../utils/sliceCardNumber";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Button } from "../components/create-offer/Button";

export const Transaction = () => {
  const { id } = useParams();

  const [step, setStep] = useState(1);

  const [payMethod, setPayMethod] = useState({});
  console.log(payMethod);

  //   const { data: offer, isLoading } = useQuery(
  //     ["get offer by id"],
  //     () => OfferService.getByID(id!),
  //     {
  //       select: (data) => data.data.data.offer,
  //       onSuccess: (data) => {

  //         const { paymentMethods } = data

  //         setPayMethod(
  //           {...paymentMethods[0]}
  //         ),

  //   }
  // )

  const { data: offer, isLoading } = useQuery(
    ["get offer by id"],
    () => OfferService.getByID(id!),
    { select: (data) => data.data.data.offer }
  );

  return (
    <div>
      {isLoading ? (
        <Skeleton height={100} borderRadius={20} />
      ) : (
        <div
          className={
            "bg-white flex justify-between h-[100px] shadow-lg rounded-[20px] items-center px-[20px] py-[12px]"
          }
        >
          <div className={"flex flex-col"}>
            <div>
              <span className={"text-lg font-bold"}>You send </span>
              <span className={"text-lg font-bold text-purple"}>
                {offer?.fiat.ticker}
              </span>
            </div>
            <div>
              <span className={"text-lg font-bold"}>You send </span>
              <span className={"text-lg font-bold text-purple"}>
                {offer?.crypto.symbol}
              </span>
            </div>
          </div>

          <div className={"flex flex-col"}>
            <span className={"text-lg font-bold"}>Amount</span>
            <span className={"text-lg font-bold text-purple"}>
              {offer?.amount}
            </span>
          </div>

          <div className={"flex flex-col"}>
            <span className={"text-lg font-bold"}>Unit Price</span>
            <span className={"text-lg font-bold text-purple"}>
              {offer?.unitPrice}
            </span>
          </div>

          <div className={"flex flex-col"}>
            <span className={"text-lg font-bold"}>Quantity</span>
            <span className={"text-lg font-bold text-purple"}>
              {offer?.quantity}
            </span>
          </div>
        </div>
      )}

      <div className={"grid grid-cols-form gap-5 mt-[20px]"}>
        <Form>
          {isLoading ? (
            <Skeleton height={50} />
          ) : (
            <div>
              <ProgressBar
                activeStep={step}
                steps={["Transfer", "Approval", "Success"]}
                images={[transfer, lock, success]}
              />

              <div className={"flex items-center gap-2 mt-[15px]"}>
                {offer?.payMethods?.map((p: any) => {
                  console.log(p);
                  return (
                    <div
                      onClick={() => setPayMethod(p)}
                      key={p._id}
                      className={
                        "cursor-pointer px-[10px] py-[15px] h-[60px] rounded-[25px] border-2 border-gray flex gap-1 items-center min-w-[180px] bg-white"
                      }
                    >
                      <Circle />
                      <div>
                        <p className={"font-bold"}>{p.bank.name}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={"flex flex-col gap-[10px] mt-[15px]"}>
                <div>
                  <p className={"text-sm text-gray font-medium"}>Bank</p>
                  <p className={"font-bold"}>{payMethod?.bank?.name}</p>
                </div>

                <div>
                  <p className={"text-sm text-gray font-medium"}>Region</p>
                  <p className={"font-bold"}>{payMethod?.region?.name}</p>
                </div>

                <div>
                  <p className={"text-sm text-gray font-medium"}>Card number</p>
                  <p className={"font-bold"}>{payMethod?.cardNumber}</p>
                </div>

                <div
                  className={
                    "bg-yellow rounded-[15px] px-[20px] py-[10px] font-bold mt-[30px]"
                  }
                >
                  <p className={"text-sm"}>
                    Please check payment info twice before sending transaction.
                    <br />
                    Tradecourt are not responsible for lost transactions.
                  </p>
                </div>

                <div>
                  <div className={"flex gap-5"}>
                    <p className={"text-sm text-gray font-medium"}>
                      Created time
                    </p>
                    <p className={"text-sm font-bold"}>хз</p>
                  </div>

                  <div className={"flex gap-5"}>
                    <p className={"text-sm text-gray font-medium"}>
                      Order number:
                    </p>
                    <p className={"text-sm font-bold"}>{id}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Form>

        <Chat />

        <FormNav>
          <div className={"flex items-center justify-between w-full"}>
            {step === 1 && (
              <div>
                <Button
                  onAction={() => {}}
                  name={"Done, next!"}
                  fWeight={"bold"}
                  fSize={"lg"}
                  color={"purple"}
                  rounded={"15px"}
                  tColor={"white"}
                />
              </div>
            )}
            <div>
              <Button
                onAction={() => {}}
                name={"Cancel"}
                fWeight={"bold"}
                fSize={"lg"}
                tColor={"purple"}
              />
              <Button
                onAction={() => {}}
                name={"Appeal"}
                fWeight={"bold"}
                fSize={"lg"}
                tColor={"purple"}
              />
            </div>
          </div>
          {step === 2 && <div></div>}
          {step === 3 && <div></div>}
        </FormNav>
      </div>
    </div>
  );
};
