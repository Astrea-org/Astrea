import { useEffect, useState } from "react";
import { useFormContext } from "../FormContext";
import { generateProof } from "../../../api/zk";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Verification() {
  const [activeAddress, setActiveAddress] = useState<string>("");
  const [loadingProof, setLoadingProof] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(true);

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
    setLoadingProof(true);
    const res = await generateProof({ owner, title, data });
    console.log(res);
    setJsonObject(JSON.stringify(res, null, 2));
    setLoadingProof(false);
  };

  function close() {
    setIsOpen(false);
  }

  return (
    <div className="flex flex-col p-6 w-[40vw] mx-auto">
      <div className="flex-1 mr-4">
        <div className="flex flex-row justify-between my-2">
          <h2 className="text-lg font-bold mb-2">JSON Object</h2>
          <div className="flex flex-row gap-5">
            <button
              onClick={handleProofGen}
              className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
              disabled={loadingProof}
            >
              Generate Proof
            </button>
            <button
              onClick={handleTranscation}
              className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
              disabled={loadingProof}
            >
              Submit
            </button>
          </div>
        </div>
        {loadingProof ? (
          <div>
            <Skeleton height={"16rem"} />
          </div>
        ) : (
          <textarea
            value={jsonObject}
            readOnly
            className="w-full h-64 p-2 border border-gray-300 rounded resize-none bg-gray-100"
          />
        )}
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
