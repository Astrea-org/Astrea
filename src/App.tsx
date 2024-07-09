import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Navbar from "./components/Navbar";
import Form from "./pages/form/Form";

declare global {
  interface Window {
    arweaveWallet: {
      connect: (foo: string[]) => void;
      disconnect: () => void;
      getActiveAddress: () => string;
    };
  }
}

export default function App() {
  return (
    <div className="min-h-screen bg-black overflow-x-clip">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Explore />} />
          <Route path="/add-asset" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
