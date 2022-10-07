import { SetStateAction, useState } from "react";
import { Loop } from "../../icons/Loop";

interface ISearchField {
  setSearchTerm: React.Dispatch<SetStateAction<string>>;
  searchTerm: string;
  placeholder: string;
}

export const SearchField = ({
  setSearchTerm,
  searchTerm,
  placeholder,
}: ISearchField) => {
  return (
    <div
      className={`group border border-gray-200 px-3 bg-transparent flex items-center justify-between rounded-[10px] hover:border-purple`}
    >
      <Loop />
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className='w-full outline-none py-3 rounded-md font-bold ml-2'
      />
      <button
        onClick={() => setSearchTerm("")}
        className='cursor-pointer text-purple font-bold hidden group-hover:block'
      >
        Clear
      </button>
    </div>
  );
};
