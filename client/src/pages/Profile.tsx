import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Badge } from "../components/profile/Badge";
import { Schedule } from "../components/profile/Schedule";
import { OfferService } from "../services/offer.services";

export const Profile = () => {
  const { data, isSuccess } = useQuery(
    ["get user offers"],
    () => OfferService.getUserOffers(),
    {}
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

      <div></div>
    </div>
  );
};
