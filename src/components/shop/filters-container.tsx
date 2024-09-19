import { MdFilterList } from "react-icons/md";
import {ToogleOrder} from "@/components/filters";
import {PriceSelector} from "@/components/filters";


export default function FiltersContainer() {
  return (
    <div className="w-full flex flex-col mb-10">
      <legend className="text-2xl flex gap-2 mb-5"><MdFilterList className="h-7 w-7 text-primary"/> Filtro </legend>

      <div className="flex items-center justify-between gap-10 max-lg:flex-col ">
        <ToogleOrder/>
        <PriceSelector/>
      </div>
    </div>
  );
}