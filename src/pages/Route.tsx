import type { RouteObject } from "react-router-dom";

import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";

const Route: RouteObject[] = [
    { index: true, element: <Home /> },
    { path: "/*", element: <NotFound /> },
];

export default Route;