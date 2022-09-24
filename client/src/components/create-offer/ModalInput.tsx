import React from "react";
// import defaultImg from "../../assets/defaultImg.svg";

interface IModalInput {
  fullName: string;
  image: string;
  onOpen: any;
  label: string;
  symbol: string;
}

export const ModalInput = ({
  onOpen,
  label,
  symbol,
  image,
  fullName,
}: IModalInput) => {
  const onOpenHandler: React.MouseEventHandler = (e) => {
    console.log("open tokens modal");
    e.preventDefault();
    onOpen();
  };

  return (
    <div>
      <p className={"text-lg font-bold mb-1 ml-[10px]"}>{label}</p>
      <button
        onClick={(e) => onOpenHandler(e)}
        className="flex items-center border-2 border-purple rounded-[15px] h-[60px] px-[10px] w-full"
      >
        <div className={"flex items-center gap-1"}>
          <img
            className={
              "w-8 h-8 rounded-[50%] border border-purple object-cover"
            }
            src={image}
            alt={""}
          />
          <span className={"font-bold"}>{symbol}</span>
          <span className={"text-gray font-bold"}>{fullName}</span>
        </div>
      </button>
    </div>
  );
};
