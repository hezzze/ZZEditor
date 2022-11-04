import {
  MemoryRouter as Router,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from 'react-router-dom';
import { Layout, message } from 'antd';
import { Reducer, useEffect, useReducer } from 'react';
import IPC from 'common/IPC';
import { Header } from 'antd/lib/layout/layout';
import { Quest } from 'common/QuestModel';

import 'antd/dist/antd.dark.css';

import QuestList from './components/QuestList';
import QuestPage from './components/QuestPage';
import MissionPage from './components/MissionPage';
import TaskPage from './components/TaskPage';

import './App.css';

import MainContext from './store/MainContext';
import type { AppState, Action } from './store/MainContext';
import actionTypes from './shared/actionTypes';
import ControlPanel from './components/ControlPanel';
import reducer from './store/reducer';

const err = message.error;

function loadQuestData(jsonData) {
  const data: Quest[] = JSON.parse(jsonData);

  data.forEach((q) => {
    q.nodeType = 0;
    q.children.forEach((m) => {
      m.nodeType = 1;
      m.children.forEach((t) => {
        t.nodeType = 2;
        if (!t.pointKey) t.pointKey = 0;
      });
    });
  });

  return data;
}

const { Sider, Content } = Layout;

const Main = () => {
  const [state, dispatch] = useReducer<Reducer<AppState, Action>>(reducer, {
    questData: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const destructor = window.electron.ipcRenderer.on(
      IPC.CHANNEL_NAME,
      (message) => {
        switch (message.type) {
          case IPC.OPEN_FILE: {
            console.log('loading new file...');
            dispatch({
              type: actionTypes.LOAD_FILE,
              value: loadQuestData(message.data),
            });
            navigate('/');
            break;
          }
          case IPC.SAVE: {
            if (state.questData.length === 0) {
              err('当前内容为空，操作已忽略');
              return;
            }

            console.log(`to save file to ${message.data}`);
            window.electron.ipcRenderer.sendMessage(IPC.CHANNEL_NAME, {
              type: IPC.SAVE,
              data: {
                filePath: message.data,
                obj: state.questData,
              },
            });
            break;
          }
          default:
            throw new Error('Illegal message type');
        }
      }
    );

    return destructor;
  });

  return (
    <MainContext.Provider value={{ state, dispatch }}>
      <Layout>
        <Header>
          <ControlPanel />
        </Header>
        <Layout>
          <Sider>
            <QuestList />
          </Sider>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </MainContext.Provider>
  );
};

const Hello = () => (
  <MainContext.Consumer>
    {({ state }) => (
      <div className="hello-page">
        {state.questData.length === 0 ? (
          <>
            <div>{'添加文件 -> 打开 来读取数据文件'}</div>
            <div>或者</div>
            <div>添加新的任务线</div>
          </>
        ) : (
          '选择要查看/编辑的对象'
        )}
      </div>
    )}
  </MainContext.Consumer>
);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Hello />} />
          <Route path="/quest/:id" element={<QuestPage />} />
          <Route path="/mission/:id" element={<MissionPage />} />
          <Route path="/task/:id" element={<TaskPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
