import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return <div
        className="max-w-screen max-h-screen w-screen h-screen overflow-y-auto overflow-x-hidden bg-white text-black"
    >
        <Outlet />
        <Footer />
    </div>
}