import React from 'react';
import { Modal, Form, Input, Radio, Upload, Button } from 'antd';
import {UploadOutlined} from "@ant-design/icons";

const ImageModal = (props) => {
  const defaultObj = props.minder.queryCommandValue('Image');
  const { getFieldValue, setFieldsValue } = props.form;
  const { baseUrl = '', uploadUrl = '' } = props;
  const [form] = Form.useForm();

  const onOk = () => {
    const { form, minder, onCancel } = props;
    form.validateFields((err, values) => {
      if (err) {
        console.log('Received values of form: ', values);
        return;
      }
      const params = { ...values };
      minder.execCommand('image', params.url, params.title);
      setTimeout(() => {
        onCancel();
      }, 300);
    });
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    if (e) {
      const fileList = e.file.status === 'removed' ? [] : [e.file];
      return e && fileList;
    }
  };
  const onImageChange = (e) => {
    if (e.file.status === 'done') {
      const { response = {} } = e.file;
      setFieldsValue({ url: response.data ? response.data[0].url : '' });
    }
  };
  const onTypeChange = (value) => {
    if (value === 'upload') {
      <Form.Item name="url"></Form.Item>
    }
    return value;
  };

  return (
    <Form name="image" form={form}>
      <Modal
          title="图片"
          className="agiletc-modal"
          open={props.visible}
          onOk={onOk}
          onCancel={props.onCancel}
      >
        <Form layout="vertical">
          <Form.Item name="type" initialValue="out" normalize={onTypeChange}>
            <Radio.Group>
              <Radio.Button value="out">外链图片</Radio.Button>
              <Radio.Button value="upload">上传图片</Radio.Button>
            </Radio.Group>
          </Form.Item>
          {getFieldValue('type') === 'out' ? (
              <Form.Item label="图片地址"  rule={[
                {
                  required: true,
                  message: '必填：以 http(s):// 或 ftp:// 开头',
                },
              ]} initialValue={defaultObj.url}>
                <Input placeholder="必填：以 http(s):// 或 ftp:// 开头" />
              </Form.Item>
          ) : (
              <Form.Item label="上传图片" name="upload" normalize={normFile} rules={[{ required: true, message: '请上传图片！' }]} valuePropName="fileList">
                <Upload
                    action={baseUrl + uploadUrl}
                    listType="picture"
                    accept="image/*"
                    withCredentials
                    onChange={onImageChange}
                >
                  <Button>
                    <UploadOutlined /> 点击上传
                  </Button>
                </Upload>
              </Form.Item>
          )}

          <Form.Item label="提示文本" name="title" initialValue={defaultObj.title}>
            <Input placeholder="选填：鼠标在图片上悬停时提示的文本" />
          </Form.Item>
        </Form>
      </Modal>
    </Form>
  );
};
export default ImageModal;
