import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import HeaderMain from "./Header/HeaderMain";
import About from "./About/About";
import Hero from "./Hero/Hero";

const MainScreen = () => {
  return (
    <>
      <Layout>
        <Header className="header">
          <HeaderMain />
        </Header>
        <Content>
          <Hero />
          <About />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
};

export default MainScreen;
