const todayKey = () => new Date().toISOString().slice(0, 10);

const state = {
  user: {
    userId: 'mock_001',
    name: 'Rustam',
    balance: 18.5,
    currency: 'TJS',
    tariff: 'Smart M',
    dataLeftGb: 4.2,
    daysToReset: 6,
    streakDays: 3,
    rewardPoints: 140,
    lastCheckInDate: null,
  },
  questsByDate: {},
  events: [],
};

function generateDailyQuests(date = todayKey()) {
  if (state.questsByDate[date]) return state.questsByDate[date];
  const quests = [
    { id: `${date}-open-app`, title: 'Открыть приложение', points: 5, completed: false },
    { id: `${date}-view-insights`, title: 'Посмотреть usage-insights', points: 10, completed: false },
    { id: `${date}-use-assistant`, title: 'Спросить AI помощника', points: 10, completed: false },
  ];
  state.questsByDate[date] = quests;
  return quests;
}

function recordEvent(type, payload = {}) {
  state.events.push({ type, payload, ts: new Date().toISOString() });
}

function checkInIfNeeded(date = todayKey()) {
  const last = state.user.lastCheckInDate;
  if (!last) {
    state.user.streakDays = 1;
    state.user.lastCheckInDate = date;
    return;
  }
  if (last === date) return;

  const previousDate = new Date(date);
  previousDate.setDate(previousDate.getDate() - 1);
  const prevKey = previousDate.toISOString().slice(0, 10);

  state.user.streakDays = last === prevKey ? state.user.streakDays + 1 : 1;
  state.user.lastCheckInDate = date;
}

function completeQuest(questId, date = todayKey()) {
  const quests = generateDailyQuests(date);
  const quest = quests.find((q) => q.id === questId);
  if (!quest) return { ok: false, reason: 'Quest not found' };
  if (quest.completed) return { ok: false, reason: 'Quest already completed' };

  quest.completed = true;
  state.user.rewardPoints += quest.points;
  recordEvent('quest_completed', { questId, points: quest.points });

  return {
    ok: true,
    quest,
    rewardPoints: state.user.rewardPoints,
    completedCount: quests.filter((q) => q.completed).length,
  };
}

function claimDailyReward(date = todayKey()) {
  const quests = generateDailyQuests(date);
  const completed = quests.filter((q) => q.completed).length;
  if (completed < 3) return { ok: false, reason: 'Complete all 3 quests first' };

  const baseReward = 20;
  const streak = state.user.streakDays;
  const multiplier = streak >= 14 ? 1.5 : streak >= 7 ? 1.25 : streak >= 3 ? 1.1 : 1;
  const reward = Math.round(baseReward * multiplier);

  state.user.rewardPoints += reward;
  recordEvent('daily_reward_claimed', { reward, streak, multiplier });

  return { ok: true, reward, streak, multiplier, rewardPoints: state.user.rewardPoints };
}

function getWeeklyInsights() {
  const mockDailyMb = [640, 870, 450, 990, 710, 830, 760];
  const avg = mockDailyMb.reduce((a, b) => a + b, 0) / mockDailyMb.length;
  const daysLeftEstimate = Math.max(1, Math.floor((state.user.dataLeftGb * 1024) / avg));

  return {
    dailyMb: mockDailyMb,
    averageMb: Math.round(avg),
    topCategory: 'Video',
    forecastDaysToRunOut: daysLeftEstimate,
    recommendation: daysLeftEstimate <= 2 ? 'Рекомендуем мини-пакет 1 ГБ.' : 'Пока трафика достаточно.',
  };
}

function assistantReply(message) {
  const text = (message || '').toLowerCase();
  if (text.includes('баланс')) {
    return {
      reply: `Ваш баланс: ${state.user.balance} ${state.user.currency}.`,
      actions: [{ id: 'topup', title: 'Пополнить' }],
    };
  }
  if (text.includes('тариф')) {
    return {
      reply: `Текущий тариф: ${state.user.tariff}. Могу предложить более выгодный пакет при высоком расходе данных.`,
      actions: [{ id: 'switch_tariff', title: 'Сменить тариф' }],
    };
  }
  if (text.includes('интернет') || text.includes('трафик') || text.includes('gb')) {
    const suggestion = state.user.dataLeftGb < 1 && state.user.daysToReset > 3 ? 'Рекомендую купить мини-пакет 1 ГБ.' : 'У вас достаточно интернета на ближайшие дни.';
    return {
      reply: `Остаток: ${state.user.dataLeftGb} ГБ. ${suggestion}`,
      actions: [{ id: 'buy_1gb', title: 'Купить 1 ГБ' }, { id: 'open_insights', title: 'Открыть аналитку' }],
    };
  }
  return {
    reply: 'Я могу помочь с балансом, интернетом и тарифом. Например: «Сколько у меня интернета?»',
    actions: [{ id: 'show_help', title: 'Что я умею' }],
  };
}

module.exports = {
  state,
  todayKey,
  generateDailyQuests,
  recordEvent,
  checkInIfNeeded,
  completeQuest,
  claimDailyReward,
  getWeeklyInsights,
  assistantReply,
};
