import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Offer } from "../components/home/Offer";
import { Header } from "../components/home/Header";
import { useQuery } from "@tanstack/react-query";
import { OfferService } from "../services/offer.services";
import { IOffer } from "../models/models";
import io from "socket.io-client";

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

  // const socket = io("http://127.0.0.1:3030");

  // socket.on("msg", (data) => {
  //   console.log(data);
  // });

  return (
    <>
      <Header />

      <section>
        {isLoading ? (
          <p>loading</p>
        ) : isError ? (
          <p>error</p>
        ) : offers?.length === 0 ? (
          <p>no offers</p>
        ) : isSuccess ? (
          offers?.map((offer: IOffer) => <Offer key={offer._id} {...offer} />)
        ) : null}
      </section>
    </>
  );
};
