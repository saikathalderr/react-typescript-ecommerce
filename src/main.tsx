import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import OrderSuccess from "./views/OrderSuccess";
import { CartProvider } from "./context/cart/cartContext";
import { OrderProvider } from "./context/order/orderContext";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/order-success/:orderId",
    element: <OrderSuccess />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CartProvider>
      <OrderProvider>
        <RouterProvider router={router} />
      </OrderProvider>
    </CartProvider>
    <ToastContainer position="top-left" />
  </React.StrictMode>
);
