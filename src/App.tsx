import React, { useState } from 'react';
import {
  CalculatorOutlined,
  ClockCircleOutlined,
  FormOutlined,
  PushpinOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import TitleHeader from './components/TitleHeader';
import {ParagonContext, ParagonContextData} from "./contexts/paragonContext";
import ParagonSelector from './components/tools/ParagonSelector';
import ParagonLevelCalculator from './components/tools/ParagonLevelCalculator';
import ParagonDamageCalculator from './components/tools/ParagonDamageCalculator';
import LegacyParagonDegreeCalculator from './components/tools/LegacyParagonDegreeCalculator';
import FooterAttribution from './components/FooterAttribution';


const { Header, Content, Footer, Sider } = Layout;


type MenuItem = Required<MenuProps>['items'][number];


function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}


const items: MenuItem[] = [
  getItem('Paragon Selector', '1', <FormOutlined />),
  getItem('Degree Calculator', '2', <CalculatorOutlined />),
  getItem('Damage Calculator', '3', <PushpinOutlined />),
  getItem('Legacy Calculator', '4', <ClockCircleOutlined />),
];


const toolNodes: Record<string, React.ReactNode> = {
  '1': <ParagonSelector/>,
  '2': <ParagonLevelCalculator/>,
  '3': <ParagonDamageCalculator/>,
  '4': <LegacyParagonDegreeCalculator/>,
};


function App() {

  const [collapsed, setCollapsed] = useState(false);
  const [selectedNode, setSelectedNode] = useState('1');
  const [paragonContextData, setParagonContextData] = useState(new ParagonContextData());
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const currentNode = toolNodes[selectedNode];

  return (
    <ParagonContext value={{
            paragonContextData,
            setParagonContextData,
    }}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="p-6">
            <img src="https://www.bloonswiki.com/images/8/8b/BTD6_tutorial_ParagonIcon.png" alt="BTD6 Paragon Icon" />
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onSelect={(value) => setSelectedNode(value.key)}/>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, height: 'auto', background: colorBgContainer }}>
            <TitleHeader/>
          </Header>
          <Content style={{ margin: '0 16px', padding: '24px 0', display: 'flex' }}>
            <div style={{
              padding: 24,
              width: '100vw',
              flexGrow: 1,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}>
              {currentNode}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <FooterAttribution/>
          </Footer>
        </Layout>
      </Layout>
    </ParagonContext>
  )
}

export default App
