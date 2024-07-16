import { useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { LuDatabase } from "react-icons/lu";
import { CiWallet } from "react-icons/ci";
import { categories } from "../utils/data/cards";

function Explore() {
  const [activeAddress, setActiveAddress] = useState<string | null>(null);

  const handleCurrentWallet = async () => {
    const address = await window.arweaveWallet.getActiveAddress();
    setActiveAddress(address);
  };

  const handleConnectWallet = async () => {
    await window.arweaveWallet.connect(["ACCESS_ADDRESS", "SIGN_TRANSACTION"]);
    handleCurrentWallet();
  };

  console.log(activeAddress);

  return (
    <>
      <div className="bg-[#0F0F0F] text-white pt-12">
        <div className="my-auto px-5 lg:px-24 gap-4 lg:gap-10 pb-48">
          <div>
            <div className="flex justify-between">
              <h1 className="text-3xl font-bold">What we offer</h1>
            </div>
            <div className="mt-8 pb-12">
              <div className="bg-gray-600 shadow-lg w-[400px] p-6 rounded-xl">
                <div>
                  <LuDatabase size={22} />
                  <h2 className="text-xl font-bold mt-2">Permanent</h2>
                  <p className="">
                    Decentralized, immutable, and globally replicated electronic
                    data storage that can never be deleted.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-b from-purple-300 to-black border-gray-600 border rounded-xl">
            <div className="py-12 px-28 flex justify-between">
              <div className="mt-24">
                <h1 className="text-2xl font-bold">Get started!</h1>
                <p className="mt-2">
                  Qui ut exercitation officia proident enim non tempor tempor{" "}
                  <br />
                  ipsum ex nulla ea adipisicing sit consequat
                </p>
                <button
                  onClick={handleConnectWallet}
                  className="border border-gray-400 p-2 mt-4 flex gap-2"
                >
                  Connect Wallet
                  <span>
                    <CiWallet className="mt-1" size={18} />
                  </span>
                </button>
              </div>
              <div className="flex justify-between">
                <div className="bg-white shadow-lg w-52">
                  <img
                    src="https:/images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    alt=""
                    className="w-full h-auto "
                  />
                  <div className="flex justify-between px-2">
                    <p className="p-2 font-semibold">Cats</p>
                    <span className="mt-2 flex gap-2">
                      <FaRegHeart className="mt-1" />
                      324
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="mt-8">
            <div>
              <h1 className="text-2xl font-bold">Browse by Categories</h1>
            </div>
            <div className="mt-12 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-4">
                {categories.map((category) => (
                  <a
                    href="/"
                    key={category.id}
                    className="bg-white shadow-lg w-52"
                  >
                    <img
                      src={category.img}
                      alt="finance"
                      className="w-full h-auto p-5 aspect-square object-contain"
                    />
                    <div className="flex justify-center items-center text-center bg-gray-200">
                      <p className="p-2 text-xl font-semibold">
                        {category.name}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Explore;
