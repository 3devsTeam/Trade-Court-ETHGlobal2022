import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Offer } from "../components/home/Offer";
import { Header } from "../components/home/Header";
import { useQuery } from "@tanstack/react-query";
import { OfferService } from "../api/offer.services";
import { IBank, IOffer, IToken } from "../models/models";
import { SkeletonWrapper } from "../components/ui/SkeletonWrapper";
import { SearchField } from "../components/ui/SearchField";
import { Dropdown, Item } from "../components/home/Dropdown";
import { useFetchFilters } from "../hooks/useFetchFilters";
import { useInfiniteQuery } from "wagmi";
import { useInView } from "react-intersection-observer";

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // const {
  //   data: offers,
  //   isSuccess,
  //   isLoading,
  //   isError,
  // } = useQuery(["get offers"], () => OfferService.getAll(), {
  //   select: (data) => data.data.data.offers,
  //   refetchInterval: 5000,
  // });

  const { ref, inView } = useInView();

  const {
    data: offers,
    isError,
    isLoading,
    isSuccess,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ["offers"],
    async ({ pageParam = 0 }) => OfferService.getAllWithPagination(pageParam),
    {
      getPreviousPageParam: (firstPage) => firstPage.data.nextId ?? undefined,
      getNextPageParam: (lastPage) => lastPage.data.previousId ?? undefined,
    }
  );

  useEffect(() => {
    if (inView) {
      console.log("fetch new page");
      fetchNextPage();
    }
  }, [inView]);

  // console.log(offers);

  const { banks, crypto, isFetchFiltersOk } = useFetchFilters();

  // if (isFetchFiltersOk) {
  //   console.log(banks.data);
  //   console.log(crypto.data);
  // }

  const headers = [
    "Maker Address",
    "Avaliable / Limit",
    "Unit Price",
    "Payment Methods",
    "Buy / Sell",
  ];

  return (
    <div className='grid grid-cols-homePage gap-5 my-5'>
      <aside className='flex flex-col gap-5 sticky top-5 overflow-auto h-screen pr-5'>
        <SearchField
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder='Search...'
        />
        <Dropdown data={crypto.data} activeSelect='Crypto' />
        <Dropdown data={[]} activeSelect='Fiat' />
        <Dropdown data={banks.data} activeSelect='Bank' />
        <Dropdown data={[]} activeSelect='Region' />
        <Dropdown data={[]} activeSelect='Rating' />
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
          {offers?.pages.map((page) => (
            <div key={page.nextId}>
              {page.data.offers.map((offer: IOffer) => (
                <Offer key={offer._id} {...offer} />
              ))}
            </div>
          ))}

          <button ref={ref} onClick={() => fetchNextPage()}>
            <span>
              {isFetchingNextPage
                ? "fetching new data"
                : hasNextPage
                ? "new page"
                : "nothing to fetch"}
            </span>
          </button>
        </SkeletonWrapper>
      </main>
    </div>
  );
};
