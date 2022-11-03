import { Button, Drawer, Popconfirm, Space, Upload } from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ControlPanel = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
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
        title="编辑 1 基本信息"
        placement="bottom"
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button type="primary" onClick={onClose}>
              保存
            </Button>
          </Space>
        }
      >
        123
      </Drawer>
    </Space>
  );
};

export default ControlPanel;
