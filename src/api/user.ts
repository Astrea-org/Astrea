import { createDataItemSigner, dryrun, message } from "@permaweb/aoconnect";
import { PROCCESSID, UserProfile } from "../types";
import toast from "react-hot-toast";

export const fetchUserByAddress = async (
  wallet_address: string
): Promise<UserProfile | null> => {
  try {
    const Messages = await dryrun({
      process: PROCCESSID.profile,
      tags: [
        { name: "Target", value: "ao.id" },
        { name: "Action", value: "get-profile-by-wallet-address" },
        { name: "wallet_address", value: wallet_address },
      ],
      signer: createDataItemSigner(window.arweaveWallet),
    });
    console.log("data:", Messages);
    const data = Messages.Messages[0].Data;
    if (typeof data === "string") {
      const profile = JSON.parse(data);
      if (profile.PID) {
        return profile as UserProfile;
      } else {
        console.log("Profile not found.");
      }
    }
  } catch (err) {
    console.error("Error occurred:", err);
  }
  return null;
};

export const registerProfile = async ({
  activeAddress,
  username,
  profileImg,
  bio,
}: {
  activeAddress: string;
  username: string;
  profileImg: string;
  bio: string;
}) => {
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
  } catch (err) {
    console.error("Error occurred during registration:", err);
    toast.error("Failed to register profile.");
  } finally {
  }
};
