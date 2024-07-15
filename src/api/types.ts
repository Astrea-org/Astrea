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
