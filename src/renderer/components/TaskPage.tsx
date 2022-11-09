import {
  Descriptions,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Statistic,
  Typography,
} from 'antd';
import { useContext } from 'react';
import { Task } from 'common/QuestModel';
import constants from 'renderer/shared/constants';
import { useNavigate } from 'react-router-dom';
import util from 'renderer/shared/util';

import actionTypes from '../shared/actionTypes';
import ItemPage from '../shared/ItemPage';
import MainContext from '../store/MainContext';
import TaskForm from './forms/TaskForm';

const { Title } = Typography;

// reference: https://ant.design/components/page-header-cn/

const renderContent = (task: Task, column = 2) => {
  const point = constants.POINTS[task.pointKey];
  const region = util.getTaskRegion(task);

  return (
    <>
      <Title type="secondary" level={5}>
        基本信息
      </Title>
      <Descriptions size="small" column={column}>
        <Descriptions.Item label="描述">{task.description}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <Space direction="vertical" size="middle">
        <Row justify="start">
          <Space size="large">
            <Statistic
              title="类型"
              value={constants.POINT_TYPES[point.type] || '未定义'}
            />
            <Statistic title="所属区域" value={region?.title} />
            <Statistic title="任务点" value={point.short_desc} />
          </Space>
        </Row>
        <Row justify="start">
          <Space size="large">
            <Statistic
              title="最短使用时长"
              value={`${point.min_duration} 分钟`}
            />
            <Statistic
              title="单次最多体验人数"
              value={`${point.capacity} 人/次`}
            />
          </Space>
        </Row>
      </Space>
    </>
  );
};

const TaskPage = () => {
  const { dispatch } = useContext(MainContext);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const getInitValues = (task: Task) => {
    const region = util.getTaskRegion(task);

    // get initial values
    return {
      ...task,
      location: {
        region: region!.key,
        point: task.pointKey,
      },
    };
  };

  const onSave = (task: Task) => {
    const formValues = form.getFieldsValue();
    const newValues = {
      title: formValues.title,
      pointKey: formValues.location.point,
      description: formValues.description,
    };

    dispatch({
      type: actionTypes.UPDATE_TASK,
      value: { ...task, ...newValues },
    });

    console.log('updating TaskPoint with...', newValues);
  };

  const onDelete = (task: Task) => {
    dispatch({
      type: actionTypes.DELETE_TASK,
      value: task.key,
    });
    navigate('/');
  };

  const renderForm = (task: Task) => {
    return <TaskForm task={task} form={form} getInitValues={getInitValues} />;
  };

  return (
    <ItemPage
      itemType="步骤"
      renderContent={renderContent}
      renderForm={renderForm}
      onSave={onSave}
      getInitValues={getInitValues}
      onDelete={onDelete}
    />
  );
};

export default TaskPage;
