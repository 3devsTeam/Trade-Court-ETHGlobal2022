import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Offer } from "../components/home/Offer";
import { Header } from "../components/home/Header";
import { useQuery } from "@tanstack/react-query";
import { OfferService } from "../services/offer.services";
import { IOffer } from "../models/models";
import { SkeletonWrapper } from "../components/SkeletonWrapper";
import { Tumbler } from "../components/home/Tumbler";
import { SimpleDropdown } from "../components/home/SimpleDropdown";
import demoImg from "../assets/images/usdt.svg";
import { SearchBar } from "../components/home/SearchBar";
import reload from "../assets/reload.svg";
import { FilterDropdown } from "../components/home/FilterDropdown";
import { StarFilter } from "../components/home/StarFilter";

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
      <div className={"flex flex-col gap-5"}>
        <SkeletonWrapper isLoaded={!isLoading} height={50}>
          <div className={"grid grid-flow-col gap-2 h-[50px]"}>
            <SearchBar />
            <Tumbler names={["Buy", "Sell"]} activeButton={true} />
            <SimpleDropdown activeSelect={"USDT"} activeImage={demoImg} />
            <StarFilter />
            <SimpleDropdown activeSelect={"5s"} />
            <div
              className={
                "bg-white shadow-customDark rounded-[20px] h-full flex justify-center items-center p-[15px] cursor-pointer"
              }
            >
              <img height={32} width={32} src={reload} />
            </div>
          </div>
        </SkeletonWrapper>

        <SkeletonWrapper isLoaded={!isLoading} height={50} margin={"20px"}>
          <div className={"grid grid-flow-col gap-2 h-[50px] mb-[50px]"}>
            <FilterDropdown label={"Fiat"} activeSelect={"RUB"} />
            <FilterDropdown label={"Payment"} activeSelect={"Sberbank"} />
            <FilterDropdown label={"Region"} activeSelect={"Europe"} />
          </div>
        </SkeletonWrapper>
      </div>

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
