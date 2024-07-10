import React, { useState } from "react";

function Asset() {
  const [activeTab, setActiveTab] = useState("market");
  const [activeMarketTab, setActiveMarketTab] = useState("buy");

  const handleTabClick = (tabName: any) => {
    setActiveTab(tabName);
  };

  const handleMarketTabClick = (tabName: any) => {
    setActiveMarketTab(tabName);
  };

  return (
    <div className="bg-white min-h-screen font-poppinsRegular">
      <div className="mt-32 my-auto px-5 lg:px-24 gap-4 lg:gap-10 flex">
        <div>
          <img
            src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x4.jpg"
            alt=""
            className="w-72 rounded-lg"
          />
        </div>
        <div>
          <div className="border border-gray-400 h-52 p-5 rounded-lg">
            <p className="text-xl font-bold">
              _marko_b_httpss.mj.runzJDC5hojEos_a_simple_vector_like_illust_7963a558-688c-450e-9e2d-4544d76b8f35_1
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
            <div className="flex gap-24">
              <button
                className={`border border-gray-400 px-6 py-2 rounded-lg ${
                  activeTab === "market" ? "underline bg-gray-300" : ""
                }`}
                onClick={() => handleTabClick("market")}
              >
                Market
              </button>
              <button
                className={`border border-gray-400 px-6 py-2 rounded-lg ${
                  activeTab === "comments" ? "underline bg-gray-300" : ""
                }`}
                onClick={() => handleTabClick("comments")}
              >
                Comments
              </button>
              <button
                className={`border border-gray-400 px-6 py-2 rounded-lg ${
                  activeTab === "activity" ? "underline bg-gray-300" : ""
                }`}
                onClick={() => handleTabClick("activity")}
              >
                Activity
              </button>
            </div>
            {/* Content based on active tab */}
            {activeTab === "market" && (
              <div className="border border-gray-400 h-52 p-5 rounded-lg mt-5">
                <div className="flex gap-24">
                  <button
                    className={`border border-gray-400 px-6 py-2 rounded-lg ${
                      activeMarketTab === "buy" ? "underline bg-gray-300" : ""
                    }`}
                    onClick={() => handleMarketTabClick("buy")}
                  >
                    Buy
                  </button>
                  <button
                    className={`border border-gray-400 px-6 py-2 rounded-lg ${
                      activeMarketTab === "sell" ? "underline bg-gray-300" : ""
                    }`}
                    onClick={() => handleMarketTabClick("sell")}
                  >
                    Sell
                  </button>
                  <button
                    className={`border border-gray-400 px-6 py-2 rounded-lg ${
                      activeMarketTab === "transfer"
                        ? "underline bg-gray-300"
                        : ""
                    }`}
                    onClick={() => handleMarketTabClick("transfer")}
                  >
                    Transfer
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
