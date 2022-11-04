import { Button, Drawer, Form, message, Popconfirm, Space, Upload } from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import MainContext from 'renderer/store/MainContext';
import actionTypes from 'renderer/shared/actionTypes';
import constants from 'renderer/shared/constants';
import { Quest } from 'common/QuestModel';
import QuestForm from './forms/QuestForm';

const err = message.error;

const ControlPanel = () => {
  const [open, setOpen] = useState(false);
  const { dispatch } = useContext(MainContext);
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onAddQuest = async () => {
    const newQuest: Quest = {
      key: nanoid(),
      title: '',
      icon: '',
      difficulty: '',
      children: [],
      nodeType: constants.NODE_TYPE.QUEST,
      ...form.getFieldsValue(),
    };

    try {
      await form.validateFields();

      dispatch({
        type: actionTypes.ADD_QUEST,
        value: newQuest,
      });

      console.log('Add a new Quest with...', newQuest);
      setOpen(false);
    } catch (e) {
      const errors = form.getFieldsError();
      errors.forEach((x) => {
        if (x.errors.length > 0) {
          err(x.errors);
        }
      });
    }
  };

  return (
    <Space>
      <Button size="small" onClick={() => navigate(-1)}>
        <ArrowLeftOutlined />
      </Button>
      <Button size="small" onClick={showDrawer}>
        <PlusOutlined />
        添加任务线
      </Button>
      <Drawer
        title="添加新任务线"
        placement="bottom"
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button type="primary" onClick={onAddQuest}>
              确认
            </Button>
          </Space>
        }
      >
        <QuestForm form={form} />
      </Drawer>
    </Space>
  );
};

export default ControlPanel;
