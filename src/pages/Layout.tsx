import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
        <div className="relative w-screen min-h-screen max-w-screen overflow-y-auto overflow-x-hidden bg-white text-black">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
        </>
    )
}