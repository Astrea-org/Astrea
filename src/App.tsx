import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Form from "./pages/form/Form";
import LandingPage from "./pages/explore/LandingPage";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

declare global {
  interface Window {
    arweaveWallet: {
      connect: (foo: string[]) => void;
      disconnect: () => void;
      getActiveAddress: () => string;
      dispatch: (tx: any) => any;
    };
  }
}

export default function App() {
  return (
    <>
      <div className="min-h-screen bg-black overflow-x-clip">
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-asset" element={<Form />} />
            <Route path="/explore" element={<LandingPage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </div>
      <Footer />
    </>
  );
}
