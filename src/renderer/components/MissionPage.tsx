import { Descriptions, Form, Input, Select, Typography } from 'antd';
import { useContext } from 'react';
import { Mission } from 'common/QuestModel';
import constants from 'renderer/shared/constants';
import ItemPage from 'renderer/shared/ItemPage';
import actionTypes from '../shared/actionTypes';

import MainContext from '../shared/MainContext';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

// reference: https://ant.design/components/page-header-cn/

const renderContent = (mission: Mission) => (
  <>
    <Title type="secondary" level={5}>
      基本信息
    </Title>
    <Descriptions size="small" column={1}>
      <Descriptions.Item label="任务区域">{mission.region}</Descriptions.Item>
      <Descriptions.Item label="描述">{mission.description}</Descriptions.Item>
    </Descriptions>
  </>
);

const MissionPage = () => {
  const { dispatch } = useContext(MainContext);

  const [form] = Form.useForm();

  const onSave = (mission: Mission) => {
    dispatch({
      type: actionTypes.UPDATE_MISSON,
      value: { ...mission, ...form.getFieldsValue() },
    });

    console.log('updating Mission with...', form.getFieldsValue());
  };

  const renderForm = (mission: Mission) => {
    return (
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={mission}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="任务名称"
          name="title"
          rules={[{ required: true, message: '请输入任务名称' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="任务描述"
          rules={[{ required: true, message: '请输入任务描述' }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item name="region" label="任务区域" rules={[{ required: true }]}>
          <Select placeholder="选择任务区域" allowClear>
            {constants.REGIONS.map((r) => (
              <Option
                key={r.key}
                value={`${r.key}`}
              >{`${r.floor}F-${r.title}`}</Option>
            ))}
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
      getInitValues={(mission: Mission) => mission}
    />
  );
};

export default MissionPage;
