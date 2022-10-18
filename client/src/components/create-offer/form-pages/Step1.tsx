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

interface FormStep1 {
  tokenAmount: string;
  unitPrice: string;
  quantity: string;
}

export const Step1 = ({ tokens, allFiat }: IStep1) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormStep1>();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  const { setCrypto, setFiat, setQuantity, setUnitPrice, nextStep } =
    useActions();
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
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
      <Wrapper>
        <ModalInput
          register={register("tokenAmount")}
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
          register={register("unitPrice")}
          onAction={setUnitPrice}
          placeholder={"0"}
          label={"Unit Price"}
          element={ticker}
          value={unitPrice}
        />

        <Input
          register={register("quantity")}
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
        <Button name='Next' onClick={nextStep} />
        <SubmitButton name='Next' disabled={false} />
      </Wrapper>
    </form>
  );
};
