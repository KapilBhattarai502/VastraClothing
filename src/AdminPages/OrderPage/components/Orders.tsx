import React, { useState } from 'react';
import { OrderStatusBadge } from '../components/OrderStatusBadge';
import { OrderDetailsModal } from '../components/OrderDetailsModal';
import { StatusChangeDropdown } from '../components/StatusChangeDropdown';
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import { useGetAllOrder } from '../../../hooks/Get/useGetAllOrder';
import moment from "moment"



// Mock data for demonstration


const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const {data:orders}=useGetAllOrder()


 

  // Calculate total sales
  const totalSales =orders?.filter(order => order.status !== 'cancelled').reduce((sum, order) => sum + order?.totalPrice, 0);

  // Filter orders based on search and status
//   const filteredOrders = orders?.filter(order => {
//     const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          order.email.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const handleStatusChange = (orderId, newStatus) => {
//     setOrders(prevOrders =>
//       prevOrders.map(order =>
//         order.id === orderId ? { ...order, status: newStatus } : order
//       )
//     );
//   };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders Management</h1>
              <p className="text-gray-600">Manage and track all customer orders</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center space-x-2">
                  <CurrencyRupeeIcon className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Total Sales</p>
                    <p className="text-2xl font-bold text-green-600">Rs {totalSales?.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center space-x-2">
                  <LocalShippingIcon className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-blue-600">{orders?.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <FilterAltIcon className="w-4 h-4 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Showing {orders?.length} of {orders?.length} orders
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delivery Address
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders?.map((order:any) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order._id}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <CalendarMonthIcon className="w-3 h-3 mr-1" />
                          {moment(order?.orderDate).format('MMMM Do YYYY')}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order?.user?.firstName} {order?.user?.lastName}</div>
                        <div className="text-sm text-gray-500">{order?.user?.email}</div>
                        <div className="text-sm text-gray-500">{order.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-2">
                        <PlaceIcon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-gray-900">
                          <div>{order.address.street}</div>
                          <div>{order.address.city}, {order.address.state} {order.address.zipCode}</div>
                          <div>{order.address.streetAddress}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">Rs {order.totalDisountedPrice?.toFixed(2)}</div>
                      <div className="text-sm text-gray-500">{order.orderItems?.length} items</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <OrderStatusBadge status={order?.orderStatus} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2 relative">
                        
                        <StatusChangeDropdown
                          currentStatus={order?.orderStatus}
                          onStatusChange={(newStatus) => handleStatusChange(order.id, newStatus)}
                        />
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {orders?.length === 0 && (
            <div className="text-center py-12">
              <LocalShippingIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Orders;