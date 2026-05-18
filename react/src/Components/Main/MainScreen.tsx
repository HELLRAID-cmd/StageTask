import { Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import HeaderMain from "./Header/HeaderMain";
import About from "./About/About";
import Hero from "./Hero/Hero";
import FooterMain from "./Footer/Footer";

const MainScreen = () => {
  return (
    <>
      <Layout>
        <HeaderMain />
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
