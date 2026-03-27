import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import HeaderMain from "./Header/HeaderMain";
import About from "./About/About";
import Hero from "./Hero/Hero";
import FooterMain from "./Footer/Footer";

const MainScreen = () => {
  return (
    <>
      <Layout>
        <Header className="header p-0">
          <HeaderMain />
        </Header>
        <Content>
          <Hero />
          <About />
        </Content>
        <Footer className="footer p-0">
          <FooterMain />
        </Footer>
      </Layout>
    </>
  );
};

export default MainScreen;
