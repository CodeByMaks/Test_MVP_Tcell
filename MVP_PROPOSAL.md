# MVP-концепция Telecom App (Tcell-like) на React Native

Ниже — реалистичный MVP для небольшой команды, заточенный под рост ежедневной вовлечённости (DAU), даже без доступа к реальным данным оператора.

---

## 1) Core MVP Idea (коротко)

Сделать в приложении **Daily Hub** — главный экран ежедневной пользы: короткие квесты, streak (серия дней), бонусы и мини-AI помощник по балансу/тарифу/интернету. Пользователь заходит не только «по необходимости», а ради прогресса, наград и простых персональных подсказок.

---

## 2) Ключевые фичи MVP (макс. 4)

### 1. Daily Hub (главный экран привычки)
- Карточки: баланс, остаток GB, текущий тариф, кнопка «пополнить».
- Блок «Сегодня»: 3 квеста, streak, награда дня.
- 1 главный CTA: «Собрать награду» / «Выполнить квест».

### 2. Daily Quests + Streak Rewards
- 3 микро-квеста в день (30–90 сек каждый):
  - открыть app,
  - посмотреть статистику,
  - сделать полезное действие (платеж/автоплатеж/поделиться интернетом — mock).
- Streak: +1 за день с хотя бы 1 выполненным квестом.
- Механика «не потерять серию» = ежедневный ретеншн.

### 3. Mini AI Assistant (rule-based)
- Вопросы: «Сколько у меня интернета?», «Какой тариф выгоднее?», «Почему быстро уходит трафик?»
- Ответы: по правилам и mock-профилю + готовые action-кнопки:
  - «Купить 1 ГБ»,
  - «Сменить тариф»,
  - «Оптимизировать расход».

### 4. Smart Usage Insights (на mock-данных)
- Простой график расхода за 7 дней.
- Прогноз: «может закончиться через N дней».
- Рекомендации: «ночью расход ниже», «видео — главный драйвер трафика» (симуляция).

---

## 3) Как система работает БЕЗ реальных telecom-данных

## 3.1 Mock Data
Используем локальные/серверные JSON-объекты:

```json
{
  "userId": "mock_001",
  "balance": 18.5,
  "currency": "TJS",
  "tariff": "Smart M",
  "dataLeftGb": 4.2,
  "daysToReset": 6,
  "streakDays": 3,
  "rewardPoints": 140
}
```

## 3.2 Симуляция поведения
Ежедневно (cron/job) генерим синтетические события:
- `app_open`
- `usage_mb_consumed`
- `quest_completed`
- `topup_mock`
- `assistant_clicked_action`

Используем seed, чтобы сценарии были повторяемыми на тесте/демо.

## 3.3 Dummy Analytics
Считаем только по внутренним событиям:
- DAU,
- D1/D7-retention (для тестовой когорты),
- средняя длительность сессии,
- completion rate квестов,
- доля пользователей со streak ≥ 3.

---

## 4) User Journey (пошагово)

1. Пользователь открывает приложение → попадает в **Daily Hub**.
2. Видит: «Серия 4 дня. Сегодня доступно 3 квеста».
3. Выполняет быстрый квест «Посмотреть usage-инсайт» (+10 points).
4. Получает AI-подсказку: «Интернет может закончиться через 2 дня».
5. Нажимает quick action «Купить 1 ГБ» (в MVP — mock flow подтверждения).
6. Выполняет второй/третий квест → получает «daily chest».
7. На выходе экран: «Вернись завтра, чтобы сохранить серию и x1.2 бонус».
8. Push на следующий день в удобное время: «Твой streak под угрозой, осталось 1 задание».

---

## 5) Простая техническая архитектура (React Native-first)

## Mobile App (React Native)
- Stack: **React Native + TypeScript**.
- Навигация: React Navigation.
- State: Zustand (или Redux Toolkit).
- Экраны MVP:
  - `HomeDailyHubScreen`
  - `QuestsScreen`
  - `RewardsScreen`
  - `InsightsScreen`
  - `AssistantScreen`

