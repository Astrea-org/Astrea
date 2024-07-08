import { CiFilter } from "react-icons/ci";
import { Input } from "@headlessui/react";

function Explore() {
  return (
    <>
      <div className="lg:px-20 md:px-20">
        <div>
          <h1 className="text-center font-extrabold mt-24 text-4xl">Explore</h1>
        </div>
        <div className="flex gap-3">
          <div className="bg-[#F3F4F6] flex p-1">
            <CiFilter className="mt-1" />
            <p>Filter</p>
          </div>
          <div>
            <Input
              name="full_name"
              type="text"
              placeholder="Search Items"
              className=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Explore;
