import React from "react";

interface IGram {
  color: string;
}

export const Gram = ({ color }: IGram) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.42 0.245268C28.9746 -0.056841 28.3988 -0.082505 27.9279 0.182983L0.710867 15.6504C0.245403 15.9199 -0.0295416 16.4238 0.00252948 16.957C0.0346064 17.4917 0.368168 17.9625 0.862372 18.1693L9.85376 21.9416V28.592C9.85376 29.1065 10.1351 29.5787 10.5869 29.826C10.7979 29.9414 11.0266 30 11.2085 30C11.4733 30 11.7385 29.9249 11.9703 29.7766L18.4925 25.5895L24.2732 28.0153C24.4483 28.0886 24.6334 28.1252 24.8185 28.1252C25.0577 28.1252 25.296 28.0648 25.5095 27.9439C25.8879 27.7315 26.1476 27.3544 26.2104 26.9255L29.9641 1.61302C30.0945 1.08046 29.8599 0.549194 29.42 0.245268ZM21.6603 6.98437L10.6864 19.2246L4.58837 16.6816L21.6603 6.98437ZM12.6161 26.0156V23.1234L15.3405 24.2666L12.6161 26.0156ZM23.7424 24.7207L13.3844 20.3736L26.5577 5.75449L23.7424 24.7207Z"
        className={`active:fill-${color} active:scale-105 transition-all duration-500`}
        fill="#C6C6C6"
      />
    </svg>
  );
};
