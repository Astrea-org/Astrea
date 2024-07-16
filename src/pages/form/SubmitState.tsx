export const SubmitState = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <span className="text-black p-10 text-2xl font-semibold shadow-md mt-52 rounded">
        Your data is being uploaded!
      </span>
      <video className="mt-auto" autoPlay muted playsInline loop>
        <source
          src="https://github.com/AssetX-org/AssetX/blob/0b16e4b0b92fa541dc51ba6bc41a035c64059049/src/assets/dumdum.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
};
