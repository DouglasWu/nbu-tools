import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'reactstrap';
import Canvas from './canvas';
import './App.css';

const examples = {
  river: ['淡水河', '頭前溪', '中港溪', '後龍溪', '大安溪',
          '大甲溪', '烏溪', '濁水溪', '北港溪', '朴子溪',
          '八掌溪', '急水溪', '曾文溪', '鹽水溪', '二仁溪',
          '阿公店溪', '高屏溪', '東港溪', '林邊溪', '四重溪',
          '蘭陽溪', '和平溪', '花蓮溪', '秀姑巒溪', '卑南溪'],
  dumai: ['後頂', '強間', '腦戶', '風府', '啞門',
          '大椎', '陶道', '身柱', '神道', '靈台',
          '至陽', '筋縮', '中樞', '脊中', '懸樞',
          '命門', '陽關', '腰俞', '長強', '',
          '', '', '', '', ''],
  pi: ['14159', '26535', '89793', '23846', '26433',
       '83279', '50288', '41971', '69399', '37510',
       '58209', '74944', '59230', '78164', '06286',
       '20899', '86280', '34825', '34211', '70679',
       '82148', '08651', '32823', '06647', '09384']
}

const NBU_ITEMS = 'nbu-items';
const NBU_TITLE = 'nbu-title';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.getLocalStorage(NBU_ITEMS)||Array(25).fill(''),
      title: this.getLocalStorage(NBU_TITLE)||''
    };
  }

  setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  example = (id, title) => {
    this.setState({items: examples[id], title});
    this.setLocalStorage(NBU_ITEMS, examples[id]);
    this.setLocalStorage(NBU_TITLE, title);
  }
  clearAll = () => {
    const items = Array(25).fill('');
    this.setState({ items, title:'' });
    this.setLocalStorage(NBU_ITEMS, items);
    this.setLocalStorage(NBU_TITLE, '');
  }
  download = () => {
    let link = document.createElement('a');
    link.href = this.refs.canvas.refs.canvas.toDataURL();
    link.download = `nbu_${new Date().getTime()}.png`;
    link.click();
  }
  changeItems = (idx, value) => {
    var arr = this.state.items.slice();
    arr.splice(idx, 1, value);
    this.setState({items: arr});
    this.setLocalStorage(NBU_ITEMS, arr);
  }
  changeTitle = (e) => {
    this.setState({title: e.target.value});
    this.setLocalStorage(NBU_TITLE, e.target.value);
  }

  renderInputs() {
    const arr = [1, 2, 3, 4, 5];
    return arr.map((num, i) => (
      <Col md={{size: 2, offset: num===1?1:0}} xs={{size: 10, offset: 1}} key={i}>
        {
          arr.map((e, j) => {
            const idx = (num-1)*5 + e - 1;
            return <Input
              key={j}
              className="item-input"
              placeholder={idx+1}
              value={this.state.items[idx]}
              onChange={e => this.changeItems(idx, e.target.value)}
            />
          })
        }
      </Col>
    ));
  }
  render() {
    return (
      <div className="app">
        <Row>
          <Col md={{size: 6, offset:1}} xs={{size: 10, offset:1}}>
            <Input
              className="item-input"
              placeholder="標題"
              value={this.state.title}
              onChange={this.changeTitle}
            />
          </Col>
        </Row>
        <Row>
          { this.renderInputs() }
        </Row>
        <Row style={{marginTop: '5px'}}>
          <Col md={{offset: 1}} xs={{size: 10, offset: 1}}>
            <Button onClick={()=>this.example('river', '台灣河流')} color="primary">台灣河流</Button>{' '}
            <Button onClick={()=>this.example('dumai', '督脈')} color="primary">督脈</Button>{' '}
            <Button onClick={()=>this.example('pi', '圓周率')} color="primary">圓周率</Button>{' '}
            <Button onClick={this.clearAll}>清空</Button>{' '}
            <Button onClick={this.download} color="success">下載電震圖</Button>
          </Col>
        </Row>
        <Row style={{marginTop: '15px'}}>
          <div className="canvas-wrapper">
            <Canvas
              items={this.state.items}
              title={this.state.title}
              ref="canvas"
            />
          </div>
        </Row>
      </div>
    );
  }
}

export default App;
