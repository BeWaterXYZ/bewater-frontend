import 'antd/dist/antd.css'
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
const { Header } = Layout;
const items = [
  {
    label: 'Challenges',
    key: 'challenges'
  },
  {
    label: 'Showcase',
    key: 'showcase'
  },
  {
    label: 'Docs',
    key: 'docs'
  }
];
const BWHeader = ()=> {
  const [current, setCurrent] = useState('challenges');

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return(
    <Header id="header" style={{ position: 'fixed', zIndex: 1, width: '100%',background: 'white'}} >
          <div id="logo">
            <img src="/Logo.svg" layout='fill'/>
          </div>
          
          <Menu
            id="menu"
            theme="light"
            mode="horizontal"
            items= { items }
            onClick={onClick}
            selectedKeys={[current]}
            style={{minWidth: "400px", flex: "auto"}}
          />
          <div id="avatar" style={{width: '140px'}}/>
    </Header>
  )
}

export default BWHeader
