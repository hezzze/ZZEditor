import {
  Descriptions,
  Divider,
  Form,
  Row,
  Space,
  Statistic,
  Typography,
} from 'antd';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Quest } from 'common/QuestModel';
import constants from 'renderer/shared/constants';
import util from 'renderer/shared/util';
import actionTypes from '../shared/actionTypes';

import MainContext from '../store/MainContext';
import ItemPage from '../shared/ItemPage';
import QuestForm from './forms/QuestForm';

const { Title } = Typography;

// reference: https://ant.design/components/page-header-cn/

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
    <Divider />
    <Row justify="start">
      <Space size="large">
        <Statistic
          title="任务线总时长（最短）"
          value={`${util.questTime(quest)} 分钟`}
        />
      </Space>
    </Row>
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
    return <QuestForm quest={quest} form={form} />;
  };

  return (
    <ItemPage
      itemType="任务线"
      renderContent={renderContent}
      renderForm={renderForm}
      onSave={onSave}
      getInitValues={(quest) => quest}
      onDelete={onDelete}
    />
  );
};

export default QuestPage;
