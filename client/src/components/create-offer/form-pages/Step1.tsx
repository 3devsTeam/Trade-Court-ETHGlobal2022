import React, { useEffect, useRef, useState } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Input } from "../Input";
import { Dropdown } from "../Dropdown";
import { useActions } from "../../../hooks/useActions";
import { ModalInput } from "../ModalInput";
import { Modal } from "../../modal/Modal";
import { SearchField } from "../../modal/SearchField";
import { TokenList } from "../../modal/TokenList";
import "react-loading-skeleton/dist/skeleton.css";
import { FormWrapper } from "../FormWrapper";
import { IToken } from "../../../models/models";

interface IStep1 {
  tokens: any;
  allFiat: any;
}

export const Step1 = ({ tokens, allFiat }: IStep1) => {
  const { setCrypto, setFiat, setQuantity, setUnitPrice } = useActions();
  const { crypto, fiat, quantity, unitPrice } = useTypedSelector(
    (state) => state.offerReducer
  );

  const { tokenAmount } = crypto;

  const { symbol, logoUrl: cryptoImage, name: cryptoName } = crypto;

  const { ticker, logoUrl: fiatImage, name: fiatName } = fiat;

  const [isOpen, setIsOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const searchFilter = (tokens: IToken[]) => {
    return tokens.filter(
      (t: IToken) =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.address.toLowerCase() === searchTerm.toLowerCase() ||
        t.symbol.toLowerCase() === searchTerm.toLowerCase()
    );
  };

  return (
    <FormWrapper>
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
      <Modal
        width={"567px"}
        isOpen={isOpen}
        close={() => setIsOpen(false)}
        header={"Select Token"}
      >
        <SearchField
          placeholder={"Enter token name or paste it address"}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
        />
        <TokenList
          tokens={searchFilter(tokens)}
          onClose={() => setIsOpen(false)}
        />
      </Modal>
    </FormWrapper>
  );
};
