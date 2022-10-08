import { Form } from "../components/create-offer/Form";
import { Preview } from "../components/create-offer/Preview";
import { Progressbar } from "../components/create-offer/Progressbar";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Step1 } from "../components/create-offer/form-pages/Step1";
import { Step2 } from "../components/create-offer/form-pages/Step2";
import { Step3 } from "../components/create-offer/form-pages/Step3";
import { useActions } from "../hooks/useActions";
import { useNavigate } from "react-router-dom";
import { OfferService } from "../api/offer.services";
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
import { SkeletonWrapper } from "../components/ui/SkeletonWrapper";
import { IFiat } from "../models/models";
import { ErrorBoundary } from "react-error-boundary";

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

  console.log(isSuccessRequest, fiatSuccess);

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

  const value = ethers.utils.parseEther(
    quantity === "" ? "0" : quantity.toString()
  );

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
          amount: multiply(unitPrice, +quantity),
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

  const pageDisplay = () => {
    switch (step) {
      case 1:
        return <Step1 tokens={tokens} allFiat={allFiat} />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      default:
        return;
    }
  };

  return (
    <div className='p-5'>
      <SkeletonWrapper isLoaded={isLoaded} height={100}>
        <Progressbar steps={steps} step={step} />
      </SkeletonWrapper>

      <div className={"grid grid-cols-2 gap-5 mt-5"}>
        <div className='flex flex-col justify-between'>
          <SkeletonWrapper isLoaded={isLoaded} height={600}>
            {pageDisplay()}
          </SkeletonWrapper>
        </div>

        <div>
          <SkeletonWrapper isLoaded={isLoaded} height={600}>
            <Preview />
          </SkeletonWrapper>
        </div>
      </div>
    </div>
  );
};
