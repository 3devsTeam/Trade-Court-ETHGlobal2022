import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { OfferService } from "../services/offer.services";

export const Transaction = () => {
  const { id } = useParams();

  const { data, isSuccess } = useQuery(
    ["get offer by id"],
    () => OfferService.getByID(id!),
    {
      onSuccess: (data) => console.log(data),
    }
  );

  return <div>{id}</div>;
};
