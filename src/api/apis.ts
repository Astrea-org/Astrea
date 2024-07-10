import Arweave from "arweave";
import { CONTENT_TYPES, TagType } from "../types";
// import { dryrun } from "@permaweb/aoconnect";

const arweave = Arweave.init({});

export async function createTransaction(args: {
  content: any;
  contentType: string;
  tags: TagType[];
}) {
  let finalContent: any;
  switch (args.contentType) {
    case CONTENT_TYPES.json as any:
      finalContent = JSON.stringify(args.content);
      break;
    default:
      finalContent = args.content;
      break;
  }
  try {
    const txRes = await arweave.createTransaction(
      { data: finalContent },
      "use_wallet"
    );
    args.tags.forEach((tag: TagType) => txRes.addTag(tag.name, tag.value));
    const response = await window.arweaveWallet.dispatch(txRes);
    return response.id;
  } catch (e: any) {
    throw new Error(`Error creating transaction ...\n ${e}`);
  }
}
