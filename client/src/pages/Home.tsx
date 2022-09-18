import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Offer } from "../components/home/Offer";
import { Header } from "../components/home/Header";
import { useQuery } from "@tanstack/react-query";
import { OfferService } from "../services/offer.services";

export const Home = () => {
  const {
    data: offers,
    isSuccess,
    isLoading,
    isError,
  } = useQuery(["get offers"], () => OfferService.getAll(), {
    select: (data) => data.data.data.offers,
  });

  return (
    <>
      <Header />

      <div>
        {isLoading ? (
          <p>loading</p>
        ) : isError ? (
          <p>error</p>
        ) : offers?.length === 0 ? (
          <p>no offers</p>
        ) : isSuccess ? (
          offers?.map((o: any) => <Offer offer={o} />)
        ) : null}
      </div>
    </>
  );
};
