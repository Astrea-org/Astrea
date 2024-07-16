export interface ProofData {
  scheme: string;
  curve: string;
  proof: {
    a: string[];
    b: [string[], string[]];
    c: string[];
  };
  inputs: string[];
}

export interface callProofGenProps {
  owner: string;
  title: string;
  data: string;
}

export interface addDataToDBProps {
  PID: string;
  Owner: string;
  OwnerId: string;
  Username: string;
  Content_Type: string;
}

export interface Tag {
  name: string;
  value: string;
}

interface Data {
  size: string;
  type: string;
}

interface Owner {
  address: string;
}

interface Block {
  height: number;
  timestamp: number;
}

export interface ExtractedTags {
  contentType?: string;
  creator?: string;
  title?: string;
  description?: string;
  implements?: string;
  dateCreated?: string;
  action?: string;
  license?: string;
  currency?: string;
  proof?: string;
  dataProtocol?: string;
  variant?: string;
  type?: string;
  module?: string;
  scheduler?: string;
  sdk?: string;
}

export interface Transaction {
  id: string;
  tags: Tag[];
  data: Data;
  owner: Owner;
  block: Block;
  extractedTags?: ExtractedTags;
}

export interface GraphQLResponse {
  transactions: {
    pageInfo: {
      hasNextPage: boolean;
    };
    edges: {
      cursor: string;
      node: Transaction;
    }[];
  };
}
