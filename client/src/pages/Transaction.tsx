import { useQuery } from "@tanstack/react-query";
import React from "react";
import { OfferService } from "../services/offer.services";

export const Transaction = () => {
  const {} = useQuery(["get offer by id", () => OfferService.getByID("")]);

  return <div>Transaction</div>;
};
