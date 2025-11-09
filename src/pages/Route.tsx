import type { RouteObject } from "react-router-dom";

import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Favorites from "@/pages/Favorites";  

const Route: RouteObject[] = [
    { index: true, element: <Home /> },
    { index: false, path: "Favorites", element: <Favorites /> },
    { path: "/*", element: <NotFound /> },
];

export default Route;