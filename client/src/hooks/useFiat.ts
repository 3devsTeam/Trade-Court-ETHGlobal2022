import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { FiatServices } from "../api/fiat.services";
import { IFiat, IRegion } from "../models/models";
import { useActions } from "./useActions";
import { useTypedSelector } from "./useTypedSelector";

export const useFiat = () => {
  const { fiat } = useTypedSelector((state) => state.offerReducer);

  const { setFiat, setBank, setRegion } = useActions();

  const { data: allFiat, isSuccess } = useQuery(
    ["get fiat"],
    () => FiatServices.getFiat(),
    {
      select: (data) => data.data.allFiat,
      onSuccess: (data) => setFiat(data[0]),
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      setBank(allFiat?.filter((e: IFiat) => e._id === fiat._id)[0].banks[0]);
      setRegion(
        allFiat?.filter((e: IRegion) => e._id === fiat._id)[0].regions[0]
      );
    }
  }, [fiat]);

  return { allFiat, isSuccess };
};
