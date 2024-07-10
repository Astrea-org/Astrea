import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  const [scroll, setScroll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAddress, setActiveAddress] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCurrentWallet = async () => {
    const address = await window.arweaveWallet.getActiveAddress();
    setActiveAddress(address);
  };

  const handleConnectWallet = async () => {
    await window.arweaveWallet.connect(["ACCESS_ADDRESS", "SIGN_TRANSACTION"]);
    handleCurrentWallet();
  };

  const handleDisconnectWallet = async () => {
    setActiveAddress("");
    await window.arweaveWallet.disconnect();
  };

  useEffect(() => {
    handleCurrentWallet();
  }, []);

  useEffect(() => {
    console.log(window.location.pathname === "/" && scroll);
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`flex flex-row py-6 px-10 justify-between items-center font-poppinsRegular ${
          window.location.pathname === "/"
            ? scroll
              ? "bg-white text-black"
              : "text-white bg-transparent"
            : "text-black bg-white"
        }`}
      >
        <a href="/" className="flex flex-row gap-4 text-xl items-center">
          <div className="relative w-10 h-10">
            <img
              src={`
                ${
                  window.location.pathname === "/"
                    ? scroll
                      ? "src/assets/images/logo_black.svg"
                      : "src/assets/images/logo.svg"
                    : "src/assets/images/logo_black.svg"
                }`}
              alt="logo"
            />
          </div>
          AssetX
        </a>
        <div className="hidden lg:flex flex-row items-center text gap-10 font-poppinsThin">
          <a href="" target="_blank">
            Github
          </a>
          <a href="" target="_blank">
            Documentation
          </a>
          <a href="#features">Features</a>
          <a href="/">Whitepaper</a>
        </div>
        <div className="hidden lg:block">
          {activeAddress === "" ? (
            <button
              onClick={handleConnectWallet}
              className={`w-[15rem] items-center gap-2 rounded-md py-2 px-3 text-sm/6 font-semibold border-[1.5px] shadow-inner  focus:outline-none 
              ${
                window.location.pathname === "/"
                  ? scroll
                    ? "bg-[#0000004D] text-black border-black shadow-black/10 hover:bg-[#00000026]"
                    : "bg-[#FFFFFF4D] text-white border-white shadow-white/10 hover:bg-[#FFFFFF26]"
                  : "bg-[#0000004D] text-black border-black shadow-black/10 hover:bg-[#00000026]"
              }`}
            >
              Connect Wallet
            </button>
          ) : (
            <div>
              <Menu>
                <MenuButton
                  className={` truncate w-[15rem] items-center gap-2 rounded-md py-2 px-3 text-sm/6 font-semibold  border-[1px] shadow-inner focus:outline-none ${
                    window.location.pathname === "/"
                      ? scroll
                        ? "bg-[#00000026] text-black border-black shadow-black/10 hover:bg-[#00000026]"
                        : "bg-[#FFFFFF4D] text-white border-white shadow-white/10 hover:bg-[#FFFFFF26]"
                      : "bg-[#00000026] text-black border-black shadow-black/10 hover:bg-[#00000026]"
                  }`}
                >
                  <CgProfile className="w-8 h-8 inline-block mr-2" />
                  {activeAddress}
                </MenuButton>

                <MenuItems
                  transition
                  anchor="bottom end"
                  className={`z-[100] w-[14rem] origin-top-right rounded mt-2 border p-1 text transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 ${
                    window.location.pathname === "/"
                      ? scroll
                        ? "bg-[#00000026] text-black border-black shadow-black/10 hover:bg-[#00000026]"
                        : "bg-[#FFFFFF4D] text-white border-white shadow-white/10 hover:bg-[#FFFFFF26]"
                      : "bg-[#00000026] text-black border-black shadow-black/10 hover:bg-[#00000026]"
                  }`}
                >
                  <MenuItem>
                    <a href="/profile">
                      <button
                        onClick={handleDisconnectWallet}
                        className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3"
                      >
                        Profile
                      </button>
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={handleDisconnectWallet}
                      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3"
                    >
                      Disconnect Wallet
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          )}
        </div>
        <div className="lg:hidden">
          <button onClick={handleMenuToggle} className="text-2xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div
          className={`lg:hidden flex flex-col items-center text-black py-4 font-bold`}
        >
          <a href="" target="_blank" className="py-2">
            Github
          </a>
          <a href="" target="_blank" className="py-2">
            Documentation
          </a>
          <a href="#features" className="py-2">
            Features
          </a>
          <a href="/" className="py-2">
            Whitepaper
          </a>
          <a
            href=""
            target="_blank"
            className="bg-white shadow-md hover:bg-gray-200 transition-all shadow-white text-black text-center font-poppinsThin rounded-xl px-10 py-2 text-lg mt-4 w-3/4"
          >
            Connect Wallet
          </a>
        </div>
      )}
    </div>
  );
}
