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
import { useQuery } from "@tanstack/react-query";
import { IFiat } from "../../../models/models";

export const Step1 = () => {
  const { setFiat, setQuantity, setUnitPrice } = useActions();
  const { tokens, isSuccessRequest } = useTokens();

  const { data: allFiat, isSuccess } = useQuery(
    ["get fiat"],
    () => OfferService.getFiat(),
    {
      select: (data) => data.data.data.allFiat,
    }
  );

  const { crypto, fiat, quantity, unitPrice } = useTypedSelector(
    (state) => state.offerReducer
  );

  const { tokenAmount } = crypto;

  const { symbol, logoUrl: cryptoImage, name: cryptoName } = crypto;

  const { ticker, logoUrl: fiatImage, name: fiatName } = fiat;

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
            symbol={symbol}
            fullName={cryptoName}
            image={cryptoImage}
            onOpen={() => setIsOpen(!isOpen)}
            label={"Crypto"}
          />
          <Dropdown
            value={ticker}
            fullName={fiatName}
            image={fiatImage}
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
            maxValue={tokenAmount}
            type={"number"}
            onAction={setQuantity}
            placeholder={"Enter quantity"}
            label={"Quantity"}
            element={symbol}
            value={quantity}
          />
        </>
      )}

      <Modal
        canClose={true}
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
