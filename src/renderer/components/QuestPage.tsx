import { Descriptions, Form, Input, Select, Typography } from 'antd';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Quest } from 'common/QuestModel';
import constants from 'renderer/shared/constants';
import actionTypes from '../shared/actionTypes';

import MainContext from '../shared/MainContext';
import ItemPage from '../shared/ItemPage';

const { Title } = Typography;

// reference: https://ant.design/components/page-header-cn/

const { Option } = Select;

const renderContent = (quest: Quest, column = 2) => (
  <>
    <Title type="secondary" level={5}>
      基本信息
    </Title>
    <Descriptions size="small" column={column}>
      <Descriptions.Item label="难度">
        {constants.QUEST_DIFFICULTY[quest.difficulty]}
      </Descriptions.Item>
    </Descriptions>
  </>
);

const QuestPage = () => {
  const { dispatch } = useContext(MainContext);
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onSave = (quest: Quest) => {
    dispatch({
      type: actionTypes.UPDATE_QUEST,
      value: { ...quest, ...form.getFieldsValue() },
    });

    console.log('updating Quest with...', form.getFieldsValue());
  };

  const onDelete = (quest: Quest) => {
    dispatch({
      type: actionTypes.DELETE_QUEST,
      value: quest.key,
    });
    navigate('/');
  };

  const renderForm = (quest: Quest) => {
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
            <Option value="low">{constants.QUEST_DIFFICULTY.low}</Option>
            <Option value="medium">{constants.QUEST_DIFFICULTY.medium}</Option>
            <Option value="high">{constants.QUEST_DIFFICULTY.high}</Option>
          </Select>
        </Form.Item>
      </Form>
    );
  };

  return (
    <ItemPage
      renderContent={renderContent}
      renderForm={renderForm}
      onSave={onSave}
      getInitValues={(quest) => quest}
      onDelete={onDelete}
    />
  );
};

export default QuestPage;
