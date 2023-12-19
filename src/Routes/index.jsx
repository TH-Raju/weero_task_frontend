import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import AddProduct from "../Pages/AddProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element:  <Home />,
      },
      {
        path: "/addProduct",
        element: <AddProduct/>
      }
    ],
  },
]);
