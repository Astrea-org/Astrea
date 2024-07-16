import { TbListDetails } from "react-icons/tb";
import { getAssetFromDB } from "../../api/apis";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AssetItem } from "./types";

export default function Explore() {
  const navigate = useNavigate();

  const [assets, setAssets] = useState<AssetItem[]>([]);
  const fetchAssets = async () => {
    const res = await getAssetFromDB();

    if (res) {
      console.log(res);
      setAssets(res[0]);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);
  return (
    <>
      <section className="bg-white mt-24">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl ">
              Own your <br /> assets fr!
            </h1>
            <p className="max-w-[380px] mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
              Get secure data!
            </p>
            <a
              href="/add-asset"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 :text-white"
            >
              Get Started 🚀
            </a>
          </div>
        </div>
        <div className="max-w-screen-xl px-4 py-8 mx-auto">
          <h1 className="text-2xl font-bold">Trending Assets</h1>
          <div className="flex flex-wrap gap-20">
            {assets.map((asset) => (
              <div
                onClick={() => navigate(`/assets/${asset.PID}`)}
                className="mt-12 bg-[#3B3B3B] rounded-xl w-52 text-white shadow-xl "
              >
                {asset.Content_Type === "image/png" ? (
                  <img
                    src={`https://arweave.net/${asset.PID}`}
                    alt="Asset"
                    className="object-contain rounded-xl-t"
                  />
                ) : (
                  <div className="h-[30vh] flex flex-col bg-gray-100 p-5 rounded-xl-t">
                    <img
                      src="public/images/empty.png"
                      alt="empty"
                      className="w-[8vw] h-[8vw] mx-auto rounded-xl-t"
                    />
                    <span className="text-[#495057] font-poppinsSemiBold my-auto text-center">
                      Please purchase to view this content!
                    </span>
                  </div>
                )}
                <div className="py-4 px-3 h-[15vh]">
                  <div className="flex justify-between">
                    <p className="text-white whitespace-nowrap truncate">
                      {asset.PID}
                    </p>
                    <span>
                      <TbListDetails />
                    </span>
                  </div>
                  <div className="mt-2">
                    <p>0.001 AR</p>
                  </div>
                  <span className="whitespace-nowrap text-sm truncate w-[5vw]">
                    by {asset.Username}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
