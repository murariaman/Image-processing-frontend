import React, {useState} from 'react';
import { Layout, Row, Col } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import Navbar from '../components/Navbar';
import imageUpload from '../assets/imageUpload.svg';
import webSearchImage from '../assets/webSearchImage.svg';
import drawImage from '../assets/drawImage.svg';
import './styles/HomeContentStyle.css';

const { Header, Sider, Content } = Layout;

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
}

export const HomeContent = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
    }

    return(
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: windowDimensions.height }}>
                <div className="logo" />
                <Navbar />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'styles',
                    onClick: toggleCollapsed,
                    })}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    }}
                    >
                    <div>
                        <Row>
                            <Col span={24}>
                                <h2 className="featureHeading">Our Features</h2>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '2%' }}>
                            <Col span={8}>
                                <img src={webSearchImage} className="featureImage" alt="Features Image 1" />
                                <div className="featuresDescriptionFirst">
                                    <p>Search Image from Web</p>
                                </div>
                            </Col>
                            <Col span={8}>
                                <img src={drawImage} className="featureImage" alt="Features Image 2" />
                                <div className="featuresDescription">
                                    <p>Draw your own Image</p>
                                </div>
                            </Col>
                            <Col span={8}>
                                <img src={imageUpload} className="featureImage" alt="Features Image 3" />
                                <div className="featuresDescription">
                                    <p>Upload Image and Customize</p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}