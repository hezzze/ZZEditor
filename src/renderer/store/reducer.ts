import type { Task } from 'common/QuestModel';
import { Reducer } from 'react';
import actionTypes from 'renderer/shared/actionTypes';
import { AppState, Action } from 'renderer/store/MainContext';

const reducer: Reducer<AppState, Action> = (
  state: AppState,
  action: Action
) => {
  const data = state.questData;

  switch (action.type) {
    // LOAD_FILE
    case actionTypes.LOAD_FILE:
      return { ...state, questData: action.value };

    // UPDATE_QUEST
    case actionTypes.UPDATE_QUEST: {
      const newQuest = action.value;

      const idx = state.questData.findIndex((q) => q.key === newQuest.key);
      return {
        ...state,
        questData: [...data.slice(0, idx), newQuest, ...data.slice(idx + 1)],
      };
    }

    // UPDATE_MISSON
    case actionTypes.UPDATE_MISSON: {
      const newMission = action.value;

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

    // UPDATE_TASK
    case actionTypes.UPDATE_TASK: {
      const newTask: Task = action.value;

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

    // ADD QUEST
    case actionTypes.ADD_QUEST: {
      const newQuest = action.value;
      return {
        ...state,
        questData: [...data, newQuest],
      };
    }

    // ADD Mission
    case actionTypes.ADD_MISSION: {
      const { parentKey, item: newMission } = action.value;

      for (let qi = 0; qi < data.length; qi += 1) {
        const quest = data[qi];
        if (quest.key === parentKey) {
          quest.children = [...quest.children, newMission];
          break;
        }
      }

      return {
        ...state,
        questData: [...data],
      };
    }

    // ADD TASK
    case actionTypes.ADD_TASK: {
      const { parentKey, item: newTask } = action.value;

      for (let qi = 0; qi < data.length; qi += 1) {
        const quest = data[qi];
        for (let mi = 0; mi < quest.children.length; mi += 1) {
          const mission = quest.children[mi];
          if (mission.key === parentKey) {
            mission.children = [...mission.children, newTask];
          }
        }
      }

      return { ...state, questData: [...data] };
    }
    default:
      throw new Error();
  }
};

export default reducer;
