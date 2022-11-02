import type { Quest } from '../../common/QuestModel';

const DISPLAY_TEXT = {
  low: '低',
  medium: '中',
  high: '高',
};

export default {
  findNode: (data: Quest[], key: string) => {
    for (let qi = 0; qi < data.length; qi += 1) {
      const quest = data[qi];
      if (quest.key === key) return quest;
      for (let mi = 0; mi < quest.children.length; mi += 1) {
        const mission = quest.children[mi];
        if (mission.key === key) return mission;
        for (let ti = 0; ti < mission.children.length; ti += 1) {
          const taskpoint = mission.children[ti];
          if (taskpoint.key === key) return taskpoint;
        }
      }
    }
    return null;
  },
  getDisplayText: (stringKey: string) => {
    return DISPLAY_TEXT[stringKey];
  },
};
