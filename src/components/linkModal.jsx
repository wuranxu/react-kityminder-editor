import React from 'react';
import {Form, Input, Modal} from 'antd';

const LinkModal = (props) => {
    const [form] = Form.useForm()
    const onOk = async () => {
        const {minder, onCancel} = props;
        const values = await form.validateFields()
        const params = {...values};
        minder.execCommand('HyperLink', params.url, params.title);
        onCancel();
    };
    const defaultObj = props.minder.queryCommandValue('HyperLink');
    return (
        <Form name="link" form={form}>
            <Modal
                title="链接"
                className="agiletc-modal"
                open={props.visible}
                onOk={onOk}
                onCancel={props.onCancel}
            >
                <Form layout="vertical">
                    <Form.Item label="链接地址" name="url" rules={[
                        {
                            required: true,
                            message: '必填：以 http(s):// 或 ftp:// 开头',
                        },
                    ]} initialValue={defaultObj.url}>
                        <Input placeholder="必填：以 http(s):// 或 ftp:// 开头"/>
                    </Form.Item>
                    <Form.Item label="提示文本" name="title" initialValue={defaultObj.title}>
                        <Input placeholder="选填：鼠标在链接上悬停时提示的文本"/>
                    </Form.Item>
                </Form>
            </Modal>
        </Form>
    );
};
export default LinkModal;
