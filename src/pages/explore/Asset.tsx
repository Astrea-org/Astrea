import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaStarOfDavid } from "react-icons/fa6";
import udl from "../../assets/udl.png";

function Asset() {
  const [activeTab, setActiveTab] = useState("market");
  const [activeMarketTab, setActiveMarketTab] = useState("getData");
  console.log(setActiveTab);

  const handleMarketTabClick = (tabName: any) => {
    setActiveMarketTab(tabName);
  };

  return (
    <div className="bg-white min-h-screen font-poppinsRegular">
      <div className="mt-32 my-auto px-5 lg:px-24 gap-4 lg:gap-10 flex">
        <div className="w-[50%]">
          <div className="flex justify-center items-center">
            <img
              src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x4.jpg"
              alt=""
              className="w-80 rounded-lg"
            />
          </div>

          <div className="border border-gray-400 h-52 p-3 rounded-lg mt-6">
            <div className="flex justify-between">
              <p className="font-bold flex gap-1">
                <CiMenuBurger className="mt-1" />
                Overview
              </p>
              <span>
                <MdKeyboardArrowDown className="mt-1" />
              </span>
            </div>
            <hr className="h-px m-0 my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <div>
              <p className="mt-2 font-bold">_marko_b_httpss.mj.runzJDC5hojE</p>
              <p className="flex gap-1 mt-3">
                Create by <FaRegUser className="mt-1" /> cat
              </p>
              <p className="underline text-gray-500 mt-3">Cat</p>
              <p className="mt-3">An Atomic NFT secured on Arweave.</p>
            </div>
          </div>
          <div className="border border-gray-400 h-52 p-3 rounded-lg mt-6">
            <div className="flex justify-between">
              <p className="font-bold flex gap-1">
                <FaStarOfDavid className="mt-1" />
                Asset Rights
              </p>
              <span>
                <MdKeyboardArrowDown className="mt-1" />
              </span>
            </div>
            <hr className="h-px m-0 my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <div className="flex justify-between">
              <img src={udl} alt="" className="w-28" />
              <p className="underline text-gray-500 mt-2">License Text</p>
            </div>
            <div className="mt-3">
              <div className="flex justify-between">
                <p>Commercial-Use</p>
                <p>Allowed With Revenue Share</p>
              </div>
              <div className="flex justify-between mt-1">
                <p>License</p>
                <p>8se3e5tgf45efv</p>
              </div>
            </div>
          </div>
          <div className="border border-gray-400 h-52 p-3 rounded-lg mt-6">
            <div className="flex justify-between">
              <p className="font-bold flex gap-1">
                <FaStarOfDavid className="mt-1" />
                Provenance Details
              </p>
              <span>
                <MdKeyboardArrowDown className="mt-1" />
              </span>
            </div>
            <hr className="h-px m-0 my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <div className="flex justify-between">
              <img src={udl} alt="" className="w-28" />
              <p className="underline text-gray-500 mt-2">License Text</p>
            </div>
            <div className="mt-3">
              <div className="flex justify-between">
                <p>Transaction ID</p>
                <p>9E7bFerf</p>
              </div>
              <div className="flex justify-between mt-1">
                <p>Block Height</p>
                <p>1,421,652</p>
              </div>
              <div className="flex justify-between mt-1">
                <p>Date Created</p>
                <p>July 10, 2024</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[50%]">
          <div className="border border-gray-400 h-52 p-5 rounded-lg">
            <p className="text-xl font-bold">
              _marko_b_httpss.mj.runzJDC5hojEos_a_simple_vector_like_illu
            </p>
            <p className="underline text-gray-500 mt-2">Viewblock</p>
            <p className="mt-3">
              Currently Owned by <span className="underline">1 owner</span>
            </p>
            <p className="mt-3">
              Currently being used by
              <span className="underline">10 users</span>
            </p>
          </div>
          <div className="mt-8">
            {activeTab === "market" && (
              <div className="border border-gray-400 h-52 p-5 rounded-lg mt-5">
                <div className="flex gap-24">
                  <button
                    className={`border border-gray-400 px-6 py-2 rounded-lg ${
                      activeMarketTab === "getData"
                        ? "underline bg-gray-300"
                        : ""
                    }`}
                    onClick={() => handleMarketTabClick("getData")}
                  >
                    Get Data
                  </button>
                  <button
                    className={`border border-gray-400 px-6 py-2 rounded-lg ${
                      activeMarketTab === "transferOwnership"
                        ? "underline bg-gray-300"
                        : ""
                    }`}
                    onClick={() => handleMarketTabClick("transferOwnership")}
                  >
                    Transfer Ownership
                  </button>
                </div>
                {/* Additional content based on active market tab */}
                {activeMarketTab === "buy" && (
                  <div className="mt-5">Buy content</div>
                )}
                {activeMarketTab === "sell" && (
                  <div className="mt-5">Sell content</div>
                )}
                {activeMarketTab === "transfer" && (
                  <div className="mt-5">Transfer content</div>
                )}
              </div>
            )}
            {activeTab === "comments" && (
              <div className="border border-gray-400 h-52 p-5 rounded-lg mt-5">
                Comments content
              </div>
            )}
            {activeTab === "activity" && (
              <div className="border border-gray-400 h-52 p-5 rounded-lg mt-5">
                Activity content
              </div>
            )}
          </div>
          <div className="mt-8"></div>
        </div>
      </div>
    </div>
  );
}

export default Asset;
