import { SetStateAction } from "react";
import { Loop } from "./Loop";

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
    <div className='h-12 px-3 border-2 border-purple bg-white flex items-center justify-between rounded-[10px]'>
      {/* <div className="flex items-center justify-between"> */}
      <Loop />
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className='w-full outline-none rounded-md font-bold ml-2'
      />
      <button
        onClick={() => setSearchTerm("")}
        className='cursor-pointer text-purple font-bold'
      >
        Clear
      </button>
    </div>
  );
};
