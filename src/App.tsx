import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";

import Route from "@/pages/Route";
import Layout from "@/pages/Layout";

function App() {

  const rootRoute: RouteObject = {
    path: "/",
    element: (<Layout />),
    children: [...Route],
  }
  const router = createBrowserRouter([rootRoute], {});

  return (
    <RouterProvider router={router} />
  );
}

export default App;