## Backend
- Node.js (Express/NestJS), REST API:
  - `GET /profile`
  - `GET /quests/today`
  - `POST /quests/:id/complete`
  - `GET /insights/weekly`
  - `POST /assistant/message`
  - `POST /rewards/claim`

## AI component
- Отдельный модуль `assistant-service`:
  - intent detection (keyword/rules),
  - recommendation rules,
  - action suggestions.

## Database
- PostgreSQL (или SQLite на раннем этапе):
  - `users`
  - `events`
  - `daily_quests`
  - `streaks`
  - `reward_wallet`
  - `assistant_sessions`

---

## 6) AI в формате MVP: максимально практично

### Вариант A (рекомендуется): Rule-based
- Intent по ключевым словам:
  - `balance`, `tariff`, `internet`, `cheap`, `finish`.
- Правила:
  - Если `dataLeftGb < 1` и `daysToReset > 3` → предложить пакет 1 ГБ.
  - Если расход за 3 дня > среднего на 40% → предупредить и дать советы.

### Вариант B: Hybrid
- Решение принимает rule-engine.
- LLM используется только для «человечного» перефразирования ответа.
- Бизнес-логика не зависит от LLM → меньше рисков.

---

## 7) Engagement Mechanics

## Streak
- +1 день, если выполнен минимум 1 daily quest.
- Потеря дня = reset (или 1 freeze-token в неделю).
- Мультипликаторы наград:
  - день 3: +10%
  - день 7: +25%
  - день 14: +50%

## Rewards
- Soft points (внутренняя валюта MVP):
  - бейджи,
  - mock-купоны,
  - «лотерейный билет» на data-pack.

## Daily Quests
- Формула 1+1+1:
  - 1 очень простой (open app),
  - 1 обучающий (insights/assistant),
  - 1 value-action (оплата/пополнение/перевод ГБ — mock).
- Бонус за закрытие всех 3.

---

## 8) Success Metrics (что считаем в MVP)

1. **DAU**
- Цель: +25–40% к текущей базе utility-only сессий.

2. **Retention**
- D1 > 35%
- D7 > 15% (на пилотной когорте)

3. **Engagement Time**
- Рост средней сессии с ~1 мин до 2.5–4 мин.

4. **Quest Adoption**
- % пользователей, выполнивших ≥1 квест в день.

5. **Streak Health**
- % пользователей со streak ≥3 и ≥7 дней.

6. **Assistant Use Rate**
- % DAU, которые нажали хотя бы одну AI-подсказку.

---

## 9) Как масштабировать MVP в полноценный telecom-продукт

### Этап 1 (6–8 недель) — MVP
- Mock данные, базовые квесты, streak, rule-based assistant.
- Цель: доказать рост DAU/retention.

### Этап 2
- Подключить реальные read-only API (баланс, остатки, тариф).
- Подменить mock insights на реальные usage-данные.

### Этап 3
- Персонализация:
  - сегменты поведения,
  - churn risk score,
  - персональные офферы/квесты.

### Этап 4
- Расширение B2C-сервисов:
  - family dashboard,
  - transfer/share internet,
  - mini-app ecosystem (music/edu/finance partners).

---

## Мини-план реализации для маленькой команды

Команда: 1 RN dev, 1 backend dev, 1 product/designer, 1 QA part-time.

- **Sprint 1**: Daily Hub + quests + mock profile API
- **Sprint 2**: streak/rewards + insights chart + event tracking
- **Sprint 3**: assistant + push-реактивации + A/B текстов
- **Pilot (2–4 недели)**: 5–10% аудитории, замер KPI

---

## Что важно, чтобы MVP “взлетел”

- Не перегружать фичами: 1 главный ежедневный сценарий.
- Сразу строить event tracking (иначе не докажем эффект).
- Держать AI простым и полезным (быстрые кнопки важнее «умного» чата).
- Экономика наград должна мотивировать, но не требовать сложного биллинга на старте.
