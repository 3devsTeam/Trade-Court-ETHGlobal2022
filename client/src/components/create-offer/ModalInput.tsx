import React from "react";

interface IModalInput {
  image: string;
  onOpen: any;
  label: string;
  value: string;
}

export const ModalInput = ({ onOpen, label, value, image }: IModalInput) => {
  const onOpenHandler: React.MouseEventHandler = (e) => {
    e.preventDefault();
    onOpen();
  };

  return (
    <div>
      <p className={"text-lg font-bold mb-1 ml-[10px]"}>{label}</p>
      <button
        onClick={(e) => onOpenHandler(e)}
        className="flex items-center border-2 border-purple rounded-[15px] h-[60px] shadow-lg px-[10px] w-full"
      >
        <div className={"flex items-center gap-2"}>
          <img className={"w-7 h-7"} src={image} alt={"tokenImg"} />
          <span className={"font-bold"}>{value}</span>
        </div>
      </button>
    </div>
  );
};
