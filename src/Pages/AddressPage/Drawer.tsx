import React, { useState } from "react";
import {
  CloseOutlined,
  HomeOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import AddModal from "./AddModal";
import { useGetAddress } from "../../hooks/Get/useGetAddress";

const { Option } = Select;

const AddressDrawer: React.FC = ({ open, setOpen }: any) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const { data: userAddress } = useGetAddress();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const toggleAddModal = () => {
    setOpenAddModal((prev) => !prev);
  };

  return (
    <>
      <Drawer
        title="Shipping Address"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <p
              className=" text-sm text-blue-400 cursor-pointer"
              onClick={toggleAddModal}
            >
              Add New Address
            </p>
          </Space>
        }
      >
        {userAddress?.data?.userAddress.length > 0 ? (
          <div>
            {userAddress?.data?.userAddress?.map((address: any) => (
              <div className="border px-1 py-1 mb-4">
                <input type="radio" name="address" />
                <div key={address._id} className=" mb-4 pt-2 pb-6 px-2">
                  <div className="flex gap-3">
                    <p>{address.firstName} </p>
                    <p>{address?.lastName}</p>
                    <p>{address?.phoneNumber}</p>
                  </div>
                  <div className="flex gap-3 mt-1">
                    <span className=" bg-orange-400 px-2 rounded-lg ">
                      Home
                    </span>
                    <p>
                      {address.streetAddress},{address.city},{address?.state},
                      {address.zipCode}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex gap-2 justify-end">
              <Button icon={<CloseOutlined />}>Cancel</Button>
              <Button type="primary" icon={<UploadOutlined />}>
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-svh">
            <span className=" text-red-500">
              Please Create your address in order to deliver your order
            </span>
          </div>
        )}

        <AddModal isModalOpen={openAddModal} setIsModalOpen={setOpenAddModal} />
      </Drawer>
    </>
  );
};

export default AddressDrawer;
