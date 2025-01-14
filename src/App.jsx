import React from "react";
import GlobalStyles from "./styles/GlobalStyles";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Mens from "./pages/Mens";
import Womens from "./pages/Womens";
import Wetsuits from "./pages/Wetsuits";
import Accounts from "./pages/Accounts";
import Logout from "./ui/Logout";
import AccountDetails from "./ui/AccountDetails";
import Addresses from "./ui/Addresses";
import Orders from "./ui/Orders";
import PasswordManager from "./ui/PasswordManager";
import ForgotPassword from "./ui/ForgotPassword";
import ResetPassword from "./ui/ResetPassword";
import OtpVerification from "./ui/OtpVerification";
import ProductPage from "./ui/ProductPage";
import CategoryPage from "./ui/CategoryPage";
import { AuthProvider } from "./context/AuthProvider";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/SuccessPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "mens",
        element: <Mens />,
      },
      {
        path: "womens",
        element: <Womens />,
      },
      {
        path: "wetsuits",
        element: <Wetsuits />,
      },
      {
        path: "product/:productId",
        element: <ProductPage />,
      },
      {
        path: ":category/:mainCategory",
        element: <CategoryPage />,
      },
      {
        path: "account",
        element: <Accounts />,
        children: [
          {
            index: true,
            element: <Navigate replace to="details" />,
          },
          {
            path: "details",
            element: <AccountDetails />,
          },
          {
            path: "addresses",
            element: <Addresses />,
          },
          {
            path: "changePassword",
            element: <PasswordManager />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "logout",
            element: <Logout />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/resetPassword/:token",
    element: <ResetPassword />,
  },
  {
    path: "/otpVerification",
    element: <OtpVerification />,
  },
  {
    path: "checkout",
    element: <Checkout />,
  },
  {
    path: "orderPlaced",
    element: <OrderSuccess />,
  },
]);

const queryClinet = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClinet}>
      <AuthProvider>
        <GlobalStyles />
        <RouterProvider router={router} />
        <Toaster position="top-center" reverseOrder="false" gutter={8} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
