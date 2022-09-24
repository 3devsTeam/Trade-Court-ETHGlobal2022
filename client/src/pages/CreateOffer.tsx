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
import { Button } from "../components/create-offer/Button";
import { multiply } from "../utils/multiply";
import { toast } from "react-toastify";
import { useEthContractWithValue } from "../hooks/useEthContractWithValue";
import { BigNumber, ethers } from "ethers";
import { randomNumber } from "../utils/randomNumber";
import { convertToSeconds } from "../utils/convertToSeconds";
import React, { useEffect, useState } from "react";
import { useScrollTop } from "../hooks/useScrollTop";
import { useTokens } from "../hooks/useTokens";
import { useQuery } from "wagmi";
import { SkeletonWrapper } from "../components/SkeletonWrapper";
import { is } from "immer/dist/internal";
import { IFiat } from "../models/models";

export const CreateOffer = () => {
  const {
    crypto,
    fiat,
    unitPrice,
    quantity,
    orderLimit,
    offerComment,
    payMethods,
    timeLimit,
  } = useTypedSelector((state) => state.offerReducer);

  const {
    setFiat,
    setPaymentMethod,
    setRegion,
    setCrypto,
    nextStep,
    prevStep,
  } = useActions();

  const { tokens, isSuccessRequest } = useTokens();

  const { data: allFiat, isSuccess: fiatSuccess } = useQuery(
    ["get fiat"],
    () => OfferService.getFiat(),
    {
      select: (data) => data.data.data.allFiat,
      onSuccess: (data) => setFiat(data[0]),
    }
  );

  const isLoaded = isSuccessRequest && fiatSuccess;

  useEffect(() => {
    if (isLoaded) {
      setCrypto(tokens[0]);
      setPaymentMethod(allFiat[0].banks[0]);
      setRegion(allFiat[0].regions[0]);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      console.log("fiat changed");
      console.log(allFiat);

      setPaymentMethod(
        allFiat.filter((e: IFiat) => e._id === fiat._id)[0].banks[0]
      );
      setRegion(allFiat.filter((e: IFiat) => e._id === fiat._id)[0].regions[0]);
    }
  }, [fiat]);

  const limitPrice = (value: any, unitPrice: any) => {
    if (!BigNumber.from(value).eq(BigNumber.from(0))) {
      return ethers.utils
        .parseEther(value.toString())
        .div(BigNumber.from(unitPrice));
    } else {
      return ethers.utils.parseEther("0");
    }
  };

  const [roomId, setRoomId] = useState(0);

  useEffect(() => {
    setRoomId(randomNumber(1, 10000));
  }, []);

  const args = [
    roomId, // рандомная комната
    convertToSeconds(timeLimit), // время апрува
    convertToSeconds(timeLimit), // время апрува
    limitPrice(orderLimit[1], unitPrice), // фиатный максимальный лимит
    limitPrice(orderLimit[0], unitPrice), // фиатный минимальный лимит
  ];

  const value = ethers.utils.parseEther(quantity.toString());

  const { data, isError, isLoading, isSuccess, writeAsync, hash } =
    useEthContractWithValue(args, value, "makeRoomEth");

  const { step } = useTypedSelector((state) => state.formReducer);

  const navigate = useNavigate();

  const arr = payMethods.map((e) => {
    return {
      bank: e.paymentMethod._id,
      cardNumber: e.cardNumber,
      region: e.region._id,
      paymentDescription: e.paymentDescription,
    };
  });

  const successOfferNotify = (info: React.ReactNode) => {
    toast.success(info, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const errorOfferNotify = (message: string) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const createHandler = async () => {
    writeAsync?.()
      .then(() => {
        OfferService.create({
          roomId,
          offerType: "buy",
          fiat: fiat._id,
          unitPrice,
          amount: multiply(unitPrice, quantity),
          quantity,
          orderLimit,
          crypto: crypto._id,
          offerComment,
          payMethods: arr,
        })
          .then(
            (data) => {
              console.log(data);
              console.log("tx hash:", hash?.transactionHash);
              successOfferNotify(
                <div>
                  <p>Offer is created!</p>
                  <a
                    target={"_blank"}
                    className={"text-purple"}
                    href={`https://rinkeby.etherscan.io/tx/${hash?.transactionHash}`}
                  >
                    View your transaction on Etherscan
                  </a>
                </div>
              );
              navigate("/");
            }

            //resetOffer();
          )
          .catch((data) => errorOfferNotify(data.response.data.message));
      })
      .catch((err) => console.log(err));
  };

  const steps = ["Offer Price", "Payment method", "Settings"];

  return (
    <div>
      <SkeletonWrapper isLoaded={isLoaded} height={100}>
        <Progressbar steps={steps} step={step} />
      </SkeletonWrapper>

      <div className={"grid grid-cols-2 gap-5 mt-[20px]"}>
        <div>
          <SkeletonWrapper isLoaded={isLoaded} height={600}>
            {step === 1 && <Step1 tokens={tokens} allFiat={allFiat} />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 />}
          </SkeletonWrapper>
        </div>

        <SkeletonWrapper isLoaded={isLoaded} height={600}>
          <Preview />
        </SkeletonWrapper>

        <SkeletonWrapper isLoaded={isLoaded} height={100}>
          <div className="flex justify-between items-center p-5 bg-white rounded-[20px] shadow-customDark h-[100px]">
            <div className={"flex items-center gap-3"}>
              {step > 1 && (
                <Button
                  onAction={prevStep}
                  name={"Back"}
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
                name={
                  step === 3
                    ? "Create offer"
                    : isLoading
                    ? "Make Room ERC20"
                    : "Next"
                }
                color={"purple"}
                rounded={"20px"}
                fWeight={"bold"}
                fSize={"lg"}
                tColor={"white"}
              />
            </div>

            <div>
              <Button
                onAction={null}
                name={"Help"}
                fWeight={"bold"}
                fSize={"lg"}
                tColor={"purple"}
              />
            </div>
          </div>
        </SkeletonWrapper>
      </div>
    </div>
  );
};
