import { Link } from "react-router-dom";

export const UploadComplete = ({ txId }: { txId: string }) => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="text-black p-10 text-xl shadow-md mt-52 rounded flex flex-col items-center gap-5">
        <span className="font-bold">Great Success!!</span>
        <span className="text-md">You can we view your transaction here:</span>
        <Link
          to={`https://viewblock.io/arweave/tx/${txId}`}
          target="_blank"
          className="bg-gray-300 px-5 py-2 rounded-full "
        >
          {`https://viewblock.io/arweave/tx/${txId}`}
        </Link>
      </div>
      <img src="/dumdums.gif" alt="loading" className="mt-auto w-[80vw]" />
    </div>
  );
};
