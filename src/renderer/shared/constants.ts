import POINTS from './poi';

export interface Region {
  key: string;
  title: string;
  floor: number;
  area_m2: number;
  maximum_capacity: number;
  avg_capacity?: number;
  players_per_min?: number;
}

const REGIONS: Region[] = [
  {
    key: 'r0',
    title: '北京基地',
    floor: 2,
    area_m2: 900,
    maximum_capacity: 280,
    players_per_min: 15,
  },
  {
    key: 'r1',
    title: '星舰港口',
    floor: 2,
    area_m2: 150,
    maximum_capacity: 50,
  },
  {
    key: 'r2',
    title: '引擎区',
    floor: 2,
    area_m2: 620,
    maximum_capacity: 120,
    avg_capacity: 60,
    players_per_min: 18,
  },
  {
    key: 'r3',
    title: '熔岩星球',
    floor: 2,
    area_m2: 570,
    maximum_capacity: 100,
    avg_capacity: 60,
    players_per_min: 9,
  },
  {
    key: 'r4',
    title: '星舰船坞',
    floor: 3,
    area_m2: 160,
    maximum_capacity: 40,
    players_per_min: 13,
  },
  {
    key: 'r5',
    title: '玉树星球',
    floor: 3,
    area_m2: 360,
    maximum_capacity: 80,
    avg_capacity: 40,
    players_per_min: 15,
  },
  {
    key: 'r6',
    title: '中控区',
    floor: 3,
    area_m2: 700,
    maximum_capacity: 150,
    avg_capacity: 80,
    players_per_min: 11,
  },
  {
    key: 'r7',
    title: '星舰美食街',
    floor: 4,
    area_m2: 400,
    maximum_capacity: 100,
    avg_capacity: 50,
    players_per_min: 10,
  },
  {
    key: 'r8',
    title: '星舰广场',
    floor: 4,
    area_m2: 640,
    maximum_capacity: 120,
    avg_capacity: 50,
    players_per_min: 10,
  },
  {
    key: 'r9',
    title: '星舰商业区',
    floor: 4,
    area_m2: 600,
    maximum_capacity: 120,
    avg_capacity: 60,
    players_per_min: 10,
  },
  {
    key: 'r10',
    title: '星际穿越',
    floor: 5,
    area_m2: 740,
    maximum_capacity: 100,
    avg_capacity: 30,
    players_per_min: 8,
  },
  {
    key: 'r11',
    title: '银河美术馆',
    floor: 6,
    area_m2: 740,
    maximum_capacity: 100,
    avg_capacity: 30,
    players_per_min: 15,
  },
];

export default {
  NODE_TYPE: {
    QUEST: 0,
    MISSION: 1,
    TASK: 2,
  },
  REGIONS,
  QUEST_DIFFICULTY: {
    low: '低',
    medium: '中',
    high: '高',
  },
  POINT_TYPES: {
    t0: 'NPC',
    t1: 'VR游乐设备',
    t2: '密室',
    t3: '拓展设备',
    t4: '特种设备',
    t5: '主题场景',
  },
  POINTS,
};
