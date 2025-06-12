
import React from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { OrderStatusBadge } from './OrderStatusBadge';
import CloseIcon from '@mui/icons-material/Close';
import PlaceIcon from '@mui/icons-material/Place';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import moment from "moment"


interface OrderDetailsModalProps {
  order: any;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ 
  order, 
  isOpen, 
  onClose 
}) => {
  if (!isOpen || !order) return null;
  console.log("order is",order)

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />

        <div className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Order Details</h3>
              <p className="text-sm text-gray-500">Order ID: #{order?._id}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Order Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                    <PersonIcon className="w-4 h-4 mr-2" />
                    Customer Information
                  </h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p className="font-medium">{order?.user?.firstName}{order?.user?.lastName}</p>
                    <p className="flex items-center">
                      <EmailIcon className="w-3 h-3 mr-1" />
                      {order?.user?.email}
                    </p>
                    <p className="flex items-center">
                      <LocalPhoneIcon className="w-3 h-3 mr-1" />
                      {order?.user?.mobile}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                    <CalendarMonthIcon className="w-4 h-4 mr-2" />
                    Order Information
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Order Date:</span>
                      <span className="text-gray-900">{moment(order?.orderDate).format('MMMM Do YYYY')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Status:</span>
                      <OrderStatusBadge status={order?.orderStatus} />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="text-gray-900 font-medium">Rs{order?.totalPrice?.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                  <PlaceIcon className="w-4 h-4 mr-2" />
                  Delivery Address
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
                  <p className="font-medium">{order.customer}</p>
                  <p>{order.address.street}</p>
                  <p>{order.address.city}, {order.address.state} {order.address.zipCode}</p>
                  <p>{order.address.country}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                <LocalShippingIcon className="w-4 h-4 mr-2" />
                Order Items ({order.orderItems?.length})
              </h4>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Item
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Size
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Color
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Price
                      </th>
                      
                      
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {order.orderItems?.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-gray-900">{item?.product?.title}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{item?.quantity}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{item?.size ? item?.size : "-"}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{item?.color ? item?.color : "-"}</td>

                        <td className="px-4 py-3 text-sm text-gray-600">Rs {item?.price?.toFixed(2)}</td>

                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          Rs {(item.quantity * item?.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={5} className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                        Total:
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900">
                        Rs {order?.totalPrice?.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};