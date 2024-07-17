import axios from "axios";

interface ProofGenRequest {
  owner: string;
  title: string;
  data: string;
}

interface ProofGenResponse {
  proof: string;
}

interface VerifyProofRequest {
  proof: string;
}

interface VerifyProofResponse {
  result: any;
}

const BASE_URL = "https://43.205.87.51.nip.io";

export const generateProof = async (
  reqData: ProofGenRequest
): Promise<ProofGenResponse> => {
  try {
    const response = await axios.post<ProofGenResponse>(
      `${BASE_URL}/proof-gen`,
      reqData
    );
    return response.data;
  } catch (error) {
    console.error("Error generating proof:", error);
    throw new Error("Failed to generate proof");
  }
};

export const verifyProof = async (
  reqData: VerifyProofRequest
): Promise<VerifyProofResponse> => {
  try {
    const response = await axios.post<VerifyProofResponse>(
      `${BASE_URL}/verify`,
      reqData
    );
    return response.data;
  } catch (error) {
    console.error("Error verifying proof:", error);
    throw new Error("Failed to verify proof");
  }
};
