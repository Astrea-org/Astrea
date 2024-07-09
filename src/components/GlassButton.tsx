interface GlassButtonProps {
  content: string;
  handleOnClick?: () => void;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  content,
  handleOnClick,
}) => {
  return (
    <button
      onClick={handleOnClick}
      className="text-center font-poppinsThin rounded px-10 py-3 lg:text-xl lg:w-[12vw] items-center gap-2  bg-[#FFFFFF4D] text-sm/6 font-semibold text-white border-white border-[1.5px] shadow-inner shadow-white/10 focus:outline-none hover:bg-[#FFFFFF26]"
    >
      {content}
    </button>
  );
};
