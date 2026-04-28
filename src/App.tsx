/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingNav from "./components/FloatingNav";
import Home from "./pages/Home";
import WallOfTriumph from "./pages/WallOfTriumph";
import Startup from "./pages/Startup";
import Academics from "./pages/Academics";
import Projects from "./pages/Projects";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen selection:bg-tertiary selection:text-black flex flex-col">
        <Header />
        
        <main className="pt-16 relative overflow-hidden flex-1">
          {/* Background Engineering Element */}
          <div className="absolute right-[-10%] top-[5%] w-[800px] h-[800px] opacity-5 pointer-events-none select-none">
            <svg className="w-full h-full text-tertiary" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 0 A100 100 0 0 1 200 100 A100 100 0 0 1 100 200 A100 100 0 0 1 0 100 A100 100 0 0 1 100 0 Z M100 20 A80 80 0 0 0 20 100 A80 80 0 0 0 100 180 A80 80 0 0 0 180 100 A80 80 0 0 0 100 20 Z M100 40 A60 60 0 0 1 160 100 A60 60 0 0 1 100 160 A60 60 0 0 1 40 100 A60 60 0 0 1 100 40 Z" fill="currentColor"></path>
              <rect fill="currentColor" height="200" width="1" x="100" y="0"></rect>
              <rect fill="currentColor" height="1" width="200" x="0" y="100"></rect>
            </svg>
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/triumph" element={<WallOfTriumph />} />
            <Route path="/startup" element={<Startup />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </main>

        <Footer />
        <FloatingNav />
      </div>
    </Router>
  );
}
