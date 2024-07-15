import { useEffect, useState } from "react";
import { createDataItemSigner, message } from "@permaweb/aoconnect";
import toast from "react-hot-toast";
import { fetchUserByAddress } from "../api/user";
import { UserProfile } from "../types";
import { PROCCESSID } from "../types";
import { useWallet } from "../context/WalletContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Profile() {
  const { activeAddress } = useWallet();
  const [isFetching, setIsFetching] = useState(false);
  const [username, setUsername] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [bio, setBio] = useState("");
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const fetchProfile = async () => {
    if (!activeAddress) return;

    setIsFetching(true);
    try {
      const res = await fetchUserByAddress(activeAddress);
      setProfile(res);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const registerProfile = async () => {
    if (!activeAddress) return;

    try {
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
      fetchProfile(); // Refresh profile after registration
    } catch (err) {
      console.error("Error occurred during registration:", err);
      toast.error("Failed to register profile.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (activeAddress) {
      setIsFetching(true);
      await registerProfile();
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (activeAddress) {
      fetchProfile();
    }
  }, [activeAddress]);

  if (isFetching) {
    return (
      <div className="bg-white min-h-screen mt-52">
        <div className="max-w-screen-xl px-4 py-8 mx-auto mt-24">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <Skeleton
                circle={true}
                height={112}
                width={112}
                baseColor="#d1d5db"
              />
              <div className="mt-6">
                <p className="text-lg font-bold">
                  <Skeleton width={100} baseColor="#d1d5db" />
                </p>
                <p>
                  <Skeleton width={200} baseColor="#d1d5db" />
                </p>
              </div>
            </div>
            <div>
              <Skeleton width={120} height={40} baseColor="#d1d5db" />
            </div>
          </div>
          <div className="mt-12">
            <p className="text-lg font-bold">
              <Skeleton width={80} baseColor="#d1d5db" />
            </p>
            <p className="mt-2">
              <Skeleton count={3} baseColor="#d1d5db" />
            </p>
          </div>
          <div className="mt-12">
            <p className="text-lg font-bold">
              <Skeleton width={100} baseColor="#d1d5db" />
            </p>
            <p className="mt-2">
              <Skeleton count={2} baseColor="#d1d5db" />
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {profile ? (
        <div className="bg-white min-h-screen">
          <div className="max-w-screen-xl px-4 py-8 mx-auto mt-24">
            <div className="flex justify-between">
              <div className="flex gap-4">
                <img
                  src="https://t4.ftcdn.net/jpg/05/62/99/31/360_F_562993122_e7pGkeY8yMfXJcRmclsoIjtOoVDDgIlh.jpg"
                  alt="Profile"
                  className="aspect-square w-28 object-cover rounded-full"
                />
                <div className="mt-6">
                  <p className="text-lg font-bold">@{profile.username}</p>
                  <p>{profile.wallet_address || <Skeleton />}</p>
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
              <p className="mt-2">{profile.bio}</p>
            </div>
            <div className="mt-12">
              <p className="text-lg font-bold">My Assets</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white min-h-screen flex flex-col justify-center items-center mt-12 text-black">
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
