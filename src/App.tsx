import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import Landing from "./pages/Landing";
// import Store from "./pages/Store";
// import About from "./pages/About";
// import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route index element={<Landing />} />
          {/* <Route path="store/*" element={<Store />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
