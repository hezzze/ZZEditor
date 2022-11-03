import type { Quest } from '../../common/QuestModel';

export default {
  findNode: (data: Quest[], key: string) => {
    for (let qi = 0; qi < data.length; qi += 1) {
      const quest = data[qi];
      if (quest.key === key) return quest;
      for (let mi = 0; mi < quest.children.length; mi += 1) {
        const mission = quest.children[mi];
        if (mission.key === key) return mission;
        for (let ti = 0; ti < mission.children.length; ti += 1) {
          const task = mission.children[ti];
          if (task.key === key) return task;
        }
      }
    }
    return null;
  },
};
