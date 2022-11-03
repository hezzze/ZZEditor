export interface PointOfInterest {
  short_desc: string;
  min_duration: number | '';
  region_key: string;
  key?: number;
}

const POINTS = [
  {
    short_desc: '序厅-星云装置',
    min_duration: '',
    region_key: 'r0',
  },
  {
    short_desc: '存包',
    min_duration: '',
    region_key: 'r0',
  },
  {
    short_desc: '售票',
    min_duration: '',
    region_key: 'r0',
  },
  {
    short_desc: '屏幕-转播',
    min_duration: '',
    region_key: 'r0',
  },
  {
    short_desc: '自助售票/换装',
    min_duration: '',
    region_key: 'r0',
  },
  {
    short_desc: '屏幕-未来北京',
    min_duration: '',
    region_key: 'r0',
  },
  {
    short_desc: '排队区',
    min_duration: 3,
    region_key: 'r0',
  },
  {
    short_desc: '排队区',
    min_duration: 3,
    region_key: 'r0',
  },
  {
    short_desc: '发射井',
    min_duration: 3,
    region_key: 'r0',
  },
  {
    short_desc: '偷渡集装箱',
    min_duration: 2,
    region_key: 'r1',
  },
  {
    short_desc: '售卖',
    min_duration: '',
    region_key: 'r1',
  },
  {
    short_desc: '偷渡生物剧情演绎',
    min_duration: '',
    region_key: 'r1',
  },
  {
    short_desc: 'NPC港口管理员',
    min_duration: '',
    region_key: 'r1',
  },
  {
    short_desc: '旋转楼梯',
    min_duration: '',
    region_key: 'r2',
  },
  {
    short_desc: 'NPC-工程师',
    min_duration: '',
    region_key: 'r2',
  },
  {
    short_desc: 'NPC-首席科学家',
    min_duration: '',
    region_key: 'r2',
  },
  {
    short_desc: '拓展路线1-蹦床',
    min_duration: 10,
    region_key: 'r2',
  },
  {
    short_desc: '拓展路线2-滑梯',
    min_duration: 10,
    region_key: 'r2',
  },
  {
    short_desc: '审查装置',
    min_duration: 5,
    region_key: 'r2',
  },
  {
    short_desc: 'NPC-执法官',
    min_duration: '',
    region_key: 'r2',
  },
  {
    short_desc: '电梯',
    min_duration: '',
    region_key: 'r2',
  },
  {
    short_desc: '拓展起点',
    min_duration: '',
    region_key: 'r2',
  },
  {
    short_desc: '交互装置-实验操作台',
    min_duration: 4,
    region_key: 'r2',
  },
  {
    short_desc: '光影秀',
    min_duration: '',
    region_key: 'r2',
  },
  {
    short_desc: '密室-NPC-狱警',
    min_duration: 3,
    region_key: 'r2',
  },
  {
    short_desc: '密室-机关牢房',
    min_duration: 5,
    region_key: 'r2',
  },
  {
    short_desc: '密室-控制室',
    min_duration: 5,
    region_key: 'r2',
  },
  {
    short_desc: '密室-管道迷宫',
    min_duration: 5,
    region_key: 'r2',
  },
  {
    short_desc: '探洞工厂',
    min_duration: 5,
    region_key: 'r3',
  },
  {
    short_desc: '球池寻宝',
    min_duration: 5,
    region_key: 'r3',
  },
  {
    short_desc: 'NPC-外星人',
    min_duration: '',
    region_key: 'r3',
  },
  {
    short_desc: '壁画线索',
    min_duration: 5,
    region_key: 'r3',
  },
  {
    short_desc: '攀岩',
    min_duration: 5,
    region_key: 'r3',
  },
  {
    short_desc: 'VR驾驶',
    min_duration: 5,
    region_key: 'r3',
  },
  {
    short_desc: 'CUBE',
    min_duration: 10,
    region_key: 'r3',
  },
  {
    short_desc: '返回舱',
    min_duration: 5,
    region_key: 'r3',
  },
  {
    short_desc: '排队区',
    min_duration: '',
    region_key: 'r4',
  },
  {
    short_desc: '海关安检',
    min_duration: '',
    region_key: 'r4',
  },
  {
    short_desc: 'NPC-占星师',
    min_duration: '',
    region_key: 'r5',
  },
  {
    short_desc: 'VR360',
    min_duration: 10,
    region_key: 'r5',
  },
  {
    short_desc: '射箭',
    min_duration: 5,
    region_key: 'r5',
  },
  {
    short_desc: '虚拟屏',
    min_duration: 5,
    region_key: 'r5',
  },
  {
    short_desc: 'NPC-丛林之子',
    min_duration: '',
    region_key: 'r5',
  },
  {
    short_desc: 'VR赛马X4',
    min_duration: 5,
    region_key: 'r5',
  },
  {
    short_desc: 'VR360',
    min_duration: 10,
    region_key: 'r5',
  },
  {
    short_desc: 'NPC-驯兽师',
    min_duration: '',
    region_key: 'r5',
  },
  {
    short_desc: 'NPC-迎宾',
    min_duration: '',
    region_key: 'r6',
  },
  {
    short_desc: 'NPC-导航官',
    min_duration: '',
    region_key: 'r6',
  },
  {
    short_desc: 'NPC-大副',
    min_duration: '',
    region_key: 'r6',
  },
  {
    short_desc: 'NPC-运营官',
    min_duration: '',
    region_key: 'r6',
  },
  {
    short_desc: 'NPC-科学顾问',
    min_duration: '',
    region_key: 'r6',
  },
  {
    short_desc: '舰载机甲',
    min_duration: 10,
    region_key: 'r6',
  },
  {
    short_desc: '光影秀',
    min_duration: '',
    region_key: 'r6',
  },
  {
    short_desc: '高空拓展入口',
    min_duration: '',
    region_key: 'r6',
  },
  {
    short_desc: '可增加小型设备或休息区',
    min_duration: '',
    region_key: 'r6',
  },
  {
    short_desc: 'VR驾驶X5',
    min_duration: 5,
    region_key: 'r6',
  },
  {
    short_desc: '中枢舞台',
    min_duration: '',
    region_key: 'r6',
  },
  {
    short_desc: '饮品店',
    min_duration: '',
    region_key: 'r7',
  },
  {
    short_desc: '纪念品',
    min_duration: '',
    region_key: 'r7',
  },
  {
    short_desc: '便利店',
    min_duration: '',
    region_key: 'r7',
  },
  {
    short_desc: '小吃',
    min_duration: '',
    region_key: 'r7',
  },
  {
    short_desc: '小吃',
    min_duration: '',
    region_key: 'r7',
  },
  {
    short_desc: '小吃',
    min_duration: '',
    region_key: 'r7',
  },
  {
    short_desc: '小吃',
    min_duration: '',
    region_key: 'r7',
  },
  {
    short_desc: '自助贩卖机',
    min_duration: '',
    region_key: 'r7',
  },
  {
    short_desc: '控制室',
    min_duration: '',
    region_key: 'r7',
  },
  {
    short_desc: 'NPC银河歌姬',
    min_duration: '',
    region_key: 'r8',
  },
  {
    short_desc: 'NPC+手工',
    min_duration: '',
    region_key: 'r8',
  },
  {
    short_desc: 'NPC+花店',
    min_duration: '',
    region_key: 'r8',
  },
  {
    short_desc: 'NPC+纹身店',
    min_duration: '',
    region_key: 'r8',
  },
  {
    short_desc: 'NPC+古董店',
    min_duration: '',
    region_key: 'r8',
  },
  {
    short_desc: '自助设备',
    min_duration: '',
    region_key: 'r8',
  },
  {
    short_desc: '表演候场',
    min_duration: '',
    region_key: 'r8',
  },
  {
    short_desc: '舰长',
    min_duration: '',
    region_key: 'r8',
  },
  {
    short_desc: '跳楼机',
    min_duration: 3,
    region_key: 'r8',
  },
  {
    short_desc: 'NPC+服装店',
    min_duration: '',
    region_key: 'r9',
  },
  {
    short_desc: 'NPC+化妆店',
    min_duration: '',
    region_key: 'r9',
  },
  {
    short_desc: 'NPC+黑市',
    min_duration: '',
    region_key: 'r9',
  },
  {
    short_desc: 'NPC魔术师',
    min_duration: '',
    region_key: 'r9',
  },
  {
    short_desc: 'NPC赏金会长',
    min_duration: '',
    region_key: 'r9',
  },
  {
    short_desc: 'NPC酒保',
    min_duration: '',
    region_key: 'r9',
  },
  {
    short_desc: 'NPC商人+赌场',
    min_duration: '',
    region_key: 'r9',
  },
  {
    short_desc: 'NPC荷官',
    min_duration: '',
    region_key: 'r9',
  },
  {
    short_desc: 'VR摩托X5',
    min_duration: 5,
    region_key: 'r9',
  },
  {
    short_desc: 'VR座椅X8',
    min_duration: 10,
    region_key: 'r10',
  },
  {
    short_desc: '陀螺仪',
    min_duration: 5,
    region_key: 'r10',
  },
  {
    short_desc: 'VR跳伞',
    min_duration: 10,
    region_key: 'r10',
  },
  {
    short_desc: 'NPC-星际大盗',
    min_duration: '',
    region_key: 'r10',
  },
  {
    short_desc: 'NPC-先遣队军官',
    min_duration: '',
    region_key: 'r10',
  },
  {
    short_desc: 'PVE320',
    min_duration: 20,
    region_key: 'r10',
  },
  {
    short_desc: 'NPC+高空绳网',
    min_duration: 10,
    region_key: 'r10',
  },
  {
    short_desc: 'NPC-赏金猎人',
    min_duration: '',
    region_key: 'r10',
  },
  {
    short_desc: '高空滑索',
    min_duration: 1,
    region_key: 'r11',
  },
];

const pointsWithId: PointOfInterest[] = POINTS.map((p, i) => ({
  ...p,
  key: i,
}));

export default pointsWithId;
