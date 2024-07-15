import { GraphQLClient, gql } from "graphql-request";

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
