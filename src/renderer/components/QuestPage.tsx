import { useParams } from 'react-router-dom';

import {
  Button,
  Descriptions,
  Drawer,
  DrawerProps,
  Form,
  Input,
  PageHeader,
  Select,
  Space,
  Statistic,
  Tabs,
} from 'antd';
import React, { useContext, useState } from 'react';
import { Quest } from 'common/QuestModel';
import actionTypes from '../shared/actionTypes';

import MainContext from '../shared/MainContext';
import util from '../shared/util';

// reference: https://ant.design/components/page-header-cn/

const { Option } = Select;

const renderContent = (quest: Quest, column = 2) => (
  <Descriptions size="small" column={column}>
    <Descriptions.Item label="难度">
      {util.getDisplayText(quest.difficulty)}
    </Descriptions.Item>
    <Descriptions.Item label="Association">
      <a>421421</a>
    </Descriptions.Item>
    <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
    <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
    <Descriptions.Item label="Remarks">
      Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
    </Descriptions.Item>
  </Descriptions>
);

const extraContent = (
  <div
    style={{
      display: 'flex',
      width: 'max-content',
      justifyContent: 'flex-end',
    }}
  >
    <Statistic
      title="Status"
      value="Pending"
      style={{
        marginRight: 32,
      }}
    />
    <Statistic title="Price" prefix="$" value={568.08} />
  </div>
);

const Content: React.FC<{
  children: React.ReactNode;
  extra: React.ReactNode;
}> = ({ children, extra }) => (
  <div className="content">
    <div className="main">{children}</div>
    <div className="extra">{extra}</div>
  </div>
);

const QuestPage = () => {
  const params = useParams();
  const { state, dispatch } = useContext(MainContext);

  const quest = util.findNode(state.questData, params.qid!) as Quest;

  // return <div>{`Quest ${params.qid}`}</div>;

  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSave = () => {
    dispatch({
      type: actionTypes.UPDATE_QUEST,
      value: { ...quest, ...form.getFieldsValue() },
    });

    console.log('updating Quest with...', form.getFieldsValue());
    setOpen(false);
  };

  const renderForm = () => {
    return (
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={quest}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="名称"
          name="title"
          rules={[{ required: true, message: '请输入名称' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="difficulty" label="难度" rules={[{ required: true }]}>
          <Select placeholder="选择难度" allowClear>
            <Option value="low">低</Option>
            <Option value="medium">中</Option>
            <Option value="high">高</Option>
          </Select>
        </Form.Item>
      </Form>
    );
  };

  return (
    <PageHeader
      className="site-page-header-responsive"
      onBack={() => window.history.back()}
      title={quest.title}
      subTitle="This is a subtitle"
      extra={[
        <Button key="1" type="primary" onClick={showDrawer}>
          编辑
        </Button>,
      ]}
    >
      <Content extra={extraContent}>
        <>
          {renderContent(quest)}
          <Drawer
            title={`编辑 ${quest.title} ${quest.key} 基本信息`}
            placement="bottom"
            width={500}
            onClose={onClose}
            open={open}
            extra={
              <Space>
                <Button onClick={onClose}>取消</Button>
                <Button type="primary" onClick={onSave}>
                  保存
                </Button>
              </Space>
            }
          >
            {renderForm()}
          </Drawer>
        </>
      </Content>
    </PageHeader>
  );
};

export default QuestPage;
