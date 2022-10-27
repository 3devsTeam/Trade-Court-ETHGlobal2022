import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Badge } from "../components/profile/Badge";
import { Schedule } from "../components/profile/Schedule";
import { OfferService } from "../api/offer.services";
import { IOffer } from "../models/models";
import { off } from "process";
import { ProfileOffer } from "../components/profile/ProfileOffer";
import { useAccount, useEnsName, useEnsAvatar } from "wagmi";
import { Header } from "../components/home/Header";

export const Profile = () => {
  const { address } = useAccount();

  const {
    data: ensName,
    isLoading: ensNameLoading,
    isSuccess: ensNameSuccess,
  } = useEnsName({
    address,
  });

  const {
    data: ensAvatar,
    isLoading: ensAvatarLoading,
    isSuccess: ensAvatarSuccess,
  } = useEnsAvatar({
    addressOrName: address,
  });

  if (ensAvatarSuccess && ensNameSuccess) {
    console.log(ensName, ensAvatar);
  }

  const { data, isSuccess, isLoading, isError } = useQuery(
    ["get user offers"],
    () => OfferService.getUserOffers(),
    {
      select: (data) => data.data.user,
      // refetchInterval: 5000,
    }
  );

  const sections = [
    "ID",
    "Type",
    "Pair",
    "Unit Price",
    "Avalaible/Limit",
    "Pay Methods",
  ];

  return (
    <>
      <div className={"grid grid-cols-profileOffer mt-[20px] px-6"}>
        <Header headers={sections} />
      </div>

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
      </section>
    </>
  );
};
