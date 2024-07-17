import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { CgProfile } from "react-icons/cg";
import { useWallet } from "../context/WalletContext";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scroll, setScroll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { activeAddress, connectWallet, disconnectWallet } = useWallet();
  const location = useLocation();

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
        <Link to="/" className="flex flex-row gap-4 text-xl items-center">
          <div className="relative w-10 h-10">
            <img
              src={`
                ${
                  window.location.pathname === "/"
                    ? scroll
                      ? "/images/logo_black.svg"
                      : "/images/logo.svg"
                    : "/images/logo_black.svg"
                }`}
              alt="logo"
            />
          </div>
          AssetX
        </Link>
        <div className="hidden lg:flex flex-row items-center text gap-10 font-poppinsThin">
          <Link to="https://github.com/AssetX-org" target="_blank">
            Github
          </Link>
          <Link to="https://github.com/AssetX-org" target="_blank">
            Documentation
          </Link>
          <Link to="#features">Features</Link>
          <Link to="/">Whitepaper</Link>
        </div>
        <div className="hidden lg:block">
          {!activeAddress ? (
            <button
              onClick={connectWallet}
              className={`w-[15rem] items-center gap-2 rounded-md py-2 px-3 text-sm/6 font-semibold border-[1.5px] shadow-inner  focus:outline-none 
              ${
                location.pathname === "/"
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
                    location.pathname === "/"
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
                    <Link to="/profile">
                      <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3">
                        Profile
                      </button>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={disconnectWallet}
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
          <Link
            to="https://github.com/AssetX-org"
            target="_blank"
            className="py-2"
          >
            Github
          </Link>
          <Link
            to="https://github.com/AssetX-org"
            target="_blank"
            className="py-2"
          >
            Documentation
          </Link>
          <Link to="#features" className="py-2">
            Features
          </Link>
          <Link to="/" className="py-2">
            Whitepaper
          </Link>
          <Link
            to=""
            target="_blank"
            className="bg-white shadow-md hover:bg-gray-200 transition-all shadow-white text-black text-center font-poppinsThin rounded-xl px-10 py-2 text-lg mt-4 w-3/4"
          >
            Connect Wallet
          </Link>
        </div>
      )}
    </div>
  );
}
