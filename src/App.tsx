import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Form from "./pages/form/Form";
import LandingPage from "./pages/explore/LandingPage";
import Profile from "./pages/Profile/Profile";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import Asset from "./pages/explore/Asset";
import { WalletProvider } from "./context/WalletContext";

declare global {
  interface Window {
    arweaveWallet: any;
  }
}

export default function App() {
  return (
    <BrowserRouter>
      <WalletProvider>
        <div className="min-h-screen bg-black overflow-x-clip">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-asset" element={<Form />} />
            <Route path="/assets" element={<LandingPage />} />
            <Route path="/asset/:id" element={<Asset />} />
            <Route path="/explore" element={<LandingPage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Toaster />
        </div>
        <Footer />
      </WalletProvider>
    </BrowserRouter>
  );
}
