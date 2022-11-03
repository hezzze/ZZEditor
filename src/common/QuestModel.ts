import type { DataNode } from 'antd/es/tree';

export interface Quest extends DataNode {
  key: string;
  title: string;
  icon: string;
  difficulty: 'low' | 'medium' | 'high';
  children: Mission[];

  // for internal tracking
  nodeType?: number;
}

export interface Mission {
  title: string;
  key: string;
  children: Task[];
  description: string;
  region: string;

  // for internal tracking
  nodeType?: number;
}

export interface Task {
  key: string;
  title: string;
  pointKey: number;
  description: string;

  // for internal tracking
  nodeType?: number;
}
