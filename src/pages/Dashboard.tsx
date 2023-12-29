import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Button, Layout, Menu, theme } from "antd";
import { MenuOutlined, LogoutOutlined } from "@ant-design/icons";
import { BsPostcard } from "react-icons/bs";
import { FaRegCalendarCheck } from "react-icons/fa";
import { LuMenuSquare } from "react-icons/lu";
import Post from "./Post";
import { HStack, Image, Text } from "@chakra-ui/react";
import Logo from "../assets/Logo.png";
import Requests from "./Requests";

const { Header, Sider, Content } = Layout;

const Dashboard: React.FC = () => {
  document.title = "Dashboard";
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider style={{ height: "100vh" }} collapsed={collapsed}>
        <div
          style={{
            height: "64px",
            color: "white",
            fontSize: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {collapsed ? <LuMenuSquare /> : <Text>Menu</Text>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <BsPostcard />,
              label: "Post",
              onClick: () => navigate("post"),
            },
            {
              key: "2",
              icon: <FaRegCalendarCheck />,
              label: "Requests",
              onClick: () => navigate("requests"),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            backgroundColor: colorBgContainer,
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
              padding: "0 8px",
            }}
          >
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 40,
                height: 40,
              }}
              className="d-flex align-items-center justify-content-center"
            />
            <HStack w="full">
              <Image src={Logo} width={50} objectFit={"contain"} />
              <Text fontWeight="bold" fontSize="20px">
                Saylani Mass IT Training
              </Text>
            </HStack>
            <Button
              type="text"
              icon={<LogoutOutlined />}
              // onClick={logOut}
              style={{
                fontSize: "16px",
                width: 40,
                height: 40,
              }}
              className="d-flex align-items-center justify-content-center"
            />
          </div>
        </Header>
        <Content
          style={{
            minHeight: "90vh",
            background: colorBgContainer,
          }}
        >
          <Routes>
            <Route path="/" element={<Post />} />
            <Route path="post" element={<Post />} />
            <Route path="requests" element={<Requests />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
