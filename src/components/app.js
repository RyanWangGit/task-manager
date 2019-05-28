import React, { Component } from 'react';
import { Tabs, Icon, Table } from 'antd';
import ReactEcharts from 'echarts-for-react';
import './app.css';

function copy(o) {
  let output, v, key;
  output = Array.isArray(o) ? [] : {};
  for (key in o) {
    v = o[key];
    output[key] = (typeof v === "object") ? copy(v) : v;
  }
  return output;
}

const columns = [
  {
    title: 'Process',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'PID',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'CPU',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Memory',
    dataIndex: 'memory',
    key: 'memory',
  },
  {
    title: 'Disk',
    dataIndex: 'disk',
    key: 'disk',
  },
];


class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      option: {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          splitLine: {
            show: false
          },
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          }
        },
        series: [{
          data: Array.from({length: 60}, () => Math.floor(Math.random() * 100)),
          type: 'line',
          areaStyle: {},
          showSymbol: false,
          hoverAnimation: false,
        }]
      }
    };
  }

  componentDidMount() {
    setInterval(() => {
      console.log('updating');
      var option = copy(this.state.option);
      option.series[0].data.shift();
      option.series[0].data.push(Math.floor(Math.random() * 100));
      this.setState({
        option: option
      });
    }, 1000);
  }

  render() {
    console.log(this.state.option);
    let cpuChart = <ReactEcharts ref='echarts_react' option={this.state.option} />;
    let memoryChart = <ReactEcharts ref='echarts_react' option={this.state.option} />;
    return (
      <Tabs defaultActiveKey="1" size="small">
        <Tabs.TabPane
          tab={
            <span>
              <Icon type="switcher" />
              Processes
            </span>
          }
          key="1">
          <Table dataSource={[]} columns={columns} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <Icon type="rocket" />
              Performance
            </span>
          }
          key="2">
          <Tabs defaultActiveKey="1" tabPosition="left" size="large">
            <Tabs.TabPane tab="CPU" key="1"> {cpuChart} </Tabs.TabPane>
            <Tabs.TabPane tab="Memory" key="2"> {memoryChart}</Tabs.TabPane>
          </Tabs>
        </Tabs.TabPane>
      </Tabs>
    );
  }
}

export default App;
