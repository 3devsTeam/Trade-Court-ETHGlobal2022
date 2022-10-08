import React, { useState, useRef } from "react";
import useOnClickOutside from "use-onclickoutside";
import { Arrow } from "../../assets/icons/Arrow";

interface IDropdown {
  value: string | undefined;
  fullName?: string;
  onAction: any;
  label?: string;
  data: any;
  image: string | undefined;
}

export const Dropdown = ({
  value,
  fullName,
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
              <img
                className={
                  "w-8 h-8 rounded-full shadow-customDark object-cover"
                }
                src={image}
                alt={""}
              />
              <span className={"font-bold"}>{value}</span>
              <span className={"font-bold text-gray-300"}>{fullName}</span>
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
                "rounded-[10px] absolute w-full shadow-2xl bg-white h-[250px] overflow-y-auto"
              }
            >
              {data.map((select: string, i: number) => {
                const { ticker, logoUrl, name }: any = select;

                return (
                  <div
                    onClick={() => clickHandler(data[i])}
                    key={i}
                    className={"p-2 cursor-pointer flex items-center gap-1"}
                  >
                    <img
                      className={
                        "w-8 h-8 rounded-full shadow-customDark object-cover"
                      }
                      width={32}
                      height={32}
                      src={logoUrl}
                      alt=''
                    />
                    <span className={"font-bold"}>{ticker}</span>
                    <span className='font-bold'>{name}</span>
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
