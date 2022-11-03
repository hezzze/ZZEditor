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
import { Quest, Task } from 'common/QuestModel';

import 'antd/dist/antd.dark.css';

import QuestList from './components/QuestList';
import QuestPage from './components/QuestPage';
import MissionPage from './components/MissionPage';
import TaskPage from './components/TaskPage';

import './App.css';

import MainContext from './shared/MainContext';
import type { AppState, Action } from './shared/MainContext';
import actionTypes from './shared/actionTypes';
import ControlPanel from './components/ControlPanel';

const err = message.error;

const reducer: Reducer<AppState, Action> = (
  state: AppState,
  action: Action
) => {
  switch (action.type) {
    // LOAD_FILE
    case actionTypes.LOAD_FILE:
      return { ...state, questData: action.value };

    // UPDATE_QUEST
    case actionTypes.UPDATE_QUEST: {
      const newQuest = action.value;
      const newData = state.questData.filter((q) => q.key !== newQuest.key);
      return { ...state, questData: [...newData, newQuest] };
    }

    // UPDATE_MISSON
    case actionTypes.UPDATE_MISSON: {
      const newMission = action.value;
      const data = state.questData;

      for (let qi = 0; qi < data.length; qi += 1) {
        const quest = data[qi];
        for (let mi = 0; mi < quest.children.length; mi += 1) {
          if (quest.children[mi].key === newMission.key) {
            quest.children[mi] = newMission;
          }
        }
      }

      return { ...state };
    }

    // UPDATE_TASKPOINT
    case actionTypes.UPDATE_TASKPOINT: {
      const newTask: Task = action.value;
      const data = state.questData;

      for (let qi = 0; qi < data.length; qi += 1) {
        const quest = data[qi];
        for (let mi = 0; mi < quest.children.length; mi += 1) {
          const mission = quest.children[mi];
          for (let ti = 0; ti < mission.children.length; ti += 1) {
            if (mission.children[ti].key === newTask.key) {
              mission.children[ti] = newTask;
            }
          }
        }
      }

      return { ...state };
    }

    // DELETE_QUEST
    case actionTypes.DELETE_QUEST: {
      const key = action.value;

      const newData = state.questData.filter((q) => q.key !== key);
      return { ...state, questData: [...newData] };
    }

    // DELETE_MISSION
    case actionTypes.DELETE_MISSION: {
      const key = action.value;

      const data = state.questData;
      let deleted = false;

      for (let qi = 0; qi < data.length && !deleted; qi += 1) {
        const quest = data[qi];
        for (let mi = 0; mi < quest.children.length && !deleted; mi += 1) {
          if (quest.children[mi].key === key) {
            quest.children = [
              ...quest.children.slice(0, mi),
              ...quest.children.slice(mi + 1),
            ];
            deleted = true;
          }
        }
      }

      return { ...state, questData: [...data] };
    }

    // DELETE_TASKPOINT
    case actionTypes.DELETE_TASK: {
      const key = action.value;

      const data = state.questData;
      let deleted = false;

      for (let qi = 0; qi < data.length && !deleted; qi += 1) {
        const quest = data[qi];
        for (let mi = 0; mi < quest.children.length && !deleted; mi += 1) {
          const mission = quest.children[mi];
          for (let ti = 0; ti < mission.children.length && !deleted; ti += 1) {
            if (mission.children[ti].key === key) {
              mission.children = [
                ...mission.children.slice(0, ti),
                ...mission.children.slice(ti + 1),
              ];
              deleted = true;
            }
          }
        }
      }

      return { ...state, questData: [...data] };
    }
    default:
      throw new Error();
  }
};

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
        {state.questData.length === 0
          ? '添加文件 -> 打开 来读取数据文件'
          : '选择要查看/编辑的对象'}
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
          <Route path="/taskpoint/:id" element={<TaskPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
