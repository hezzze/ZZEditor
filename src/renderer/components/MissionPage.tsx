import {
  Col,
  Descriptions,
  Divider,
  Form,
  Row,
  Space,
  Statistic,
  Typography,
} from 'antd';
import { useContext } from 'react';
import { Mission } from 'common/QuestModel';
import { useNavigate, useParams } from 'react-router-dom';
import ItemPage from 'renderer/shared/ItemPage';
import util from 'renderer/shared/util';

import actionTypes from '../shared/actionTypes';

import MainContext from '../store/MainContext';
import MissionForm from './forms/MissionForm';
import TaskMap from './TaskMap';

const { Title } = Typography;

// reference: https://ant.design/components/page-header-cn/

const MissionPage = () => {
  const { dispatch } = useContext(MainContext);
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onSave = (mission: Mission) => {
    dispatch({
      type: actionTypes.UPDATE_MISSON,
      value: { ...mission, ...form.getFieldsValue() },
    });

    console.log('updating Mission with...', form.getFieldsValue());
  };

  const onDelete = (mission: Mission) => {
    dispatch({
      type: actionTypes.DELETE_MISSION,
      value: mission.key,
    });
    navigate('/');
  };

  const renderForm = (mission: Mission) => {
    return <MissionForm mission={mission} form={form} />;
  };

  const renderContent = (mission: Mission) => (
    <>
      <Row>
        <Col span={8}>
          <Title type="secondary" level={5}>
            基本信息
          </Title>
          <Descriptions size="small" column={1}>
            <Descriptions.Item label="任务区域">
              {mission.region}
            </Descriptions.Item>
            <Descriptions.Item label="描述">
              {mission.description}
            </Descriptions.Item>
          </Descriptions>
          <Divider />
          <Row justify="start">
            <Space size="large">
              <Statistic
                title="任务总时长（最短）"
                value={`${util.missionTime(mission)} 分钟`}
              />
            </Space>
          </Row>
        </Col>
        <Col span={16}>
          <TaskMap mission={mission} />
        </Col>
      </Row>
    </>
  );

  return (
    <ItemPage
      itemType="任务"
      renderContent={renderContent}
      renderForm={renderForm}
      onSave={onSave}
      getInitValues={(mission: Mission) => mission}
      onDelete={onDelete}
    />
  );
};

export default MissionPage;
