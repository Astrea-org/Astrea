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
    console.log("disconnecting wallet");
    await window.arweaveWallet.disconnect();
  };

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
          <div className="relative w-8 h-8">
            <img
              src={`
                ${
                  window.location.pathname === "/"
                    ? scroll
                      ? "src/assets/images/logo_black.png"
                      : "src/assets/images/logo.png"
                    : "src/assets/images/logo_black.png"
                }`}
              alt="logo"
            />
          </div>
          Interweave
        </a>
        <div className="hidden lg:flex flex-row items-center text-lg gap-10 font-poppinsThin">
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
              className="w-[15rem] items-center gap-2 rounded-md bg-[#FFFFFF26] py-2 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-[#FFFFFF4D]"
            >
              Connect Wallet
            </button>
          ) : (
            <div>
              <Menu>
                <MenuButton className=" truncate w-[15rem] items-center gap-2 rounded-md bg-[#FFFFFF4D] py-2 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-[#FFFFFF26] transition-all focus:outline-none hover:bg-[#FFFFFF26]">
                  <CgProfile className="w-8 h-8 inline-block mr-2" />
                  {activeAddress}
                </MenuButton>

                <MenuItems
                  transition
                  anchor="bottom end"
                  className="w-[14rem] origin-top-right rounded mt-2 border border-[#FFFFFF4D] bg-[#FFFFFF4D] p-1 text text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                >
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
          className={`lg:hidden flex flex-col items-center bg-white text-black py-4`}
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
            DEMO
          </a>
        </div>
      )}
    </div>
  );
}
