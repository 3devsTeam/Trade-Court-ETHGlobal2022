import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Offer } from "../components/home/Offer";
import { Header } from "../components/home/Header";
import { useQuery } from "@tanstack/react-query";
import { OfferService } from "../api/offer.services";
import {
  IBank,
  IFiat,
  IOffer,
  IPayment,
  IRegion,
  IToken,
} from "../models/models";
import { SkeletonWrapper } from "../components/ui/SkeletonWrapper";
import { SearchField } from "../components/ui/SearchField";
import { Dropdown } from "../components/home/Dropdown";
import { useFetchFilters } from "../hooks/useFetchFilters";
import { useInfiniteOffers } from "../hooks/useInfiniteOffers";
import { Button } from "../components/ui/Button";

export interface IActiveFilters {
  crypto: string | undefined;
  fiat: string | undefined;
  banks: string | undefined;
  region: string | undefined;
}

export const Home = () => {
  const initialFilters: IActiveFilters = {
    crypto: "",
    fiat: "",
    banks: "",
    region: "",
  };

  const [activeCrypto, setActiveCrypto] = useState<IToken | null>(null);
  const [activeFiat, setActiveFiat] = useState<IFiat | null>(null);
  const [activePayment, setActivePayment] = useState<IPayment | null>(null);
  const [activeRegion, setActiveRegion] = useState<IRegion | null>(null);
  const [activeFilters, setActiveFilters] =
    useState<IActiveFilters>(initialFilters);

  useEffect(() => {
    setActiveFilters({
      crypto: activeCrypto?._id || "",
      fiat: activeFiat?._id || "",
      banks: activePayment?._id || "",
      region: activeRegion?._id || "",
    });
  }, [activeCrypto, activeFiat, activePayment, activeRegion]);

  const { fiat, crypto, isFiltersFetchOk } = useFetchFilters();

  const { data, error, status, lastItemRef } = useInfiniteOffers(activeFilters);

  const isLoaded = isFiltersFetchOk && status === "success";

  const content = data?.pages.map((page) => {
    return page?.map((offer: IOffer, i: number) => {
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

  if (data?.pages[0].length == 0) console.log("ye");

  return (
    <div className='grid grid-cols-homePage gap-5 my-5'>
      <SkeletonWrapper isLoaded={isLoaded} height={1000}>
        <aside className='bg-white shadow-customDark p-5 rounded-2xl flex flex-col gap-5 sticky top-5 overflow-auto max-h-screen'>
          <SearchField
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder='Search...'
          />
          <Dropdown
            onSelect={setActiveCrypto}
            data={{
              items: crypto.data as [IToken],
              options: "symbol",
            }}
            label='Crypto'
            activeSelect={activeCrypto}
          />
          <Dropdown
            onSelect={setActiveFiat}
            data={{
              items: fiat.data as [IFiat],
              options: "ticker",
            }}
            label='Fiat'
            activeSelect={activeFiat}
          />
          {activeFiat && (
            <>
              <Dropdown
                onSelect={setActivePayment}
                data={{
                  items: activeFiat.banks as [IBank],
                  options: "name",
                }}
                activeSelect={activePayment}
                label='Payment'
              />
              <Dropdown
                onSelect={setActiveRegion}
                data={{
                  items: activeFiat.regions as [IRegion],
                  options: "name",
                }}
                activeSelect={activeRegion}
                label='Region'
              />
            </>
          )}
          <Button
            name={"Clear All"}
            onClick={() => {
              setActiveCrypto(null);
              setActiveFiat(null);
              setActivePayment(null);
              setActiveRegion(null);
            }}
          />
        </aside>
      </SkeletonWrapper>

      <main className='relative'>
        <SkeletonWrapper height={30} isLoaded={isLoaded} margin={"20px"}>
          <Header headers={headers} />
        </SkeletonWrapper>
        <SkeletonWrapper
          isLoaded={isLoaded}
          height={100}
          count={10}
          margin={"20px"}
        >
          {data?.pages[0].length === 0 ? (
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <span className='text-2xl font-bold'>No items found...</span>
            </div>
          ) : (
            <div className='space-y-2'>{content}</div>
          )}
        </SkeletonWrapper>
      </main>
    </div>
  );
};
