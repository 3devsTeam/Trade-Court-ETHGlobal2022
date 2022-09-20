import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { OfferService } from "../services/offer.services";

export const Transaction = () => {
  let { transaction } = useParams();
  console.log(transaction);

  const {} = useQuery(["get offer by id", () => OfferService.getByID("")]);

  return <div>Transaction</div>;
};
