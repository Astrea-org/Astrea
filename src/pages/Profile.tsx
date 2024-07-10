import { useEffect, useState } from "react";
import {
  createDataItemSigner,
  message,
  result,
  dryrun,
} from "@permaweb/aoconnect";
import toast from "react-hot-toast";
import { fetchUserByAddress } from "../api/user";
import { UserProfile } from "../types";
import { AiOutlineAccountBook } from "react-icons/ai";
import { PROCCESSID } from "../types";

function Profile() {
  const [activeAddress, setActiveAddress] = useState<string>("");
  const [isFetching, setIsFetching] = useState(false);
  const [username, setUsername] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [bio, setBio] = useState("");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const handleCurrentWallet = async () => {
    const address = await window.arweaveWallet.getActiveAddress();
    setActiveAddress(address);
  };

  useEffect(() => {
    handleCurrentWallet();
  }, []);

  const fetchProfile = async () => {
    const res = await fetchUserByAddress(activeAddress);
    setProfile(res);
  };

  const registerProfile = async () => {
    try {
      // Step 1: Prepare registration data
      const formData = {
        Action: "Register",
        From: "ao.id",
        wallet_address: activeAddress,
        username,
        profile_img: profileImg,
        bio,
      };

      // Step 2: Send message to register profile
      const mid = await message({
        process: PROCCESSID.profile,
        tags: [
          { name: "Action", value: "Register" },
          { name: "Target", value: "ao.id" },
          { name: "wallet_address", value: activeAddress },
          { name: "username", value: username },
          { name: "profile_img", value: profileImg },
          { name: "bio", value: bio },
        ],
        signer: createDataItemSigner(window.arweaveWallet),
      });

      console.log("Registration message ID:", mid);
      toast.success("Profile registered successfully!");
    } catch (err) {
      console.error("Error occurred during registration:", err);
      toast.error("Failed to register profile.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFetching(true);
    await registerProfile();
  };
  useEffect(() => {
    if (activeAddress) {
      setIsFetching(true);
      fetchProfile();
    }
  }, [activeAddress]);

  return (
    <>
      {isFetching ? (
        <p>Loading...</p>
      ) : profile ? (
        <div className="bg-white max-w-screen-xl px-4 py-8 mx-auto mt-24">
          {/* Render profile information */}
        </div>
      ) : (
        <div className="bg-white min-h-screen flex flex-col justify-center items-center mt-12">
          <h1 className="font-bold text-2xl">Create Profile</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mt-8">
              <label htmlFor="username" className="text-xl font-semibold">
                Username*
              </label>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-72 mt-1 rounded-md h-10 border border-gray-500"
              />
            </div>
            <div className="flex flex-col mt-3">
              <label htmlFor="profile_img" className="text-xl font-semibold">
                Profile Image URL
              </label>
              <input
                id="profile_img"
                type="text"
                value={profileImg}
                onChange={(e) => setProfileImg(e.target.value)}
                className="w-72 mt-1 rounded-md h-10 border border-gray-500"
              />
            </div>
            <div className="flex flex-col mt-3">
              <label htmlFor="bio" className="text-xl font-semibold">
                Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
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
      )}
    </>
  );
}

export default Profile;
