import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/app/Header";
import Sider from "./components/app/Sider";
import AppRouter from "./Router";
import Modals from "./components/modals";

const { Content } = Layout;

class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout className="base-container">
          <Modals />
          <Header />
          <Layout style={{ width: "1024px", margin: "auto" }}>
            <Sider />
            <Layout style={{ padding: "0 24px 24px", overflow: "hidden" }}>
              <Content
                id="root-container"
                style={{
                  background: "#fff",
                  padding: 24,
                  margin: 0,
                  overflow: "auto"
                }}
              >
                <AppRouter />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
