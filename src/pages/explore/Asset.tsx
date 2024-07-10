import React, { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaStarOfDavid } from "react-icons/fa6";
import udl from "../../assets/udl.png";

function Asset() {
  const [activeTab, setActiveTab] = useState("market");
  const [activeMarketTab, setActiveMarketTab] = useState("getData");
  const [open, setOpen] = useState(true);

  const handleMarketTabClick = (tabName: any) => {
    setActiveMarketTab(tabName);
  };

  const sampleJson = {
    proof: {
      scheme: "g16",
      curve: "bn128",
      proof: {
        a: [
          "0x23b2a19ec32e4184f3995a328789726b14c8c08bef1e92d8b",
          "0x2c4d692f6b441ab1ec7aec80485620194181a3abc5deac1d5",
        ],
        b: [
          [
            "0x2d33be0cf25f7680adc7d593170c8648b2c4dcef59ae7df8",
            "0x06e68f76220c9ff990d73fffdca97bd482f43c9337c4cf14",
          ],
          [
            "0x239eda10b3c839f10748a932f4fa9dc4d5ffae07fdf3ba885",
            "0x0b86a3d8df3a322638204aef842c48954812fcc129de52235",
          ],
        ],
        c: [
          "0x18ed7567dfa7193c9be68fb2a8d61b13782bc173c0a2de79caa6",
          "0x03b87587fcf2aae2504cdd0a0d8c629f928e31abf1296df5c666",
        ],
      },
      inputs: [
        "0x0000000000000000000000000000000000000338beba6414a3179f2",
        "0x0000000000000000000000000000000000000198a544ad1040ee842",
        "0x000000000000000000000000000000002db1bf988311e4ce2e28b8f",
        "0x00000000000000000000000000000000109ab7a7be3b4945ee2f979",
      ],
    },
  };

  return (
    <div className="bg-white min-h-screen font-poppinsRegular">
      <div className="mt-32 my-auto px-5 lg:px-24 gap-4 lg:gap-10 flex">
        <div className="w-[50%]">
          <div className="flex justify-center items-center">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <p
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map(({ name, job, date }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={name}>
                      <td className={classes}>
                        <p color="blue-gray" className="font-normal">
                          {name}
                        </p>
                      </td>
                      <td className={classes}>
                        <p color="blue-gray" className="font-normal">
                          {job}
                        </p>
                      </td>
                      <td className={classes}>
                        <p color="blue-gray" className="font-normal">
                          {date}
                        </p>
                      </td>
                      <td className={classes}>
                        <p color="blue-gray" className="font-medium">
                          Edit
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
          <div className="border border-gray-400 mt-3 rounded-lg p-8">
            <button
              onClick={() => setOpen(!open)}
              className="text-lg font-bold mb-3 flex justify-between"
            >
              Sample JSON Data
              <span className="mt-1">
                <MdKeyboardArrowDown />
              </span>
            </button>
            {open && (
              <>
                <pre>{JSON.stringify(sampleJson, null, 2)}</pre>
              </>
            )}
          </div>
          <div className="mt-8"></div>
        </div>
      </div>
    </div>
  );
}

export default Asset;

const TABLE_HEAD = ["Name", "Job", "Employed", ""];

const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];
