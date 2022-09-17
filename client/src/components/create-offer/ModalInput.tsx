import React from "react";
// import defaultImg from "../../assets/defaultImg.svg";

interface IModalInput {
  image: string;
  onOpen: any;
  label: string;
  value: string;
}

export const ModalInput = ({ onOpen, label, value, image }: IModalInput) => {
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
          <img className={"w-8 h-8"} src={image} alt={""} />
          <span className={"font-bold"}>{value}</span>
        </div>
      </button>
    </div>
  );
};
