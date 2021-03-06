import React from 'react';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

export default function AppHeader() {
  return (
    <Header className="header">
      <div style={{ width: '1024px', margin: 'auto' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </div>
    </Header>
  );
}
