import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Loginpage from "./Pages/Loginpage";
import ProtectedRoute from "./RouteProtection/ProtectedRoute";
import AdminLayout from "./Layouts/AdminLayout";
import AdminDashboard from "./AdminPages/AdminDashboard";
import Viewproductpage from "./AdminPages/Viewproductpage";
import Createproduct from "./AdminPages/Createproduct";
import Logout from "./Pages/Logout";
import Registerpage from "./Pages/Registerpage";
import CustomerLayout from "./Layouts/CustomerLayout";
import MenFashion from "./Pages/MenFashion";
import CustomerProtectedRoute from "./RouteProtection/CustomerProtectedRoute";
import ProductDetails from "./AdminPages/ProductDetails";
import CustomerProductDetails from "./Pages/CustomerProductDetails";
import Cart from "./Pages/Cart";
import AddressPage from "./Pages/AddressPage/AddressPage";
import EsewaErrorPage from "./components/e-sewaIntegration/pages/EsewaErrorPage";
import Bratabandha from "./Pages/Bratabandha";
import EsewaProtectedRoute from "./RouteProtection/EsewaProtectedRoute";
import EsewaSuccesPage from "./components/e-sewaIntegration/pages/EsewaSuccesPage";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
import UserOrderPage from "./Pages/OrderPage/UserOrderPage";
import StorePage from "./Pages/StorePage/StorePage";
import FunctionPage from "./Pages/FunctionPage/FunctionPage";
import LandingPage from "./Pages/LandingPage/index";
import AddProperties from "./AdminPages/AddProperties";
import OrderPage from "./AdminPages/OrderPage/OrderPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="vaidik/landingpage"/>} />
          <Route path="/login" element={<Loginpage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="viewproducts" element={<Viewproductpage />} />
            <Route path="addproduct" element={<Createproduct />} />
            <Route path="addproperties" element={<AddProperties />} />
            <Route path="orders" element={<OrderPage />} />
            <Route path="productpage/:id" element={<ProductDetails />} />
            <Route path="logout" element={<Logout />} />
          </Route>

          <Route
            path="vaidik"
            element={
              <CustomerProtectedRoute>
                <CustomerLayout />
              </CustomerProtectedRoute>
            }
          >
            <Route index element={<Navigate to="landingpage" replace />} />
            <Route path="landingpage" element={<LandingPage />} />
            <Route path="kurtha" element={<MenFashion />} />

            <Route path="payment" element={<PaymentPage />} />
            <Route
              path="productpage/:id"
              element={<CustomerProductDetails />}
            />
            <Route path="cart" element={<Cart />} />
            <Route path="address" element={<AddressPage />} />
            <Route path="order" element={<OrderPage />} />
            <Route path="user/orders" element={<UserOrderPage />} />
            <Route path="store" element={<StorePage />} />
            <Route path="functions" element={<FunctionPage />} />
          </Route>
          {/* <Route path="esewa" element={
            <EsewaProtectedRoute>
            </EsewaProtectedRoute>
          }> */}
          {/* <Route index element={<Navigate to="success" replace/>}/> */}
          <Route path="esewa/success" element={<EsewaSuccesPage />} />
          <Route path="esewa/error" element={<EsewaErrorPage />} />
          {/* </Route> */}
          <Route path="/register" element={<Registerpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
