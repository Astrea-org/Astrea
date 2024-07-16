export const SubmitState = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <span className="text-black p-10 text-2xl font-semibold shadow-md mt-52 rounded">
        Your data is being uploaded!
      </span>
      <video className="mt-auto" autoPlay muted playsInline loop>
        <source src="public/dumdum.mp4" type="video/mp4" />
      </video>
    </div>
  );
};
