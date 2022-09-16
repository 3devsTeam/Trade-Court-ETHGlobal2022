import React, { useState, useRef } from "react";
import useOnClickOutside from "use-onclickoutside";
import { Arrow } from "../Arrow";

interface IDropdown {
  value: string;
  onAction: any;
  register?: any;
  label?: string;
  data: any;
  image: string;
}

export const Dropdown = ({
  value,
  onAction,
  label,
  data,
  image,
}: IDropdown) => {
  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsOpen(false));
  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = (select: any) => {
    onAction(select);
    setIsOpen(false);
  };

  return (
    <div className={"w-full relative"} ref={ref}>
      <label>
        <p className={"text-lg font-bold mb-1 ml-[10px]"}>{label}</p>
        <div>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={
              "p-[10px] flex items-center justify-between h-[60px] rounded-[15px] border-2 border-purple cursor-pointer"
            }
          >
            <div className={"flex items-center gap-1"}>
              <img className={"w-7 h-7"} src={image} alt={""} />
              <span className={"font-bold"}>{value}</span>
            </div>
            <div
              className={`transition duration-300 ${isOpen && "rotate-180"}`}
            >
              <Arrow />
            </div>
          </div>
          {isOpen && (
            <div
              className={
                "bg-white rounded-[10px] border-2 border-purple absolute w-full"
              }
            >
              {data.map((select: string, i: number) => {
                const { ticker, logoUrl, name }: any = select;

                return (
                  <div
                    onClick={() => clickHandler([data[i]])}
                    key={i}
                    className={"p-2 cursor-pointer flex items-center gap-1"}
                  >
                    <img width={32} height={32} src={logoUrl} alt="" />
                    <span>{ticker || name}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </label>
    </div>
  );
};
