import type { RouteObject } from "react-router-dom";

import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Favorites from "@/pages/Favorites";  
import Selected from "@/pages/Selected";

const Route: RouteObject[] = [
    { index: true, element: <Home /> },
    { index: false, path: "favorites", element: <Favorites /> },
    { index: false, path: "selected", element: <Selected /> },
    { path: "/*", element: <NotFound /> },
];

export default Route;