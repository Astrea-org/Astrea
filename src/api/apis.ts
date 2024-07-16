import { GraphQLClient, GraphQLResponse, gql } from "graphql-request";
import { addDataToDBProps, ExtractedTags, Tag, Transaction } from "./types";
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

export const fetchTransaction = async (txId: string) => {
  if (!window.arweaveWallet) return;
  const client = new GraphQLClient("https://arweave.net/graphql");

  const query = gql`
    query {
      transactions(
        ids: "${txId}"
        first: 100
      ) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            tags {
              name
              value
            }
            data {
              size
              type
            }
            owner {
              address
            }
            block {
              height
              timestamp
            }
          }
        }
      }
    }
  `;

  const res: any = await client.request(query);
  function extractTags(tags: Tag[]): ExtractedTags {
    const extractedTags: ExtractedTags = {};
    tags.forEach((tag) => {
      switch (tag.name) {
        case "Content-Type":
          extractedTags.contentType = tag.value;
          break;
        case "Creator":
          extractedTags.creator = tag.value;
          break;
        case "Title":
          extractedTags.title = tag.value;
          break;
        case "Description":
          extractedTags.description = tag.value;
          break;
        case "Implements":
          extractedTags.implements = tag.value;
          break;
        case "Date-Created":
          extractedTags.dateCreated = tag.value;
          break;
        case "Action":
          extractedTags.action = tag.value;
          break;
        case "License":
          extractedTags.license = tag.value;
          break;
        case "Currency":
          extractedTags.currency = tag.value;
          break;
        case "Proof":
          extractedTags.proof = tag.value;
          break;
        case "Data-Protocol":
          extractedTags.dataProtocol = tag.value;
          break;
        case "Variant":
          extractedTags.variant = tag.value;
          break;
        case "Type":
          extractedTags.type = tag.value;
          break;
        case "Module":
          extractedTags.module = tag.value;
          break;
        case "Scheduler":
          extractedTags.scheduler = tag.value;
          break;
        case "SDK":
          extractedTags.sdk = tag.value;
          break;
        default:
          break;
      }
    });
    return extractedTags;
  }

  function extractData(response: GraphQLResponse): Transaction[] {
    const transactions = (response as any).transactions;
    return transactions.edges.map((edge: any) => {
      const { tags, ...rest } = edge.node;
      const extractedTags = extractTags(tags);
      return { ...rest, extractedTags };
    });
  }

  const extractedData = extractData(res as GraphQLResponse);
  console.log("ex:", extractedData);
  return extractedData;
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
