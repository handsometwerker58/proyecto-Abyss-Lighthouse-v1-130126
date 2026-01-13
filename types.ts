
export interface TacticalMetrics {
  energy: {
    sleep: number;
    diet: number;
    exercise: number;
  };
  territory: {
    productiveHours: number;
    projectCount: number;
  };
  fortress: {
    interceptions: number;
    lastInterceptTime: string;
  };
}

export interface Mission {
  id: string;
  title: string;
  type: 'MAIN' | 'SIDE';
  progress: number;
  status: 'ACTIVE' | 'COMPLETED' | 'ABANDONED';
  timestamp: string;
}

export interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export interface AppState {
  metrics: TacticalMetrics;
  missions: Mission[];
  history: Message[];
}
