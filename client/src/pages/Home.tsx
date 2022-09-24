import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Offer } from "../components/home/Offer";
import { Header } from "../components/home/Header";
import { useQuery } from "@tanstack/react-query";
import { OfferService } from "../services/offer.services";
import { IOffer } from "../models/models";
import { SkeletonWrapper } from "../components/SkeletonWrapper";

export const Home = () => {
  const {
    data: offers,
    isSuccess,
    isLoading,
    isError,
  } = useQuery(["get offers"], () => OfferService.getAll(), {
    select: (data) => data.data.data.offers,
    //refetchInterval: 5000
  });

  const headers = [
    "Maker address",
    "Avaliable / Limit",
    "Unit Price",
    "Payment methods",
    "Buy / Sell",
  ];

  return (
    <>
      <SkeletonWrapper height={30} isLoaded={!isLoading} margin={"20px"}>
        <div className="grid grid-cols-offer gap-5 px-[20px] mb-[20px]">
          <Header headers={headers} />
        </div>
      </SkeletonWrapper>

      <SkeletonWrapper
        isLoaded={!isLoading}
        height={100}
        count={10}
        margin={"20px"}
      >
        <section>
          {isError ? (
            <p>error</p>
          ) : offers?.length === 0 ? (
            <p>no offers</p>
          ) : isSuccess ? (
            offers?.map((offer: IOffer) => <Offer key={offer._id} {...offer} />)
          ) : null}
        </section>
      </SkeletonWrapper>
    </>
  );
};
