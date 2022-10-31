import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { OfferService } from "../api/offer.services";
import { IOffer } from "../models/models";
import { off } from "process";
import { ProfileOffer } from "../components/profile/ProfileOffer";
import { useAccount, useEnsName, useEnsAvatar } from "wagmi";
import { Legend } from "../components/home/Legend";

const Profile = () => {
  const { data, isSuccess, isLoading, isError } = useQuery(
    ["get user offers"],
    () => OfferService.getUserOffers(),
    {
      select: (data) => data.data.user,
    }
  );

  console.log(data);

  const fields = [
    "ID",
    "Type",
    "Pair",
    "Unit Price",
    "Avalaible/Limit",
    "Pay Methods",
  ];

  return (
    <>
      {/* <Legend fields={fields} />

      <section className={"flex flex-col gap-5 mt-[20px]"}>
        {isLoading ? (
          <p>loading</p>
        ) : isError ? (
          <p>error</p>
        ) : data?.length === 0 ? (
          <p>no offers</p>
        ) : isSuccess ? (
          data?.map((offer: IOffer) => {
            return <ProfileOffer key={offer._id} {...offer} />;
          })
        ) : null}
      </section> */}
    </>
  );
};

export default Profile;
