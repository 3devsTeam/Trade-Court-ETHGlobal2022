import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Badge } from "../components/profile/Badge";
import { Schedule } from "../components/profile/Schedule";
import { OfferService } from "../services/offer.services";
import { IOffer } from "../models/models";
import { off } from "process";
import { ProfileOffer } from "../components/profile/ProfileOffer";

export const Profile = () => {
  const { data, isSuccess, isLoading, isError } = useQuery(
    ["get user offers"],
    () => OfferService.getUserOffers(),
    {
      select: (data) => data.data.user,
    }
  );

  if (isSuccess) {
    console.log(data);
  }

  return (
    <div>
      <div className={"grid grid-cols-profile gap-5"}>
        <Badge />
        <Schedule />
      </div>
      <div className={"flex flex-col gap-5 mt-[20px]"}>
        {isLoading ? (
          <p>loading</p>
        ) : isError ? (
          <p>error</p>
        ) : data?.length === 0 ? (
          <p>no offers</p>
        ) : isSuccess ? (
          data?.map((offer: IOffer, i: number) => (
            <ProfileOffer key={offer._id} {...offer} />
          ))
        ) : null}
      </div>
    </div>
  );
};
