import { Form, Input, Select } from 'antd';
import constants from 'renderer/shared/constants';
import { Task } from 'common/QuestModel';

const { Option } = Select;
const { POINTS } = constants;
const { TextArea } = Input;

interface TaskFormProps {
  task?: Task;
  form: any;
  getInitValues?: (task: Task) => any;
}

const TaskForm: React.FC<TaskFormProps> = ({
  task,
  form,
  getInitValues,
}: TaskFormProps) => {
  const onRegionChange = (key: string) => {
    const points = POINTS.filter((p) => p.region_key === key);
    form.setFieldValue(['location', 'point'], points[0].key);
  };

  const onPointChange = (key: number) => {
    const point = POINTS.find((p) => p.key === key);
    form.setFieldValue('title', point?.short_desc);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      autoComplete="off"
      initialValues={getInitValues ? getInitValues(task!) : null}
      form={form}
    >
      <Form.Item label="编辑步骤任务点">
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
            shouldUpdate={(prevValues, currentValues) => {
              if (currentValues.location && prevValues.location) {
                return (
                  prevValues.location.region !== currentValues.location.region
                );
              }
              return true;
            }}
          >
            {({ getFieldValue }) => (
              <Form.Item
                name={['location', 'point']}
                noStyle
                rules={[{ required: true, message: '请选择' }]}
              >
                <Select placeholder="选择任务点" onChange={onPointChange}>
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

      <Form.Item
        name="description"
        label="步骤描述"
        rules={[{ required: true, message: '请输入步骤描述' }]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label="步骤名称"
        name="title"
        rules={[{ required: true, message: '请输入步骤名称' }]}
      >
        <Input placeholder="默认为任务点描述" />
      </Form.Item>
    </Form>
  );
};

TaskForm.defaultProps = {
  task: {},
  getInitValues: null,
};

export default TaskForm;
