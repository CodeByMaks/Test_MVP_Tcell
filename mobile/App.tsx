import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, TextInput, StyleSheet } from 'react-native';
import { api, Profile, Quest, InsightResponse, AssistantResponse } from './src/mockApi';

type Tab = 'home' | 'insights' | 'assistant';

export default function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [insights, setInsights] = useState<InsightResponse | null>(null);
  const [assistantInput, setAssistantInput] = useState('Сколько у меня интернета?');
  const [assistantData, setAssistantData] = useState<AssistantResponse | null>(null);
  const [status, setStatus] = useState('Loading...');

  async function loadHome() {
    setStatus('Loading profile...');
    const [p, q] = await Promise.all([api.getProfile(), api.getTodayQuests()]);
    setProfile(p);
    setQuests(q.quests);
    setStatus('Ready');
  }

  async function completeQuest(questId: string) {
    const result = await api.completeQuest(questId);
    if (result.ok) await loadHome();
    else setStatus(result.reason || 'Cannot complete quest');
  }

  async function claimReward() {
    const result = await api.claimReward();
    if (result.ok) {
      setStatus(`Reward +${result.reward} points`);
      await loadHome();
    } else setStatus(result.reason || 'Reward not available');
  }

  async function loadInsights() {
    setInsights(await api.getInsights());
  }

  async function askAssistant() {
    setAssistantData(await api.askAssistant(assistantInput));
  }

  useEffect(() => {
    loadHome();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabs}>
        {(['home', 'insights', 'assistant'] as Tab[]).map((t) => (
          <TouchableOpacity key={t} onPress={() => setTab(t)} style={[styles.tab, tab === t && styles.tabActive]}>
            <Text style={styles.tabText}>{t.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.status}>{status}</Text>

        {tab === 'home' && profile && (
          <View>
            <Text style={styles.title}>Daily Hub</Text>
            <Text>Баланс: {profile.balance} {profile.currency}</Text>
            <Text>Тариф: {profile.tariff}</Text>
            <Text>Остаток интернета: {profile.dataLeftGb} GB</Text>
            <Text>Серия: {profile.streakDays} дней</Text>
            <Text>Поинты: {profile.rewardPoints}</Text>

            <Text style={styles.subTitle}>Квесты на сегодня</Text>
            {quests.map((q) => (
              <View key={q.id} style={styles.questRow}>
                <Text>{q.completed ? '✅' : '⬜'} {q.title} (+{q.points})</Text>
                {!q.completed && (
                  <TouchableOpacity style={styles.button} onPress={() => completeQuest(q.id)}>
                    <Text style={styles.buttonText}>Done</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}

            <TouchableOpacity style={styles.buttonPrimary} onPress={claimReward}>
              <Text style={styles.buttonText}>Claim Daily Reward</Text>
            </TouchableOpacity>
          </View>
        )}

        {tab === 'insights' && (
          <View>
            <Text style={styles.title}>Usage Insights</Text>
            <TouchableOpacity style={styles.buttonPrimary} onPress={loadInsights}>
              <Text style={styles.buttonText}>Load Insights</Text>
            </TouchableOpacity>
            {insights && (
              <View style={styles.card}>
                <Text>Дневной трафик (MB): {insights.dailyMb.join(', ')}</Text>
                <Text>Средний расход: {insights.averageMb} MB</Text>
                <Text>Категория: {insights.topCategory}</Text>
                <Text>Прогноз до исчерпания: {insights.forecastDaysToRunOut} дн.</Text>
                <Text>Совет: {insights.recommendation}</Text>
              </View>
            )}
          </View>
        )}

        {tab === 'assistant' && (
          <View>
            <Text style={styles.title}>Mini AI Assistant</Text>
            <TextInput value={assistantInput} onChangeText={setAssistantInput} style={styles.input} />
            <TouchableOpacity style={styles.buttonPrimary} onPress={askAssistant}>
              <Text style={styles.buttonText}>Ask</Text>
            </TouchableOpacity>
            {assistantData && (
              <View style={styles.card}>
                <Text>{assistantData.reply}</Text>
                <Text>Actions: {assistantData.actions.map((a) => a.title).join(', ')}</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ddd' },
  tab: { flex: 1, padding: 12, alignItems: 'center' },
  tabActive: { backgroundColor: '#eef4ff' },
  tabText: { fontWeight: '700' },
  content: { padding: 16, gap: 12 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  subTitle: { marginTop: 16, fontSize: 18, fontWeight: '700' },
  button: { backgroundColor: '#7c3aed', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 },
  buttonPrimary: { backgroundColor: '#2563eb', borderRadius: 8, padding: 12, marginTop: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
  questRow: { marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  card: { marginTop: 12, padding: 12, backgroundColor: '#f8fafc', borderRadius: 8, gap: 6 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10 },
  status: { color: '#64748b' },
});
