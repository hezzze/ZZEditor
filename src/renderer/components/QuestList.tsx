import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import type { TreeProps } from 'antd/es/tree';
import { Mission, Quest, TaskPoint } from 'common/QuestModel';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import constants from 'renderer/shared/constants';
import MainContext from '../shared/MainContext';

const QuestList = () => {
  const { state } = useContext(MainContext);
  const navigate = useNavigate();

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);

    switch ((info.node as unknown as Quest | Mission | TaskPoint).nodeType) {
      case constants.NODE_TYPE_QUEST:
        console.log('Quest!');
        navigate(`/quest/${info.node.key}`);
        break;
      case constants.NODE_TYPE_MISSION:
        console.log('MISSION!');
        navigate(`/mission/${info.node.key}`);
        break;
      case constants.NODE_TYPE_TASKPOINT:
        console.log('TP!');
        navigate(`/taskpoint/${info.node.key}`);
        break;
      default:
        throw new Error('illegal node type');
    }
  };

  return (
    <Tree
      showLine
      switcherIcon={<DownOutlined />}
      defaultExpandedKeys={['0-0-0']}
      onSelect={onSelect}
      treeData={state.questData}
    />
  );
};

// class QuestList extends React.Component {
//   // most likely a bug for this rule
//   // eslint-disable-next-line react/static-property-placement
//   context!: React.ContextType<typeof MainContext>;

//   private destructor: (() => void) | undefined;

//   // componentDidMount(): void {
//   //   this.destructor = window.electron.ipcRenderer.on(
//   //     MainEventType.OPEN_FILE,
//   //     (jsonData) => {
//   //       console.log('loading new file...');
//   //       this.setState({
//   //         questData: JSON.parse(jsonData),
//   //       });
//   //     }
//   //   );
//   // }

//   // componentWillUnmount(): void {
//   //   if (this.destructor) this.destructor();
//   // }

//   render(): React.ReactNode {
//     const { state } = this.context;

//     const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
//       console.log('selected', selectedKeys, info);

//       switch ((info.node as unknown as Quest).nodeType) {
//         case constants.NODE_TYPE_QUEST:
//           console.log('Quest!');
//           break;
//         case constants.NODE_TYPE_MISSION:
//           console.log('MISSION!');
//           break;
//         case constants.NODE_TYPE_TASKPOINT:
//           console.log('TP!');
//           break;
//         default:
//           throw new Error('illegal node type');
//       }
//     };

//     return (
//       <Tree
//         showLine
//         switcherIcon={<DownOutlined />}
//         defaultExpandedKeys={['0-0-0']}
//         onSelect={onSelect}
//         treeData={state.questData}
//       />
//     );
//   }
// }

export default QuestList;
