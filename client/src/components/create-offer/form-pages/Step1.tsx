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
import { IToken } from "../../../models/models";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../../ui/Button";
import { SubmitButton } from "../../ui/SubmitButton";

interface IStep1 {
  tokens: any;
  allFiat: any;
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
    watch,
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
          register={register(
            "tokenAmount"
            // , {
            //   required: true,
            // validate: {
            //   positive: (value) => parseFloat(value) > 0,
            // },
            // }
          )}
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
          register={register(
            "unitPrice"
            // {
            //   required: "Unit price is required",
            // pattern: {
            //   value: /^[0-9]*[.,]?[0-9]*$/,
            //   message: "Invalid unit price value",
            // },
            // validate: {
            //   positive: (value) => parseFloat(value) > 0,
            // },
            // }
          )}
          onAction={setUnitPrice}
          placeholder={"0"}
          label={"Unit Price"}
          element={ticker}
          value={unitPrice}
        />

        <Input
          register={register(
            "quantity"
            //  {
            //   required: "Quantity is required",
            // validate: {
            //   positive: (value) => parseFloat(value) > 0,
            // },
            // }
          )}
          maxValue={tokenAmount}
          onAction={setQuantity}
          placeholder={"0"}
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
      </Wrapper>

      <Wrapper>
        <SubmitButton name='Next' disabled={false} />
      </Wrapper>
    </form>
  );
};
