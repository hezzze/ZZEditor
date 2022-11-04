import { DownOutlined } from '@ant-design/icons';
import {
  Button,
  Drawer,
  Dropdown,
  Form,
  MenuProps,
  message,
  Space,
  Tree,
} from 'antd';
import type { TreeProps } from 'antd/es/tree';
import { Mission, Quest, Task } from 'common/QuestModel';
import { nanoid } from 'nanoid';
import { Key, SetStateAction, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import actionTypes from 'renderer/shared/actionTypes';
import constants from 'renderer/shared/constants';
import MainContext from '../store/MainContext';
import MissionForm from './forms/MissionForm';
import TaskForm from './forms/TaskForm';

const { NODE_TYPE } = constants;

const err = message.error;

const QuestList = () => {
  const { dispatch } = useContext(MainContext);
  const [open, setOpen] = useState(false);
  const { state } = useContext(MainContext);
  const navigate = useNavigate();
  const [editType, updateEditType] = useState(NODE_TYPE.MISSION);
  const [form] = Form.useForm();
  const [selectedKey, updateSeletedKey] = useState('');

  // tree stuff
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = (newExpandedKeys: SetStateAction<Key[]>) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
    updateEditType(+e.key);
    showDrawer();
  };

  const renderTitle = (item: any) => {
    let menu: MenuProps['items'];
    switch (item.nodeType) {
      case NODE_TYPE.QUEST:
        menu = [
          {
            label: '添加任务',
            key: NODE_TYPE.MISSION,
          },
        ];
        break;
      case NODE_TYPE.MISSION:
        menu = [
          {
            label: '添加任务步骤',
            key: NODE_TYPE.TASK,
          },
        ];
        break;
      default:
        break;
    }

    if (item.nodeType === NODE_TYPE.TASK) {
      return item.title;
    }
    return (
      <Dropdown
        menu={{ items: menu, onClick: handleMenuClick }}
        trigger={['contextMenu']}
      >
        <div>{item.title}</div>
      </Dropdown>
    );
  };

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
    updateSeletedKey(info.node.key! as string);

    switch ((info.node as unknown as Quest | Mission | Task).nodeType) {
      case constants.NODE_TYPE.QUEST:
        console.log('Quest!');
        navigate(`/quest/${info.node.key}`);
        break;
      case constants.NODE_TYPE.MISSION:
        console.log('MISSION!');
        navigate(`/mission/${info.node.key}`);
        break;
      case constants.NODE_TYPE.TASK:
        console.log('TP!');
        navigate(`/task/${info.node.key}`);
        break;
      default:
        throw new Error('illegal node type');
    }
  };

  const onAdd = async () => {
    const newItem = {
      key: nanoid(),
      children: [],
      nodeType: editType,
    };

    if (editType === NODE_TYPE.MISSION) {
      Object.assign(newItem, form.getFieldsValue());
    } else {
      const values = form.getFieldsValue();
      Object.assign(newItem, {
        title: values.title,
        description: values.description,
        pointKey: values.location.point,
      });
    }

    try {
      await form.validateFields();

      dispatch({
        type:
          editType === NODE_TYPE.MISSION
            ? actionTypes.ADD_MISSION
            : actionTypes.ADD_TASK,
        value: {
          parentKey: selectedKey,
          item: newItem,
        },
      });

      console.log('Add a new Item with...', newItem);

      // expand the new item in tree
      setAutoExpandParent(true);
      setExpandedKeys([...expandedKeys, selectedKey]);

      // This will not work currrently because of the issue with useReducer
      // https://github.com/facebook/react/issues/15344#issuecomment-1046089737
      // navigate(
      //   `/${editType === NODE_TYPE.MISSION ? 'mission' : 'task'}/${newItem.key}`
      // );

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
    <>
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        showLine
        switcherIcon={<DownOutlined />}
        onSelect={onSelect}
        treeData={state.questData}
        titleRender={renderTitle}
      />
      <Drawer
        title="添加"
        placement="bottom"
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button type="primary" onClick={onAdd}>
              确认
            </Button>
          </Space>
        }
      >
        {editType === NODE_TYPE.MISSION && <MissionForm form={form} />}
        {editType === NODE_TYPE.TASK && <TaskForm form={form} />}
      </Drawer>
    </>
  );
};

export default QuestList;
