import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface ITimeLimit {
  onAction: any;
  times: any;
  label: string;
}

export const TimeLimit = ({ times, label, onAction }: ITimeLimit) => {
  const { timeLimit } = useTypedSelector((state) => state.offerReducer);

  return (
    <label>
      <p className={"text-lg font-bold mb-1 ml-[10px]"}>{label}</p>
      <div className={"flex items-center justify-between p-5"}>
        {times.map((t: any, i: number) => {
          return (
            <button
              type="button"
              onClick={() => onAction(t)}
              className={`${
                timeLimit === t ? "text-purple" : "text-gray"
              } font-bold cursor-pointer`}
              key={i}
            >{`${t} min`}</button>
          );
        })}
      </div>
    </label>
  );
};
