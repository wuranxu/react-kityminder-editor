import React, {Component} from 'react';
import {Button} from 'antd';
import {ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";

class DoMove extends Component {
    doMove = (action) => {
        let {minder} = this.props;
        minder.execCommand(action);
        // minder.fire('contentchange');
    };

    render() {
        const {minder, isLock} = this.props;
        let disabled = minder.getSelectedNodes().length === 0;
        if (isLock) disabled = true;
        return (
            <div className="nodes-actions" style={{width: 64}}>
                <Button
                    type="link"
                    size="small"
                    disabled={disabled}
                    onClick={() => this.doMove('ArrangeUp')}
                >
                    <ArrowUpOutlined/>
                    上移
                </Button>
                <Button
                    type="link"
                    size="small"
                    disabled={disabled}
                    onClick={() => this.doMove('ArrangeDown')}
                >
                    <ArrowDownOutlined/>
                    下移
                </Button>
            </div>
        );
    }
}

export default DoMove;
