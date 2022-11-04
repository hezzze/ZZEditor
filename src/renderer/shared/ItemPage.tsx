import { useParams } from 'react-router-dom';

import { Button, Drawer, Form, PageHeader, Popconfirm, Space } from 'antd';
import { ReactElement, useContext, useState } from 'react';
import { Quest, Mission, Task } from 'common/QuestModel';

import MainContext from '../store/MainContext';
import util from './util';

// reference: https://ant.design/components/page-header-cn/

interface ItemProp {
  itemType: string;
  getInitValues: (item: any) => void;
  renderForm: (item: any) => ReactElement;
  renderContent: (item: any, column?: any) => ReactElement;
  onSave: (item: any) => void;
  onDelete: (item: any) => void;
}

const ItemPage: React.FC<ItemProp> = ({
  getInitValues,
  renderForm,
  renderContent,
  onSave,
  onDelete,
  itemType,
}: ItemProp) => {
  const params = useParams();
  const { state } = useContext(MainContext);
  const item = util.findNode(state.questData, params.id!)!;

  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();

  const showDrawer = () => {
    setOpen(true);
    form.setFieldsValue(getInitValues(item));
  };

  const onClose = () => {
    setOpen(false);
    form.setFieldsValue(getInitValues(item));
  };

  const save = () => {
    onSave(item);
    setOpen(false);
  };

  const confirmDelete = () => {
    onDelete(item);
  };

  return (
    <PageHeader
      className="site-page-header-responsive"
      title={item.title}
      subTitle={itemType}
      extra={[
        <Popconfirm
          title="确认删除吗"
          okText="确认"
          cancelText="取消"
          onConfirm={confirmDelete}
        >
          <Button danger>删除</Button>
        </Popconfirm>,
        <Button key="1" type="primary" onClick={showDrawer}>
          编辑
        </Button>,
      ]}
    >
      {renderContent(item)}
      <Drawer
        title={`编辑 ${item.title} 基本信息`}
        placement="bottom"
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button type="primary" onClick={save}>
              保存
            </Button>
          </Space>
        }
      >
        {renderForm(item)}
      </Drawer>
    </PageHeader>
  );
};

export default ItemPage;
