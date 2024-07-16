import { GraphQLClient, gql } from "graphql-request";
import { addDataToDBProps } from "./types";
import {
  createDataItemSigner,
  dryrun,
  message,
  result,
} from "@permaweb/aoconnect";
import { PROCCESSID } from "../utils/config";

export const fetchProcesses = async (address: string) => {
  if (!window.arweaveWallet) return;
  const client = new GraphQLClient("https://arweave.net/graphql");

  const query = gql`
  query {
    transactions(owners: "${address}",
    tags: [{ name: "Data-Protocol", values: ["ao"] }, { name: "Type", values: ["Process"] }],
    first: 999
  ) {
      edges {
        node {
          id
          tags {
            name
            value
          }
        }
      }
    }
  }
`;

  const res: any = await client.request(query);

  console.log(res);
  const transactionsWithLicense = res.transactions.edges.filter(
    (transaction: any) =>
      transaction.node.tags.some((tag: any) => tag.name === "License")
  );

  const data = transactionsWithLicense.map((transaction: any) => {
    return {
      id: transaction.node.id,
      title: transaction.node.tags.find((tag: any) => tag.name === "Title")
        .value,
      content_type: transaction.node.tags.find(
        (tag: any) => tag.name === "Content-Type"
      ).value,
    };
  });

  console.log(data);
  return data;
};

export const fetchDataArweave = async (txId: string) => {
  const data = await fetch(`https://arweave.net/${txId}`);

  return data;
};

export const addAssetToDB = async ({
  PID,
  Owner,
  OwnerId,
  Username,
  Content_Type,
}: addDataToDBProps) => {
  try {
    const mid = await message({
      process: PROCCESSID.assetxDb,
      tags: [
        { name: "Target", value: "ao.id" },
        { name: "Action", value: "Add" },
        { name: "PID", value: PID },
        { name: "Owner", value: Owner },
        { name: "OwnerId", value: OwnerId },
        { name: "Username", value: Username },
        { name: "Content_Type", value: Content_Type },
      ],
      signer: createDataItemSigner(window.arweaveWallet),
    });
    const res = await result({
      message: mid,
      process: PROCCESSID.assetxDb,
    });
    console.log(res);
    const data = res.Messages[0].Data;

    return data;
  } catch (err) {
    console.error("Error occurred:", err);
  }
  return null;
};

export const getAssetFromDB = async () => {
  try {
    const Messages = await dryrun({
      process: PROCCESSID.assetxDb,
      tags: [
        { name: "Target", value: "ao.id" },
        { name: "Action", value: "ListAllAssets" },
      ],
      signer: createDataItemSigner(window.arweaveWallet),
    });
    const data = Messages.Messages;
    const assets = data.map((message: any) => JSON.parse(message.Data));
    return assets;
  } catch (err) {
    console.error("Error occurred:", err);
  }
  return null;
};
