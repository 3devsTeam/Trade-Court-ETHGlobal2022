import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Offer } from "../components/home/Offer";
import { Header } from "../components/home/Header";
import { useQuery } from "@tanstack/react-query";
import { OfferService } from "../services/offer.services";
import { IOffer } from "../models/models";
import { SkeletonWrapper } from "../components/SkeletonWrapper";
import { SearchField } from "../components/modal/SearchField";
import { Dropdown } from "../components/home/Dropdown";

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: offers,
    isSuccess,
    isLoading,
    isError,
  } = useQuery(["get offers"], () => OfferService.getAll(), {
    select: (data) => data.data.data.offers,
    refetchInterval: 5000,
  });

  const headers = [
    "Maker address",
    "Avaliable / Limit",
    "Unit Price",
    "Payment methods",
    "Buy / Sell",
  ];

  return (
    <div className='grid grid-cols-homePage gap-5'>
      <aside className='bg-white shadow-customDark p-5 rounded-[20px] flex flex-col gap-5'>
        <SearchField
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder='Search...'
        />
        <Dropdown activeSelect='Crypto'>
          <div>tokens</div>
        </Dropdown>
        <Dropdown activeSelect='Fiat'>
          <div>fiat</div>
        </Dropdown>
        <Dropdown activeSelect='Bank'>
          <div>banks</div>
        </Dropdown>
        <Dropdown activeSelect='Region'>
          <div>Regions</div>
        </Dropdown>
        <Dropdown activeSelect='Rating'>
          <div>ratings</div>
        </Dropdown>
      </aside>

      <main>
        <SkeletonWrapper height={30} isLoaded={!isLoading} margin={"20px"}>
          <div className='grid grid-cols-offer gap-5 px-[20px] mb-[20px]'>
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
              offers?.map((offer: IOffer) => (
                <Offer key={offer._id} {...offer} />
              ))
            ) : null}
          </section>
        </SkeletonWrapper>
      </main>
    </div>
  );
};
