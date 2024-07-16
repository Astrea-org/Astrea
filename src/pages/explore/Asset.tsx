import { useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaStarOfDavid } from "react-icons/fa6";
import udl from "../../assets/udl.png";
import { useParams } from "react-router-dom";
import { fetchTransaction } from "../../api/apis";
import { Transaction } from "../../api/types";
import { verifyProof } from "../../api/zk";
import toast from "react-hot-toast";

function Asset() {
  const [activeMarketTab, setActiveMarketTab] = useState("getData");
  const [open, setOpen] = useState(true);
  const [transactionDetails, setTransactionDetails] = useState<Transaction>();
  const [proof, setProof] = useState<any>();
  const { id } = useParams();

  const fetchAssetDetails = async () => {
    if (id) {
      const res = await fetchTransaction(id);
      if (res) {
        setTransactionDetails(res[0]);
      }
    }
  };
  useEffect(() => {
    console.log("here");
    fetchAssetDetails();
  }, [id]);

  useEffect(() => {
    console.log(transactionDetails);
  });
  const handleMarketTabClick = (tabName: any) => {
    setActiveMarketTab(tabName);
  };

  const formatDate = (timestamp: any) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  useEffect(() => {
    if (transactionDetails?.extractedTags?.proof) {
      setProof(
        JSON.stringify(
          JSON.parse(transactionDetails?.extractedTags?.proof ?? ""),
          null,
          2
        )
      );
    }
  });

  const handleZkVerificaton = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    const res = await verifyProof({ proof });
    if (res) {
      const isVerified = JSON.parse(res.result.body);
      if (isVerified.isValid) {
        toast.success("Data integrity is verified!");
      }
    }
  };
  return (
    <div className="bg-white min-h-screen font-poppinsRegular">
      <div className="mt-32 my-auto px-5 lg:px-24 gap-4 lg:gap-10 flex">
        <div className="w-[50%]">
          <div className="flex justify-center items-center">
            {transactionDetails?.extractedTags?.contentType === "image/png" ? (
              <div className="">
                <img
                  src={`https://arweave.net/${transactionDetails?.id}`}
                  alt="asset"
                  className="w-96"
                />
              </div>
            ) : (
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
            )}
          </div>

          <div className="border border-gray-400 h-52 p-3 rounded-lg mt-6">
            <div className="flex justify-between">
              <p className="font-bold flex gap-1">
                <CiMenuBurger className="mt-1" />
                Overview
              </p>
            </div>
            <hr className="h-px m-0 my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <div>
              <p className="mt-2 font-bold">
                {transactionDetails?.extractedTags?.title}
              </p>
              <p className="flex gap-1 mt-3">
                Create by <FaRegUser className="mt-1" />{" "}
                {transactionDetails?.owner.address}
              </p>
              <p className="mt-3">An Atomic NFT secured on Arweave.</p>
            </div>
          </div>
          <div className="border border-gray-400 h-52 p-3 rounded-lg mt-6">
            <div className="flex justify-between">
              <p className="font-bold flex gap-1">
                <FaStarOfDavid className="mt-1" />
                Asset Rights
              </p>
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
                <p>{transactionDetails?.extractedTags?.license}</p>
              </div>
            </div>
          </div>
          <div className="border border-gray-400 h-52 p-3 rounded-lg mt-6">
            <div className="flex justify-between">
              <p className="font-bold flex gap-1">
                <FaStarOfDavid className="mt-1" />
                Provenance Details
              </p>
            </div>
            <hr className="h-px m-0 my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <div className="flex justify-between">
              <img src={udl} alt="" className="w-28" />
              <p className="underline text-gray-500 mt-2">License Text</p>
            </div>
            <div className="mt-3">
              <div className="flex justify-between">
                <p>Transaction ID</p>
                <p>{transactionDetails?.id}</p>
              </div>
              <div className="flex justify-between mt-1">
                <p>Block Height</p>
                <p>{transactionDetails?.block.height}</p>
              </div>
              <div className="flex justify-between mt-1">
                <p>Date Created</p>
                <p>
                  {transactionDetails
                    ? formatDate(transactionDetails.block.timestamp)
                    : "Loading..."}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[50%]">
          <div className="border border-gray-400 h-52 p-5 rounded-lg">
            <p className="text-xl font-bold">
              {transactionDetails?.extractedTags?.title}
            </p>
            <p className="underline text-gray-500 mt-2">Viewblock</p>
            <p className="mt-3">
              Currently Owned by <span className="underline">1 owner</span>
            </p>
            <p className="mt-3">
              Currently being used by{" "}
              <span className="underline">10 users</span>
            </p>
          </div>
          <div className="mt-8">
            {/* {activeTab === "market" && ( */}
            <div className="border border-gray-400 p-5 rounded-lg mt-5">
              <div className="flex justify-around">
                <button
                  className={`border border-gray-400 px-6 py-2 rounded-lg ${
                    activeMarketTab === "getData" ? "underline bg-gray-300" : ""
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
            {/* )} */}
            {/* {activeTab === "comments" && (
              <div className="border border-gray-400 h-52 p-5 rounded-lg mt-5">
                Comments content
              </div>
            )}
            {activeTab === "activity" && (
              <div className="border border-gray-400 h-52 p-5 rounded-lg mt-5">
                Activity content
              </div>
            )} */}
          </div>
          <div className="border border-gray-400 mt-3 rounded-lg p-8">
            <div
              onClick={() => setOpen(!open)}
              className="text-lg font-bold mb-3 flex items-center justify-between w-full flex-row"
            >
              <span className="inline-flex items-center">
                ZK Generated Proof Json
                <MdKeyboardArrowDown size={40} />
              </span>
              <button
                onClick={handleZkVerificaton}
                className="px-4 py-2 bg-black text-white rounded-lg disabled:opacity-50 font-normal text-lg"
              >
                Verify ZKProof
              </button>
            </div>
            {open && (
              <>
                <pre className="overflow-x-auto">{proof}</pre>
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
