import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Loginpage from "./Pages/Loginpage";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "./Layouts/AdminLayout";
import AdminDashboard from "./AdminPages/AdminDashboard";
import Viewproductpage from "./AdminPages/Viewproductpage";
import Createproduct from "./AdminPages/Createproduct";
import Logout from "./Pages/Logout";
import Registerpage from "./Pages/Registerpage";
import CustomerLayout from "./Layouts/CustomerLayout";
import MenFashion from "./Pages/MenFashion";
import CustomerProtectedRoute from "./CustomerProtectedRoute";
import ProductDetails from "./AdminPages/ProductDetails";
import CustomerProductDetails from "./Pages/CustomerProductDetails";
import Cart from "./Pages/Cart";
import AddressPage from "./Pages/AddressPage";
import OrderPage from "./Pages/OrderPage";
import EsewaErrorPage from "./components/e-sewaIntegration/pages/EsewaErrorPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
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
            <Route path="productpage/:id" element={<ProductDetails/>}/>
            <Route path="logout" element={<Logout />} />
          </Route>
          <Route
            path="clothes"
            element={
              <CustomerProtectedRoute>
                <CustomerLayout />
              </CustomerProtectedRoute>
            }
          >
            <Route index element={<Navigate to="men" replace />} />
            <Route path="men" element={<MenFashion />} />
            <Route path="productpage/:id" element={<CustomerProductDetails/>}/>
            <Route path="cart" element={<Cart/>}/>
            <Route path="address" element={<AddressPage/>}/>
            <Route path="order" element={<OrderPage/>}/>
            <Route path='esewa-error' element={<EsewaErrorPage/>}/>
          </Route>
          <Route path="/register" element={<Registerpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
