import React from "react";

interface Props {
  label: string;
}

export const Filter = ({ label }: Props) => {
  return <div>{label}</div>;
};
