import { Outlet } from "react-router-dom";
import Navbar from "../Component/SharePage/Navbar";
import Footer from "../Component/SharePage/Footer";

const Root = () => {
  return (
    <div>
      <nav className="bg-base-300">
        <Navbar></Navbar>
      </nav>
      <main className="min-h-[calc(100vh-300px)] container mx-auto lg:px-10">
        <Outlet />
      </main>

      <Footer></Footer>
    </div>
  );
};

export default Root;
