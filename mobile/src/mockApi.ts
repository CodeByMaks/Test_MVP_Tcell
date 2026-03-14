const BASE_URL = 'http://localhost:4000';

export type Profile = {
  userId: string;
  balance: number;
  currency: string;
  tariff: string;
  dataLeftGb: number;
  daysToReset: number;
  streakDays: number;
  rewardPoints: number;
};

export type Quest = {
  id: string;
  title: string;
  points: number;
  completed: boolean;
};

export type InsightResponse = {
  dailyMb: number[];
  averageMb: number;
  topCategory: string;
  forecastDaysToRunOut: number;
  recommendation: string;
};

export type AssistantResponse = {
  reply: string;
  actions: { id: string; title: string }[];
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export const api = {
  getProfile: () => request<Profile>('/profile'),
  getTodayQuests: () => request<{ date: string; quests: Quest[] }>('/quests/today'),
  completeQuest: (questId: string) =>
    request<{ ok: boolean; reason?: string }>(`/quests/${questId}/complete`, { method: 'POST' }),
  getInsights: () => request<InsightResponse>('/insights/weekly'),
  askAssistant: (message: string) =>
    request<AssistantResponse>('/assistant/message', {
      method: 'POST',
      body: JSON.stringify({ message }),
    }),
  claimReward: () =>
    request<{ ok: boolean; reason?: string; reward?: number }>('/rewards/claim', {
      method: 'POST',
    }),
};
