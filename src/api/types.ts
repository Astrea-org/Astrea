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
