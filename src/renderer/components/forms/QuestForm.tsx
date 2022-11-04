import { Form, Input, Select } from 'antd';
import constants from 'renderer/shared/constants';
import { Quest } from 'common/QuestModel';

const { Option } = Select;

interface QuestFormProps {
  quest?: Quest;
  form: any;
}

const QuestForm: React.FC<QuestFormProps> = ({
  quest,
  form,
}: QuestFormProps) => {
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

      <Form.Item
        name="difficulty"
        label="难度"
        rules={[{ required: true, message: '请输入难度' }]}
      >
        <Select placeholder="选择难度" allowClear>
          <Option value="low">{constants.QUEST_DIFFICULTY.low}</Option>
          <Option value="medium">{constants.QUEST_DIFFICULTY.medium}</Option>
          <Option value="high">{constants.QUEST_DIFFICULTY.high}</Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

QuestForm.defaultProps = {
  quest: {},
};

export default QuestForm;
