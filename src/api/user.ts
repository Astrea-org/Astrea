import {
  createDataItemSigner,
  message,
  result,
  dryrun,
} from "@permaweb/aoconnect";
import { PROCCESSID, UserProfile } from "../types";

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
