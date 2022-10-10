import 'antd/dist/antd.css'
import { Layout, Col, Row} from 'antd';
const { Footer } = Layout;
const BWFooter = ()=> {
  return( 
    <Footer id='footer'>
      <Row justify="space-around" align="middle">
        <Col span={6}>
        © 2022 BeWater. All Rights Reserved.
        </Col>
        <Col span={6} offset={12} align="right" style={{color:"#040000", opacity: "30%"}}>
          <img src="/discord.svg" style={{height:"20px"}}/>
          <img src="/twitter.svg" style={{height:"20px"}}/>
        </Col>
      </Row>
    </Footer>
  )
}

export default BWFooter
