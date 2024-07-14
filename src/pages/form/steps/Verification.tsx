import { useEffect, useState } from "react";
import { generateProof } from "../../../api/zk";
import "react-loading-skeleton/dist/skeleton.css";
import { useFormContext } from "react-hook-form";
import "../../../components/LoadingAnimation.css";
export default function Verification() {
  const [activeAddress, setActiveAddress] = useState<string>("");
  const [loadingProof, setLoadingProof] = useState<boolean>(false);
  const [owner, setOwner] = useState<string>("");

  const { watch, setValue } = useFormContext();
  const asset = watch();

  useEffect(() => {
    handleCurrentWallet();
    setOwner(activeAddress);
  }, [activeAddress]);

  const [jsonObject, setJsonObject] = useState<string>(
    JSON.stringify("", null, 2)
  );

  // const handleTranscation = async () => {
  //   const transaction = await window.arweaveWallet.createTransaction({
  //     data: '<html><head><meta charset="UTF-8"><title>Hello permanent world! This was signed via ArConnect!!!</title></head><body></body></html>',
  //   });

  //   await window.arweaveWallet.transactions.sign(transaction);
  // };

  const handleCurrentWallet = async () => {
    const address = await window.arweaveWallet.getActiveAddress();
    setActiveAddress(address);
  };

  const handleProofGen = async () => {
    setLoadingProof(true);
    const res = await generateProof({
      owner,
      title: asset.title,
      data: asset.file[0].name,
    });
    const proof = JSON.stringify(res, null, 2);
    setJsonObject(proof);
    setValue("proof", proof);
    setLoadingProof(false);
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
              disabled={loadingProof}
            >
              Generate Proof
            </button>

            <button
              // onClick={handleTranscation}
              className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
              disabled={loadingProof}
            >
              Submit
            </button>
          </div>
        </div>
        {loadingProof ? (
          <div className="w-full h-64 bg-gray-100 flex flex-col gap-10 justify-center items-center">
            <div className="loader "></div>
            <span className=" font-poppinsSemiBold">
              Please wait this might take a minute...
            </span>
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
            value={asset.title}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>
        {asset.file && asset.file.length > 0 && (
          <div>
            <label className="block text-gray-700 mb-1">Data</label>
            <input
              type="text"
              value={asset.file[0].name}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-100"
            />
          </div>
        )}
      </div>
    </div>
  );
}
