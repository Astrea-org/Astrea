import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [scroll, setScroll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
          scroll ? "bg-white text-black" : "text-white"
        }`}
      >
        <a href="/" className="flex flex-row gap-4 text-xl items-center">
          <div className="relative w-8 h-8">
            <img
              src={`${
                scroll
                  ? "src/assets/images/logo_black.png"
                  : "src/assets/images/logo.png"
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
          <a
            href=""
            target="_blank"
            className="bg-white shadow-md hover:bg-gray-200 transition-all shadow-white text-black text-center font-poppinsThin rounded-xl px-10 py-2 text-lg lg:w-[12vw]"
          >
            DEMO
          </a>
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
