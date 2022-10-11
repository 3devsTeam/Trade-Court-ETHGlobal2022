import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Offer } from "../components/home/Offer";
import { Header } from "../components/home/Header";
import { useQuery } from "@tanstack/react-query";
import { OfferService } from "../api/offer.services";
import { IBank, IFiat, IOffer, IRegion, IToken } from "../models/models";
import { SkeletonWrapper } from "../components/ui/SkeletonWrapper";
import { SearchField } from "../components/ui/SearchField";
import { Dropdown, Item } from "../components/home/Dropdown";
import { useFetchFilters } from "../hooks/useFetchFilters";
import { useInfiniteOffers } from "../hooks/useInfiniteOffers";

export const Home = () => {
  const { fiat, crypto, isFiltersFetchOk } = useFetchFilters();

  const { data, error, status, lastItemRef, hasNextPage, isFetchingNextPage } =
    useInfiniteOffers(10);

  const isLoaded = isFiltersFetchOk && status === "success";

  const content = data?.pages.map((page) => {
    return page.map((offer: IOffer, i: number) => {
      if (page.length === i + 1) {
        return <Offer ref={lastItemRef} {...offer} key={offer._id} />;
      }
      return <Offer {...offer} key={offer._id} />;
    });
  });

  const [searchTerm, setSearchTerm] = useState("");

  const headers = [
    "Maker Address",
    "Avaliable / Limit",
    "Unit Price",
    "Payment Methods",
    "Buy / Sell",
  ];

  return (
    <div className='grid grid-cols-homePage gap-5 my-5'>
      <SkeletonWrapper isLoaded={isLoaded} height={1000}>
        <aside className='bg-white shadow-customDark p-5 rounded-2xl flex flex-col gap-5 sticky top-5 overflow-auto h-screen'>
          <SearchField
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder='Search...'
          />
          <Dropdown data={crypto.data} activeSelect='Crypto' />
          <Dropdown data={fiat.data} activeSelect='Fiat' />
          <Dropdown data={[]} activeSelect='Payment Method' />
          <Dropdown data={[]} activeSelect='Region' />
          <Dropdown data={[]} activeSelect='Rating' />
        </aside>
      </SkeletonWrapper>

      <main>
        <SkeletonWrapper height={30} isLoaded={isLoaded} margin={"20px"}>
          <Header headers={headers} />
        </SkeletonWrapper>
        <SkeletonWrapper
          isLoaded={isLoaded}
          height={100}
          count={10}
          margin={"20px"}
        >
          <div className='space-y-2'>{content}</div>

          {!(hasNextPage && isFetchingNextPage) && <h1>That's all for now!</h1>}
        </SkeletonWrapper>
      </main>
    </div>
  );
};
