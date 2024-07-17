import { useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { CiWallet } from "react-icons/ci";
import { categories } from "../utils/data/cards";
import { Link } from "react-router-dom";

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
      <div className="bg-white pt-12">
        <div className="my-auto px-5 lg:px-24 gap-4 lg:gap-10 ">
          <div>
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold">Top Datasets</h1>
              <div className="flex gap-2">
                <button className="p-2 border border-gray-300">
                  Show More
                </button>
                <div className="flex gap-1">
                  <button className="px-2 py-1  bg-gray-200">
                    <IoIosArrowBack />
                  </button>
                  <button className="px-2 py-1 bg-gray-200">
                    <IoIosArrowForward />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-8 pb-12">
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

          <div className="bg-gray-100">
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

          <div className="mt-8">
            <div>
              <h1 className="text-2xl font-bold">Browse by Categories</h1>
            </div>
            <div className="mt-12 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-4">
                {categories.map((category) => (
                  <Link
                    to="/"
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
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Explore;
