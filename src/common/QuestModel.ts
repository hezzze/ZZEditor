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
  children: TaskPoint[];
  description: string;
  region: string;

  // for internal tracking
  nodeType?: number;
}

export interface TaskPoint {
  key: string;
  title: string;
  location: string;

  // for internal tracking
  nodeType?: number;
}
