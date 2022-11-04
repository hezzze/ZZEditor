import { Form, Input, Select } from 'antd';
import constants from 'renderer/shared/constants';
import { Mission } from 'common/QuestModel';

const { TextArea } = Input;
const { Option } = Select;

interface MissionFormProps {
  mission?: Mission;
  form: any;
}

const MissionForm: React.FC<MissionFormProps> = ({
  mission,
  form,
}: MissionFormProps) => {
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

MissionForm.defaultProps = {
  mission: {},
};

export default MissionForm;
