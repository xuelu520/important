import React from 'react';

import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Affix,
  BackTop,
  LocaleProvider
} from 'antd';


const {
  SubMenu
} = Menu;
const {
  Header,
  Content,
  Footer,
  Sider
} = Layout;

import {
  Router,
  Route,
  IndexRoute,
  IndexLink
} from 'react-router';

import zh_CN from 'antd/lib/locale-provider/zh_CN';

import "../theme/topNav/topNav.css";

export default class Main extends React.Component {

  constructor(props) {
    super(props);
  }

  topNavList() {

    var arr = [];
    var list = [{
      key: "1",
      value: "data",
      cnName: "渠道数据",
      url: "/data"
    }, {
      key: "2",
      value: "manager",
      cnName: "渠道管理",
      url: "/manager"
    }, {
      key: "3",
      value: "sys",
      cnName: "系统管理",
      url: "/sys"
    }, {
      key: "4",
      value: "user",
      cnName: "用户管理",
      url: "/user"
    }];

    var winArr = window.userInfo.data.auth.split(",");

    winArr.map((v, k) => {
      list.map((av, ak) => {
        if (v == av.key) {
          arr.push(<Menu.Item key={av.value}>
              <IndexLink to={av.url} activeClassName="active">{av.cnName}</IndexLink>
            </Menu.Item>)
        }
      });
    });

    return arr;
  }

  clickLogout() {
    window.location.href = "/logout.do";
  }

  render() {

    var topNavList = this.topNavList();


    return (<LocaleProvider locale={zh_CN}>
      <Layout style={{position: "relative"}}>
     <Affix style={{position: "fixed", width:"100%",zIndex: 3, height: 60}}>
    <Header className="header" id="components-layout-demo-top-side" >
{/*<Affix style={{   width:"100%",zIndex: 1, height: 60}}>*/}
      <div className="logo" />
       
      <Menu
        theme="dark"
        mode="horizontal"
         selectedKeys={this.props.location.pathname.split("/")}
        style={{ lineHeight: '60px' }}
      >
        {topNavList}
      </Menu>
    
      <div className="header-user">
            <span className="userName">{window.userInfo.data.name}</span> | <a href="javascript:void(0);" onClick={this.clickLogout.bind(this)} className="logout">退出</a>
      </div>
        {/*</Affix>*/}
    </Header>
     </Affix>
    {this.props.children}
    <BackTop>
      <div className="ant-back-top-inner"><Icon type="arrow-up" /></div>
    </BackTop>
    {/*<Footer style={{backgroundColor:'white'}}>footer</Footer>*/}
  </Layout>
  </LocaleProvider>);
  }
}