import React, { Component } from 'react';
import { Select, Button } from 'antd';
import { fontSizeList } from '../constants';
import { ColorPicker } from '../components';
import {
  FontColorsOutlined,
  BgColorsOutlined,
  StrikethroughOutlined,
  LinkOutlined,
  ItalicOutlined, BoldOutlined
} from "@ant-design/icons";

class FontGroup extends Component {
  state = {
    FontSize: this.props.minder.queryCommandValue('FontSize'),
  };
  componentWillReceiveProps(nextProps) {
    this.setState({ FontSize: nextProps.minder.queryCommandValue('FontSize') || '' });
  }
  onChange = (action, value) => {
    const { minder } = this.props;
    if (minder.queryCommandState(action) !== -1) {
      minder.execCommand(action, value);
      this.setState({ [action]: value });
    }
  };
  render() {
    const { minder, isLock } = this.props;
    const { FontSize = '' } = this.state;
    let disabled = minder.getSelectedNodes().length === 0;
    if (isLock) disabled = true;
    const commonStyle = { size: 'small', disabled };
    return (
      <div className="nodes-actions" style={{ width: 156 }}>
        <div>
          <Select
            {...commonStyle}
            value={FontSize || ''}
            onChange={(value) => this.onChange('FontSize', value)}
            dropdownMatchSelectWidth={false}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
          >
            <Select.Option value="">字号</Select.Option>
            {fontSizeList &&
              fontSizeList.map((item) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
          </Select>
        </div>
        <div>
          <Button
            type="link"
            {...commonStyle}
            onClick={() => this.onChange('Bold', '')}
          ><BoldOutlined/></Button>
          <Button
            type="link"
            {...commonStyle}
            onClick={() => this.onChange('Italic', '')}
          ><ItalicOutlined/></Button>
          <Button
            type="link"
            {...commonStyle}
            onClick={() => this.onChange('del', '')}
          ><StrikethroughOutlined/></Button>
          <ColorPicker
            onChange={(color) => this.onChange('ForeColor', color)}
            {...this.props}
            button={{
              ...commonStyle,
              type: 'link',
            }}
            icon={FontColorsOutlined}
            action="ForeColor"
          />
          <ColorPicker
            onChange={(color) => this.onChange('Background', color)}
            {...this.props}
            button={{
              ...commonStyle,
              type: 'link',
            }}
            icon={BgColorsOutlined}
            action="Background"
          />
        </div>
      </div>
    );
  }
}
export default FontGroup;
