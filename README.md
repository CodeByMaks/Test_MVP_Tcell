# Telecom MVP (React Native + Mock Backend)

Это стартовый рабочий каркас MVP-проекта, а не только идея.

## Что реализовано

- `mobile/` — React Native экранный MVP:
  - Daily Hub (профиль + квесты + claim reward)
  - Insights
  - Mini AI Assistant
- `backend/` — mock API на Node.js (без внешних зависимостей):
  - `GET /profile`
  - `GET /quests/today`
  - `POST /quests/:id/complete`
  - `GET /insights/weekly`
  - `POST /assistant/message`
  - `POST /rewards/claim`

## Быстрый запуск backend

```bash
cd backend
npm run check
npm start
```

Backend стартует на `http://localhost:4000`.

## Что дальше

1. Поднять RN приложение (Expo или RN CLI) и подключить `mobile/App.tsx`.
2. Вынести состояние в Zustand/Redux.
3. Добавить persistent storage (SQLite/Postgres) и авторизацию.
4. Добавить push-реактивации и event analytics dashboard.
