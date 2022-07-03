import { Layout } from "antd";
import React, { useRef } from "react";

const { Header, Footer, Sider, Content } = Layout;

export const TradingView: React.FC = () => {
  const layoutRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Layout ref={layoutRef}>
        <Header>Trading View Test</Header>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: "80vh",
          }}
        ></Content>
        <Footer>right@babybot</Footer>
      </Layout>
    </>
  );
};
