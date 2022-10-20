import React, { useEffect, useRef, useState } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Input } from "../Input";
import { Dropdown } from "../Dropdown";
import { useActions } from "../../../hooks/useActions";
import { ModalInput } from "../ModalInput";
import { Modal } from "../../ui/Modal";
import { SearchField } from "../../ui/SearchField";
import { TokenList } from "../TokenList";
import "react-loading-skeleton/dist/skeleton.css";
import { Wrapper } from "../Wrapper";
import { IFiat, IToken } from "../../../models/models";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../../ui/Button";
import { SubmitButton } from "../../ui/SubmitButton";

interface IStep1 {
  tokens: [IToken];
  allFiat: [IFiat];
}

export const Step1 = ({ tokens, allFiat }: IStep1) => {
  const { setFiat, setQuantity, setUnitPrice, nextStep } = useActions();
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

  const checkStep1 = () => {
    if (quantity > 0 && quantity <= tokenAmount && unitPrice > 0) return true;

    return false;
  };

  return (
    <form className='flex flex-col gap-5'>
      <Wrapper>
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
          onAction={setUnitPrice}
          placeholder={"0"}
          label={"Unit Price"}
          element={ticker}
          value={unitPrice}
        />

        <Input
          maxValue={tokenAmount}
          onAction={setQuantity}
          placeholder={"0"}
          label={"Quantity"}
          element={symbol}
          value={quantity}
        />

        <Modal
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
      </Wrapper>

      <Wrapper>
        <Button
          name='Next'
          onClick={nextStep}
          disabled={
            // !checkStep1()
            false
          }
        />
      </Wrapper>
    </form>
  );
};
