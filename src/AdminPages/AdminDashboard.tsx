import { Link } from "react-router-dom";
import BarChartIcon from "@mui/icons-material/BarChart";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useState } from "react";
import { Breadcrumb } from "antd";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(() => localStorage.getItem("currentUser"));
  return (
    <>
    <Breadcrumb
            style={{ marginBottom: "16px" }}
            items={[{ title: "Vaidik" }, { title: "Dashboard" }]}
          />

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Manage your business operations with ease
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Link
            to="/admin/orders"
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center group"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
              <LocalShippingIcon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Orders</h3>
            <p className="text-gray-600 text-sm">
              Manage customer orders and track deliveries
            </p>
          </Link>

          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center group cursor-pointer">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
              <BarChartIcon className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Analytics
            </h3>
            <p className="text-gray-600 text-sm">
              View sales reports and business insights
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center group cursor-pointer">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
              <GroupIcon className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Customers
            </h3>
            <p className="text-gray-600 text-sm">
              Manage customer information and support
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center group cursor-pointer">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
              <SettingsIcon className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Settings
            </h3>
            <p className="text-gray-600 text-sm">
              Configure system settings and preferences
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to Your Admin Panel
            </h2>
            <p className="text-gray-600 mb-6">
              Get started by exploring the orders management system. Track
              sales, manage deliveries, and keep your customers happy with
              efficient order processing.
            </p>
            <Link
              to="/admin/orders"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <LocalShippingIcon className="w-5 h-5 mr-2" />
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminDashboard;
