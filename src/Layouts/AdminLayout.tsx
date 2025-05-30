import React, { useState } from "react";
import {
  DesktopOutlined,
  PieChartOutlined,
  
} from "@ant-design/icons";
import type { MenuProps} from "antd";

import {Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { PlusOneOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Input } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Admin", "dashboard", <PieChartOutlined />),
  getItem("View Products", "viewproducts", <DesktopOutlined />),
  getItem("AddProduct", "addproduct", <PlusOneOutlined />),
  getItem("Orders", "orders", <PlusOneOutlined />),
  getItem("Logout", "logout", <PieChartOutlined />),

 
];

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const { Search } = Input;
  const {isSearchRequired}=useSelector((state:any)=>state.searchRequired)
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  const onMenuClick: MenuProps["onClick"] = (e) => {
    navigate(`/admin/${e.key}`); // Navigates to /admin/<key>
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={200}
        style={{ position: "fixed", height: "100vh", left: 0 }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={onMenuClick}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "margin-left 0.2s",
        }}
      >
        <Header style={{
            margin: "16px",
            padding: "12px",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }} >
            {isSearchRequired ?  <Search placeholder="Search here..." enterButton="Search" size="large"  /> : null}
      
          </Header>
        <Content
          style={{
            margin: "16px",
            padding: "12px",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
         

          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
