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
import actionTypes from '../shared/actionTypes';

import ItemPage from '../shared/ItemPage';
import MainContext from '../shared/MainContext';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const { POINTS, REGIONS } = constants;

// reference: https://ant.design/components/page-header-cn/

function getTaskRegion(task: Task) {
  const region = REGIONS.find(
    (r) => r.key === POINTS[task.pointKey].region_key
  );

  return region;
}

const renderContent = (task: Task, column = 2) => {
  const point = constants.POINTS[task.pointKey];
  const region = getTaskRegion(task);

  return (
    <>
      <Title type="secondary" level={5}>
        基本信息
      </Title>
      <Descriptions size="small" column={column}>
        <Descriptions.Item label="描述">{task.description}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <Row justify="start">
        <Space size="large">
          <Statistic title="所属区域" value={region?.title} />
          <Statistic title="任务点" value={point.short_desc} />
          <Statistic
            title="预计最少时长"
            value={`${point.min_duration} 分钟`}
          />
        </Space>
      </Row>
    </>
  );
};

const TaskPage = () => {
  const { dispatch } = useContext(MainContext);
  const [form] = Form.useForm();

  const getInitValues = (task: Task) => {
    const region = getTaskRegion(task);

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
      type: actionTypes.UPDATE_TASKPOINT,
      value: { ...task, ...newValues },
    });

    console.log('updating TaskPoint with...', newValues);
  };

  const onRegionChange = (key: string) => {
    const points = POINTS.filter((p) => p.region_key === key);
    form.setFieldValue(['location', 'point'], points[0].key);
  };

  const renderForm = (task: Task) => {
    return (
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
        initialValues={getInitValues(task)}
        form={form}
      >
        <Form.Item
          label="步骤名称"
          name="title"
          rules={[{ required: true, message: '请输入步骤名称' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="步骤描述"
          rules={[{ required: true, message: '请输入步骤描述' }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="编辑步骤地图点">
          <Input.Group compact>
            <Form.Item
              name={['location', 'region']}
              noStyle
              rules={[{ required: true, message: '请选择' }]}
            >
              <Select placeholder="选择区域" onChange={onRegionChange}>
                {constants.REGIONS.map((r) => (
                  <Option
                    key={r.key}
                    value={`${r.key}`}
                  >{`${r.floor}F-${r.title}`}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.location.region !== currentValues.location.region
              }
            >
              {({ getFieldValue }) => (
                <Form.Item
                  name={['location', 'point']}
                  noStyle
                  rules={[{ required: true, message: '请选择' }]}
                >
                  <Select placeholder="选择地图点">
                    {POINTS.filter(
                      (p) =>
                        p.region_key === getFieldValue(['location', 'region'])
                    ).map((p) => (
                      <Option key={p.key} value={p.key}>
                        {p.short_desc}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            </Form.Item>
          </Input.Group>
        </Form.Item>
      </Form>
    );
  };

  return (
    <ItemPage
      renderContent={renderContent}
      renderForm={renderForm}
      onSave={onSave}
      getInitValues={getInitValues}
    />
  );
};

export default TaskPage;
