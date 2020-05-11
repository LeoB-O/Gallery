/*
 * @Description:
 * @version: 1.0
 * @Author: Leo
 * @Date: 2020-05-09 21:41:45
 * @LastEditors: Leo
 * @LastEditTime: 2020-05-11 19:09:10
 */
import React, { useState } from "react";
import axios from "axios";
import Modal from "antd/es/modal";
import "antd/es/modal/style/css";
import Form from "antd/es/form";
import "antd/es/form/style/css";
import Input from "antd/es/input";
import "antd/es/input/style/css";
import Upload from "antd/es/upload";
import "antd/es/upload/style/css";
import Progress from "antd/es/progress";
import "antd/es/progress/style/css";
import Spin from "antd/es/spin";
import "antd/es/spin/style/css";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import "./addMedia.less";
import config from "../../config";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function AddMedia({ visible, onOk, onCancel } = { visible: true }) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [form] = Form.useForm();
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  function handleUpload() {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        let formData = new FormData();
        formData.append("title", values.title);
        formData.append("desc", values.desc);
        formData.append("file", imageFile);
        await axios.post(config.baseUrl, formData, {
          onUploadProgress: (progressEvent) => {
            let percentCompleted = Math.floor(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(percentCompleted);
            setProgress(percentCompleted);
            // do whatever you like with the percentage complete
            // maybe dispatch an action that will update a progress bar or something
          },
        });
        // await fetch(config.baseUrl, {
        //   method: "POST",
        //   body: formData,
        // });
        setLoading(false);
        onOk();
      })
      .catch(() => {});
  }

  return (
    <Spin spinning={loading}>
      <Modal
        title="新增照片/视频"
        visible={visible}
        onOk={handleUpload}
        onCancel={onCancel}
        // forceRender
      >
        <Form
          {...layout}
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入标题！" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="留言"
            name="desc"
            rules={[{ required: true, message: "请输入留言" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="图片/视频" required>
            <Upload
              name="file"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={(file) => {
                console.log(file);
                getBase64(file, (imageUrl) => {
                  setImageUrl(imageUrl);
                  +setImageFile(file);
                });
                return false;
              }}
            >
              {imageUrl ? (
                <div>
                  <img src={imageUrl} style={{ width: "100%" }} />
                  <video autoPlay src={imageUrl} style={{ width: "100%" }} />
                </div>
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
        </Form>
        <Progress percent={progress}></Progress>
      </Modal>
    </Spin>
  );
}

export default AddMedia;
