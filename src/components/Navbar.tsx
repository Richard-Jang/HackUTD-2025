import { SiToyota } from "react-icons/si";
import { Link } from "react-router-dom";

export default function Navbar() {
    return <div className="w-full flex items-evenly gap-6 sticky bg-white top-0 text-xl py-3 px-8 border border-b-2 border-gray-400 shadow-lg z-10">
        <Link
            to={"/"}
            className="h-full flex grow gap-2 items-center justify-start text-rose-600"
        >
            <SiToyota />
            <span className="text-black tracking-wide font-bold">TOYOTA</span>
        </Link>
        <Link to={"/"} className="hover:scale-125 transition-all">Home</Link>
        <Link to={"./favorites"} className="hover:scale-125 transition-all">Favorites</Link>
    </div>
}