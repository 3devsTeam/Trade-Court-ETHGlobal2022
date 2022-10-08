import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Offer } from "../components/home/Offer";
import { Header } from "../components/home/Header";
import { useQuery } from "@tanstack/react-query";
import { OfferService } from "../api/offer.services";
import { IBank, IOffer } from "../models/models";
import { SkeletonWrapper } from "../components/ui/SkeletonWrapper";
import { SearchField } from "../components/ui/SearchField";
import { Dropdown } from "../components/home/Dropdown";
import { useFetchFilters } from "../hooks/useFetchFilters";

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

  const { banks, isFetchFiltersOk } = useFetchFilters();

  if (isFetchFiltersOk) {
    console.log(banks.data);
  }

  const headers = [
    "Maker Address",
    "Avaliable / Limit",
    "Unit Price",
    "Payment Methods",
    "Buy / Sell",
  ];

  return (
    <div className='grid grid-cols-homePage gap-5 mt-5'>
      <aside className='flex flex-col gap-5 sticky top-5 overflow-auto h-screen'>
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
          {banks.data?.map((b: IBank) => (
            <div key={b._id} className='p-3 flex justify-start'>
              {b.name}
            </div>
          ))}
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
          <Header headers={headers} />
        </SkeletonWrapper>

        <SkeletonWrapper
          isLoaded={!isLoading}
          height={100}
          count={10}
          margin={"20px"}
        >
          <section className='space-y-3'>
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
