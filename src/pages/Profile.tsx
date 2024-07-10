import { useEffect, useState } from "react";
import {
  createDataItemSigner,
  message,
  result,
  dryrun,
} from "@permaweb/aoconnect";
import toast from "react-hot-toast";

interface Author {
  PID: string;
  name: string;
}

interface Message {
  Data: string;
}

interface DryrunResult {
  Messages: { Data: string }[];
}

interface RegisterResult {
  Messages: Message[];
}

function Profile() {
  const [activeAddress, setActiveAddress] = useState<string>("");
  const [isFetching, setIsFetching] = useState(false);
  const processId = "iJ8bCUv-RGfWYF-fiGS_A_4d7fUtSwy9su9IcS48n2c";

  const handleCurrentWallet = async () => {
    const address = await window.arweaveWallet.getActiveAddress();
    setActiveAddress(address);
  };

  const checkUserRegistered = async () => {
    console.log("Active address:", activeAddress);
    try {
      const mid = await message({
        process: processId,
        tags: [
          { name: "Target", value: "ao.id" },
          { name: "Action", value: "get-profile-by-wallet-address" },
          { name: "wallet_address", value: activeAddress },
        ],
        signer: createDataItemSigner(window.arweaveWallet),
      });

      let { Messages, Spawns, Output, Error } = await result({
        message: mid,
        process: processId,
      });
      console.log("Response received:", typeof Messages[0].Data);

      if (typeof Messages[0].Data === "string") {
        const parsedRes = JSON.parse(Messages[0].Data);

        console.log("res par", parsedRes);
        if (parsedRes.Data) {
          const profile = JSON.parse(parsedRes.Data);
          if (profile.PID) {
            console.log("Profile found:", profile);
          } else {
            console.log("Profile not found.");
          }
        }
      }
    } catch (err) {
      console.error("Error occurred:", err);
    }
  };

  useEffect(() => {
    handleCurrentWallet();
  }, []);

  useEffect(() => {
    if (activeAddress) {
      setIsFetching(true);
      checkUserRegistered();
    }
  }, [activeAddress]);

  const kirtan = true;

  return (
    <>
      {kirtan ? (
        <>
          <div className="bg-white">
            <div className="max-w-screen-xl px-4 py-8 mx-auto mt-24">
              <div className="md:flex justify-between">
                <div className="flex gap-4">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Cat_-1_%2826079853855%29.jpg/1200px-Cat_-1_%2826079853855%29.jpg"
                    className="aspect-square w-28 object-cover rounded-full"
                  />
                  <div className="mt-6">
                    <p className="text-lg font-bold">Cat Chandak</p>
                    <p>@catxar</p>
                    <p>0xwierh4739nfcksdkngf234e2s</p>
                  </div>
                </div>
                <div>
                  <button className="mt-8 bg-gray-300 px-5 py-2 rounded-lg">
                    Edit profile
                  </button>
                </div>
              </div>
              <div className="mt-12">
                <p className="text-lg font-bold">About</p>
                <p className="mt-2">
                  I am a full stack developer currently working as LFX mentee
                  with vitessio. I love building products.
                </p>
              </div>
              <div className="mt-12">
                <p className="text-lg font-bold">My Assets</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="bg-white">
            <div className="max-w-screen-xl px-4 py-8 mx-auto mt-24">
              <h1 className="font-bold text-2xl">Create Profile</h1>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const name = (e.target as any).elements.name.value;
                  // registerAuthor(name);
                }}
              >
                <div className="flex flex-col mt-8">
                  <label htmlFor="name" className="text-xl font-semibold">
                    Name*
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="w-72 mt-1 rounded-md h-10 border border-gray-500"
                  />
                </div>
                <div className="flex flex-col mt-3">
                  <label htmlFor="username" className="text-xl font-semibold">
                    Username*
                  </label>
                  <input
                    id="username"
                    type="text"
                    required
                    className="w-72 mt-1 rounded-md h-10 border border-gray-500"
                  />
                </div>
                <div className="flex flex-col mt-3">
                  <label htmlFor="about" className="text-xl font-semibold">
                    About
                  </label>
                  <input
                    id="about"
                    type="text"
                    className="w-72 mt-1 rounded-md h-20 border border-gray-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gray-300 px-5 py-2 rounded-lg mt-4"
                >
                  Create
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
