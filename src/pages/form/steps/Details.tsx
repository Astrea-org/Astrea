import React from "react";

export default function Details() {
  return (
    <>
      <div className="text-white">
        <h1 className="text-3xl font-bold">Collection Details</h1>
        <form action="" className="mt-4">
          <div className="flex flex-col">
            <label htmlFor="" className="text-xl">
              Title*
            </label>
            <input
              type="text"
              value=""
              required
              className="w-[450px] mt-1 rounded-md h-10"
            />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="" className="text-xl">
              Description*
            </label>
            <input
              type="text"
              value=""
              required
              className="w-[450px] mt-1 rounded-md h-32"
            />
          </div>
          <div>
            <p className="text-lg font-semibold mt-3">
              Note: Details entered below will only apply to newly created
              assets, <br /> existing assets will not be modified.
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
