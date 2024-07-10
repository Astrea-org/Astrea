import { useEffect, useState } from "react";
import { useFormContext } from "../FormContext";

interface ProofData {
  scheme: string;
  curve: string;
  proof: {
    a: string[];
    b: [string[], string[]];
    c: string[];
  };
  inputs: string[];
}

// Empty proof data object
const emptyProofData: ProofData = {
  scheme: "g16",
  curve: "bn128",
  proof: {
    a: [
      "0x23b2a19ec32e4184f3995a328789726b14c8c08bef1e92d8bb3e2f74d324f16f",
      "0x2c4d692f6b441ab1ec7aec80485620194181a3abc5deac1d588b20ccf4213ae5",
    ],
    b: [
      [
        "0x2d33be0cf25f7680adc7d593170c8648b2c4dcef59ae7df89890316252d9cc45",
        "0x06e68f76220c9ff990d73fffdca97bd482f43c9337c4cf146c2f73172d63c18f",
      ],
      [
        "0x239eda10b3c839f10748a932f4fa9dc4d5ffae07fdf3ba885783cbe764d2901f",
        "0x0b86a3d8df3a322638204aef842c48954812fcc129de522358ad4521a2730edd",
      ],
    ],
    c: [
      "0x18ed7567dfa7193c9be68fb2a8d61b13782bc173c0a2de79caa6065b32ea19a8",
      "0x03b87587fcf2aae2504cdd0a0d8c629f928e31abf1296df5c6667f86de5c3670",
    ],
  },
  inputs: [
    "0x0000000000000000000000000000000000000338beba6414a3179f2b20d9fd0e",
    "0x0000000000000000000000000000000000000198a544ad1040ee842bb1da9684",
    "0x000000000000000000000000000000002db1bf988311e4ce2e28b8fae9aac352",
    "0x00000000000000000000000000000000109ab7a7be3b4945ee2f979101393733",
  ],
};

export default function Verification() {
  const [activeAddress, setActiveAddress] = useState<string>("");
  const { formData } = useFormContext();

  console.log(formData);
  useEffect(() => {
    handleCurrentWallet();
    setOwner(activeAddress);
  }, [activeAddress]);

  const [jsonObject, setJsonObject] = useState<string>(
    JSON.stringify("", null, 2)
  );

  const [owner, setOwner] = useState<string>("");
  const handleTranscation = async () => {
    const transaction = await window.arweaveWallet.createTransaction({
      data: '<html><head><meta charset="UTF-8"><title>Hello permanent world! This was signed via ArConnect!!!</title></head><body></body></html>',
    });

    await window.arweaveWallet.transactions.sign(transaction);
  };
  const title = "Test Test";
  const data = "test.csv";

  const handleCurrentWallet = async () => {
    const address = await window.arweaveWallet.getActiveAddress();
    setActiveAddress(address);
  };

  const handleProofGen = async () => {
    // const res = await generateProof({ owner, title, data });
    // console.log(res);
    setJsonObject(JSON.stringify(emptyProofData, null, 2));
  };
  return (
    <div className="flex flex-col p-6 w-[40vw] mx-auto">
      <div className="flex-1 mr-4">
        <div className="flex flex-row justify-between my-2">
          <h2 className="text-lg font-bold mb-2">JSON Object</h2>
          <div className="flex flex-row gap-5">
            <button
              onClick={handleProofGen}
              className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
            >
              Generate Proof
            </button>
            <button
              onClick={handleTranscation}
              className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
            >
              Submit
            </button>
          </div>
        </div>
        <textarea
          value={jsonObject}
          readOnly
          className="w-full h-64 p-2 border border-gray-300 rounded resize-none bg-gray-100"
        />
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-bold mb-2">Details</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Owner</label>
          <input
            type="text"
            value={owner}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Data</label>
          <input
            type="text"
            value={data}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
}
