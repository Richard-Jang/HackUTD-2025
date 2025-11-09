import { Outlet } from "react-router-dom";

export default function Layout() {
    return <div className="max-w-screen max-h-screen w-screen h-screen">
        <Outlet />
    </div>
}