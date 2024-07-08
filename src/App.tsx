import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/api/Explore";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Explore />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
