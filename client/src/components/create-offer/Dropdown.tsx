import React, { useState, useRef } from "react";
import useOnClickOutside from "use-onclickoutside";
import { Arrow } from "../Arrow";

interface IDropdown {
  value: string;
  onAction: any;
  register?: any;
  label?: string;
  data: string[] | number[];
}

export const Dropdown = ({ value, onAction, label, data }: IDropdown) => {
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
            <div>
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
              {data.map((select, i) => {
                return (
                  <div
                    onClick={() => clickHandler(select)}
                    key={i}
                    className={"p-2 cursor-pointer"}
                  >
                    {select}
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
