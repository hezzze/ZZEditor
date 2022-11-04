import type { Mission, Quest, Task } from '../../common/QuestModel';
import constants from './constants';

const { POINTS, REGIONS } = constants;

const missionTime = (mission: Mission) => {
  return mission.children.reduce((acc, t) => {
    return acc + +POINTS[t.pointKey].min_duration;
  }, 0);
};

const questTime = (quest: Quest) => {
  return quest.children.reduce((acc, m) => {
    return acc + missionTime(m);
  }, 0);
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
          const task = mission.children[ti];
          if (task.key === key) return task;
        }
      }
    }
    return null;
  },
  getTaskRegion: (task: Task) => {
    const region = REGIONS.find((r) => {
      if (POINTS[task.pointKey]) {
        return r.key === POINTS[task.pointKey].region_key;
      }
      return false;
    });

    return region;
  },
  missionTime,
  questTime,
};
