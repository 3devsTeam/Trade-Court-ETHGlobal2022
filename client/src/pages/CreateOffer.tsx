import React from "react";
import { Form } from "../components/create-offer/Form";
import { FormNav } from "../components/create-offer/FormNav";
import { Preview } from "../components/create-offer/Preview";

export const CreateOffer = () => {
  return (
    <>
      <div className={"grid grid-cols-2 gap-5"}>
        <Form />
        <Preview />
        <FormNav />
      </div>
    </>
  );
};
