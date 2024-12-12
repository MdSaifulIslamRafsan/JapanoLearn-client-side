import { Outlet } from "react-router-dom";
import Navbar from "../Component/SharePage/Navbar";

const Root = () => {
    return (
        <div>
            <nav className="bg-base-300">
                <Navbar></Navbar>
            </nav>
             <Outlet />
        </div>
    );
};

export default Root;