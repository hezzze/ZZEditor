// Make sure the shape of the default value passed to

import React from 'react';

import type { Quest, Mission, TaskPoint } from '../../common/QuestModel';

export interface AppState {
  questData: Quest[];
  curQuest?: Quest;
  curMission?: Mission;
  curTaskPoint?: TaskPoint;
}

export interface Action {
  type: string;
  value: any;
}

const MainContext = React.createContext<{
  state: AppState;
  dispatch: (_: Action) => void;
}>({
  state: {
    questData: [],
  },
  dispatch: () => {},
});

// createContext matches the shape that the consumers expect!
export default MainContext;
