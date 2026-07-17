import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AnimatedBackground from "../common/AnimatedBackground";

const AppShell = () => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppShell;
