import React, { useEffect, useRef, useState } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Input } from "../Input";
import { Dropdown } from "../Dropdown";
import { useActions } from "../../../hooks/useActions";
import { ModalInput } from "../ModalInput";
import { Modal } from "../../modal/Modal";
import { SearchField } from "../../modal/SearchField";
import { TokenList } from "../../modal/TokenList";
import { useTokens } from "../../../hooks/useTokens";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { OfferService } from "../../../services/offer.services";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { IFiat } from "../../../models/models";

export const Step1 = () => {
  const [allFiat, setAllFiat] = useState([]);
  const [tickers, setTickers] = useState([]);
  const { setCrypto, setFiat, setQuantity, setUnitPrice } = useActions();
  const { tokens, isSuccessRequest } = useTokens();

  const { isSuccess } = useQuery(["get fiat"], () => OfferService.getFiat(), {
    select: (data) => data.data.data.allFiat,
    onSuccess: (data) => {
      setAllFiat(data);
    },
  });

  const { crypto, fiat, quantity, unitPrice } = useTypedSelector(
    (state) => state.offerReducer
  );

  const { symbol, logoUrl: cryptoImage } = crypto[0];

  const { ticker, logoUrl: fiatImage } = fiat[0];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <form
      //  onSubmit={handleSubmit(onSubmit)}
      className={"flex flex-col gap-5"}
    >
      {!isSuccessRequest ? (
        // && (symbol && logoUrl) !== ""
        <Skeleton count={10} height={45} />
      ) : (
        <>
          <ModalInput
            image={cryptoImage}
            onOpen={() => setIsOpen(!isOpen)}
            label={"Crypto"}
            value={symbol}
          />
          <Dropdown
            image={fiatImage}
            value={ticker}
            onAction={setFiat}
            data={allFiat}
            label={"Fiat"}
          />
          <Input
            type={"number"}
            onAction={setUnitPrice}
            placeholder={"Enter unit price"}
            label={"Unit Price"}
            element={ticker}
            value={unitPrice}
          />
          <Input
            type={"number"}
            onAction={setQuantity}
            placeholder={"Enter quantity"}
            label={"Quantity"}
            element={ticker}
            value={quantity}
          />
        </>
      )}

      <Modal
        width={"567px"}
        isOpen={isOpen}
        close={() => setIsOpen(false)}
        header={"Select Token"}
      >
        <SearchField
          placeholder={"Enter token name or paste it address"}
          onAction={null}
          value={""}
        />
        <TokenList tokens={tokens} onClose={() => setIsOpen(false)} />
      </Modal>
    </form>
  );
};
