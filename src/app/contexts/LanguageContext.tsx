import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "ru" | "tj" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ru: {
    // Home
    "home.title": "DostNet",
    "home.subtitle": "Делитесь, запрашивайте или продавайте интернет с друзьями. Создайте свою экономику интернета.",
    "home.balance": "Ваш баланс",
    "home.lastActivity": "Последняя активность: Отправлено 500МБ другу",
    "home.enterGamification": "Войти в геймификацию",
    "home.enterGamificationDesc": "Зарабатывайте награды и выполняйте миссии",
    "home.exploreServices": "Изучить услуги",
    "home.exploreServicesDesc": "Просмотр истории и транзакций",
    "home.transactions": "Транзакции",
    "home.friends": "Друзья",
    "home.shared": "Поделились",
    "home.allServices": "Все услуги",
    "home.dostnetPlus": "DostNet Plus",

    // Feature Carousel
    "carousel.sendInternet": "Отправить интернет",
    "carousel.sendInternetDesc": "Мгновенно делитесь МБ с друзьями",
    "carousel.requestInternet": "Запросить интернет",
    "carousel.requestInternetDesc": "Попросите друзей о данных при необходимости",
    "carousel.sellInternet": "Продать интернет",
    "carousel.sellInternetDesc": "Обменяйте неиспользованные данные на деньги",
    "carousel.history": "История интернета",
    "carousel.historyDesc": "Просмотр всех ваших транзакций",
    "carousel.dailyRewards": "Ежедневные награды",
    "carousel.dailyRewardsDesc": "Получите бесплатные МБ сегодня",
    "carousel.missions": "Миссии",
    "carousel.missionsDesc": "Выполняйте задачи и зарабатывайте больше",

    // Send Internet
    "send.title": "Отправить интернет",
    "send.feeInfo": "Взимается комиссия 10% за перевод. Если вы отправите 500МБ, ваш друг получит 450МБ.",
    "send.amount": "Сумма для отправки (МБ)",
    "send.amountPlaceholder": "Введите сумму в МБ",
    "send.friendWillReceive": "Друг получит:",
    "send.selectFriend": "Выберите друга",
    "send.balance": "Баланс",
    "send.button": "Отправить интернет",
    "send.success": "Успешно отправлено",

    // Request Internet
    "request.title": "Запросить интернет",
    "request.amount": "Требуемая сумма (МБ)",
    "request.amountPlaceholder": "Введите сумму в МБ",
    "request.message": "Сообщение (Необязательно)",
    "request.messagePlaceholder": "Мне нужен интернет для срочной работы...",
    "request.requestFrom": "Запросить у",
    "request.button": "Отправить запрос",
    "request.success": "Запрос отправлен успешно!",

    // Sell Internet
    "sell.title": "Продать интернет",
    "sell.feeInfo": "Комиссия платформы 8%. Продайте 1ГБ за 3 сомони, получите 2.76 сомони.",
    "sell.marketRate": "Рыночная ставка",
    "sell.averagePrice": "Средняя цена",
    "sell.activeOffers": "Активные предложения",
    "sell.dataAmount": "Объем данных (МБ)",
    "sell.amountPlaceholder": "Введите сумму в МБ",
    "sell.price": "Ваша цена (Сомони)",
    "sell.pricePlaceholder": "Введите цену в сомони",
    "sell.platformFee": "Комиссия платформы (8%)",
    "sell.youReceive": "Вы получите",
    "sell.button": "Выставить на продажу",
    "sell.success": "Выставлено на продажу",

    // History
    "history.title": "История интернета",
    "history.sent": "Отправлено",
    "history.received": "Получено",
    "history.sold": "Продано",
    "history.recentTransactions": "Последние транзакции",
    "history.fee": "Комиссия:",
    "history.today": "Сегодня",
    "history.yesterday": "Вчера",

    // Daily Rewards
    "rewards.title": "Ежедневные награды",
    "rewards.todayReward": "Награда сегодня",
    "rewards.dayOfStreak": "День",
    "rewards.streak": "вашей серии",
    "rewards.claim": "Получить награду",
    "rewards.claimed": "Получено!",
    "rewards.loginStreak": "Ваша серия входов",
    "rewards.days": "Дней",
    "rewards.daysToMilestone": "дней до рубежа в 30 дней",
    "rewards.streakRewards": "Награды за серии",
    "rewards.day": "День",
    "rewards.bonus": "Бонус!",
    "rewards.milestone": "Рубеж",
    "rewards.tip": "💡 Совет: Входите ежедневно, чтобы поддерживать серию и разблокировать большие награды!",
    "rewards.streakWarning": "⚠️ Пропустите день - серия начнется заново!",

    // Missions
    "missions.title": "Миссии",
    "missions.available": "Доступные миссии",
    "missions.active": "Активные",
    "missions.totalRewards": "Всего наград",
    "missions.yourMissions": "Ваши миссии",
    "missions.sendInternet": "Отправить интернет",
    "missions.sendInternetDesc": "Поделитесь данными с 3 разными друзьями",
    "missions.inviteFriends": "Пригласить друзей",
    "missions.inviteFriendsDesc": "Пригласите 5 друзей в DostNet",
    "missions.firstSale": "Первая продажа",
    "missions.firstSaleDesc": "Продайте интернет впервые",
    "missions.dailyStreak": "Ежедневная серия",
    "missions.dailyStreakDesc": "Поддерживайте 7-дневную серию входов",
    "missions.completed": "выполнено",
    "missions.earned": "Заработано",
    "missions.earn": "Заработать",
    "missions.tip": "💡 Совет: Выполняйте миссии, чтобы заработать дополнительные МБ и разблокировать новые функции!",

    // Gamification
    "gamification.title": "Центр геймификации",
    "gamification.level": "Ваш уровень",
    "gamification.xpProgress": "Прогресс XP",
    "gamification.xpToNext": "XP до достижения уровня",
    "gamification.dailyRewards": "Ежедневные награды",
    "gamification.dailyRewardsDesc": "Получите +50 МБ сегодня",
    "gamification.missions": "Миссии",
    "gamification.missionsDesc": "4 активные миссии",
    "gamification.recentAchievements": "Последние достижения",
    "gamification.firstShare": "Первая отправка",
    "gamification.firstShareDesc": "Отправлено интернет другу",
    "gamification.streakMaster": "Мастер серий",
    "gamification.streakMasterDesc": "4-дневная серия входов",
    "gamification.marketExpert": "Эксперт рынка",
    "gamification.marketExpertDesc": "Выполните 10 продаж",
    "gamification.locked": "Заблокировано",
    "gamification.leaderboard": "Таблица лидеров",
    "gamification.you": "Вы",

    // Common
    "common.mb": "МБ",
    "common.gb": "ГБ",
    "common.somoni": "сомони",

    // All Services
    "allServices.title": "Все услуги",
    "allServices.description": "Изучите все доступные функции DostNet",

    // Marketplace
    "marketplace.title": "Рынок интернета",
    "marketplace.yourListing": "Ваше предложение",
    "marketplace.availableListings": "Доступные предложения",
    "marketplace.buy": "Купить",
    "marketplace.noListings": "Нет активных предложений",
    "marketplace.seller": "Продавец",
    "marketplace.amount": "Количество",
    "marketplace.price": "Цена",
    "marketplace.buySuccess": "Успешно куплено",
    "marketplace.createListing": "Создать предложение",
    "marketplace.edit": "Редактировать",
    "marketplace.remove": "Удалить",

    // Friends List
    "friends.title": "Список друзей",
    "friends.totalFriends": "Всего друзей",
    "friends.remove": "Удалить",
    "friends.addFriend": "Добавить друга",
    "friends.searchPlaceholder": "Поиск друзей...",
    "friends.removeConfirm": "Вы уверены, что хотите удалить из друзей?",
    "friends.removed": "Друг удален",

    // DostNet Plus
    "plus.title": "DostNet Plus",
    "plus.subtitle": "Получите премиум-опыт",
    "plus.monthly": "Ежемесячно",
    "plus.yearly": "Ежегодно",
    "plus.subscribe": "Подписаться сейчас",
    "plus.currentPlan": "Текущий план",
    "plus.benefits": "Преимущества подписки",
    "plus.benefit1": "Нулевая комиссия на отправку",
    "plus.benefit1Desc": "Отправляйте интернет без 10% комиссии",
    "plus.benefit2": "Сниженная комиссия продажи",
    "plus.benefit2Desc": "Только 4% вместо 8% при продаже",
    "plus.benefit3": "Ежедневно +100 МБ",
    "plus.benefit3Desc": "Удвоенная ежедневная награда",
    "plus.benefit4": "Приоритетная поддержка",
    "plus.benefit4Desc": "Помощь в течение 24 часов",
    "plus.benefit5": "Эксклюзивный значок",
    "plus.benefit5Desc": "Показывайте свой премиум-статус",
    "plus.benefit6": "Бонус XP x2",
    "plus.benefit6Desc": "Удвойте свои награды XP",
    "plus.save": "Сэкономьте 20%",
    "plus.perMonth": "в месяц",
    "plus.billedYearly": "оплачивается ежегодно",
  },
  tj: {
    // Home
    "home.title": "DostNet",
    "home.subtitle": "Интернетро бо дӯстон мубодила, дархост ё фурӯш кунед. Иқтисодиёти интернетии худро созед.",
    "home.balance": "Боқимондаи шумо",
    "home.lastActivity": "Фаъолияти охирин: 500МБ ба дӯст фиристода шуд",
    "home.enterGamification": "Ба бозисозӣ даромадан",
    "home.enterGamificationDesc": "Мукофотҳо ба даст оред ва вазифаҳоро иҷро кунед",
    "home.exploreServices": "Хизматҳоро омӯхтан",
    "home.exploreServicesDesc": "Таърих ва транзаксияҳоро дидан",
    "home.transactions": "Транзаксияҳо",
    "home.friends": "Дӯстон",
    "home.shared": "Мубодила шуд",
    "home.allServices": "Ҳамаи хизматҳо",
    "home.dostnetPlus": "DostNet Plus",

    // Feature Carousel
    "carousel.sendInternet": "Интернет фиристодан",
    "carousel.sendInternetDesc": "МБ-ро бо дӯстон фавран мубодила кунед",
    "carousel.requestInternet": "Интернет дархост кардан",
    "carousel.requestInternetDesc": "Аз дӯстон маълумот дархост кунед",
    "carousel.sellInternet": "Интернет фурӯхтан",
    "carousel.sellInternetDesc": "Маълумоти истифоданашударо ба пул табдил диҳед",
    "carousel.history": "Таърихи интернет",
    "carousel.historyDesc": "Ҳамаи транзаксияҳои худро бинед",
    "carousel.dailyRewards": "Мукофотҳои ҳаррӯза",
    "carousel.dailyRewardsDesc": "Имрӯз МБ-и ройгон гиред",
    "carousel.missions": "Вазифаҳо",
    "carousel.missionsDesc": "Вазифаҳоро иҷро карда бештар ба даст оред",

    // Send Internet
    "send.title": "Интернет фиристодан",
    "send.feeInfo": "Комиссияи интиқол 10% татбиқ мешавад. Агар шумо 500МБ фиристед, дӯсти шумо 450МБ мегирад.",
    "send.amount": "Маблағи фиристодашаванда (МБ)",
    "send.amountPlaceholder": "Маблағро бо МБ ворид кунед",
    "send.friendWillReceive": "Дӯст мегирад:",
    "send.selectFriend": "Дӯстро интихоб кунед",
    "send.balance": "Боқимонда",
    "send.button": "Интернет фиристодан",
    "send.success": "Бомуваффақият фиристода шуд",

    // Request Internet
    "request.title": "Интернет дархост кардан",
    "request.amount": "Маблағи лозим (МБ)",
    "request.amountPlaceholder": "Маблағро бо МБ ворид кунед",
    "request.message": "Паём (Ихтиёрӣ)",
    "request.messagePlaceholder": "Барои кори фаврӣ ба ман интернет лозим аст...",
    "request.requestFrom": "Дархост аз",
    "request.button": "Дархост фиристодан",
    "request.success": "Дархост бомуваффақият фиристода шуд!",

    // Sell Internet
    "sell.title": "Интернет фурӯхтан",
    "sell.feeInfo": "Комиссияи платформа 8%. 1ГБ-ро ба 3 сомонӣ фурӯхта, 2.76 сомонӣ мегиред.",
    "sell.marketRate": "Нархи бозор",
    "sell.averagePrice": "Нархи миёна",
    "sell.activeOffers": "Пешниҳодҳои фаъол",
    "sell.dataAmount": "Ҳаҷми маълумот (МБ)",
    "sell.amountPlaceholder": "Маблағро бо МБ ворид кунед",
    "sell.price": "Нархи шумо (Сомонӣ)",
    "sell.pricePlaceholder": "Нархро бо сомонӣ ворид кунед",
    "sell.platformFee": "Комиссияи платформа (8%)",
    "sell.youReceive": "Шумо мегиред",
    "sell.button": "Ба фурӯш гузоштан",
    "sell.success": "Ба фурӯш гузошта шуд",

    // History
    "history.title": "Таърихи интернет",
    "history.sent": "Фиристода шуд",
    "history.received": "Гирифта шуд",
    "history.sold": "Фурӯхта шуд",
    "history.recentTransactions": "Транзаксияҳои охирин",
    "history.fee": "Комиссия:",
    "history.today": "Имрӯз",
    "history.yesterday": "Дирӯз",

    // Daily Rewards
    "rewards.title": "Мукофотҳои ҳаррӯза",
    "rewards.todayReward": "Мукофоти имрӯз",
    "rewards.dayOfStreak": "Рӯз",
    "rewards.streak": "аз силсилаи шумо",
    "rewards.claim": "Мукофот гирифтан",
    "rewards.claimed": "Гирифта шуд!",
    "rewards.loginStreak": "Силсилаи воридшавии шумо",
    "rewards.days": "Рӯз",
    "rewards.daysToMilestone": "рӯз то марҳалаи 30 рӯза",
    "rewards.streakRewards": "Мукофотҳо барои силсилаҳо",
    "rewards.day": "Рӯз",
    "rewards.bonus": "Бонус!",
    "rewards.milestone": "Марҳала",
    "rewards.tip": "💡 Маслиҳат: Ҳар рӯз ворид шавед, то силсиларо нигоҳ доред ва мукофотҳои калонро кушоед!",
    "rewards.streakWarning": "⚠️ Рӯзро ҳафз кунед, бошқа рӯз силсилаи шумо аз нав боз кардан мешавад!",

    // Missions
    "missions.title": "Вазифаҳо",
    "missions.available": "Вазифаҳои дастрас",
    "missions.active": "Фаъол",
    "missions.totalRewards": "Ҳамаи мукофотҳо",
    "missions.yourMissions": "Вазифаҳои шумо",
    "missions.sendInternet": "Интернет фиристодан",
    "missions.sendInternetDesc": "Маълумотро бо 3 дӯсти гуногун мубодила кунед",
    "missions.inviteFriends": "Дӯстонро даъват кардан",
    "missions.inviteFriendsDesc": "5 дӯстро ба DostNet даъват кунед",
    "missions.firstSale": "Фурӯши аввалин",
    "missions.firstSaleDesc": "Бори аввал интернет фурӯхед",
    "missions.dailyStreak": "Силсилаи ҳаррӯза",
    "missions.dailyStreakDesc": "Силсилаи 7-рӯзаи воридшавиро нигоҳ доред",
    "missions.completed": "иҷро шуд",
    "missions.earned": "Ба даст омад",
    "missions.earn": "Ба даст овардан",
    "missions.tip": "💡 Маслиҳат: Вазифаҳоро иҷро карда МБ-и иловагӣ ба даст оред ва имкониятҳои навро кушоед!",

    // Gamification
    "gamification.title": "Маркази бозисозӣ",
    "gamification.level": "Сатҳи шумо",
    "gamification.xpProgress": "Пешрафти XP",
    "gamification.xpToNext": "XP то расидан ба сатҳ",
    "gamification.dailyRewards": "Мукофотҳои ҳаррӯза",
    "gamification.dailyRewardsDesc": "+50 МБ имрӯз гиред",
    "gamification.missions": "Вазифаҳо",
    "gamification.missionsDesc": "4 вазифаи фаъол",
    "gamification.recentAchievements": "Дастовардҳои охирин",
    "gamification.firstShare": "Фиристодани аввалин",
    "gamification.firstShareDesc": "Интернет ба дӯст фиристода шуд",
    "gamification.streakMaster": "Устоди силсилаҳо",
    "gamification.streakMasterDesc": "Силсилаи 4-рӯзаи воридшавӣ",
    "gamification.marketExpert": "Коршиноси бозор",
    "gamification.marketExpertDesc": "10 фурӯш иҷро кунед",
    "gamification.locked": "Қулфшуда",
    "gamification.leaderboard": "Ҷадвали пешсафон",
    "gamification.you": "Шумо",

    // Common
    "common.mb": "МБ",
    "common.gb": "ГБ",
    "common.somoni": "сомонӣ",

    // All Services
    "allServices.title": "Ҳамаи хизматҳо",
    "allServices.description": "Ҳамаи имкониятҳои DostNetро омӯхтан",

    // Marketplace
    "marketplace.title": "Бозори интернет",
    "marketplace.yourListing": "Пешниҳоди шумо",
    "marketplace.availableListings": "Пешниҳодҳои фаъол",
    "marketplace.buy": "Харид кардан",
    "marketplace.noListings": "Пешниҳоди фаъол нист",
    "marketplace.seller": "Коргон",
    "marketplace.amount": "Миқдор",
    "marketplace.price": "Нарх",
    "marketplace.buySuccess": "Бомуваффақият харид карда шуд",
    "marketplace.createListing": "Пешниҳод создан",
    "marketplace.edit": "Таҳрир кардан",
    "marketplace.remove": "Ҳафз кардан",

    // Friends List
    "friends.title": "Ҷадвали дӯстон",
    "friends.totalFriends": "Дӯстони миёна",
    "friends.remove": "Ҳафз кардан",
    "friends.addFriend": "Дӯст сабт кардан",
    "friends.searchPlaceholder": "Дӯстонро таърих дордан...",
    "friends.removeConfirm": "Шумо мисонед, ки дӯстро ҳафз кардан мешавад?",
    "friends.removed": "Дӯст ҳафз карда шуд",

    // DostNet Plus
    "plus.title": "DostNet Plus",
    "plus.subtitle": "Таҷрибаи премиум",
    "plus.monthly": "Ҳар рӯз",
    "plus.yearly": "Ҳар сол",
    "plus.subscribe": "Аз нав абонемент кардан",
    "plus.currentPlan": "Расмийи шумо",
    "plus.benefits": "Фаъолияти абонемент",
    "plus.benefit1": "Комиссияи фиристодан нула",
    "plus.benefit1Desc": "Интернетро бо 10% комиссия фиристодан",
    "plus.benefit2": "Комиссияи фурӯш санҷидан",
    "plus.benefit2Desc": "4% замин аз 8% бо фурӯш",
    "plus.benefit3": "Ҳар рӯз +100 МБ",
    "plus.benefit3Desc": "Нархи миёнаи мукофотҳои ҳаррӯза",
    "plus.benefit4": "Парвардаги асосӣ",
    "plus.benefit4Desc": "Парвардаги дар 24 соат",
    "plus.benefit5": "Нишони махсус",
    "plus.benefit5Desc": "Статуси премиумро намоиш додан",
    "plus.benefit6": "Бонуси XP x2",
    "plus.benefit6Desc": "Мукофотҳои XPро удвоед",
    "plus.save": "20% санҷидан",
    "plus.perMonth": "Ҳар рӯз",
    "plus.billedYearly": "Абонементи соли асосӣ",
  },
  en: {
    // Home
    "home.title": "DostNet",
    "home.subtitle": "Share, request or trade internet with your friends. Create your own internet economy.",
    "home.balance": "Your Balance",
    "home.lastActivity": "Last activity: Sent 500MB to friend",
    "home.enterGamification": "Enter Gamification",
    "home.enterGamificationDesc": "Earn rewards & complete missions",
    "home.exploreServices": "Explore Services",
    "home.exploreServicesDesc": "View history & transactions",
    "home.transactions": "Transactions",
    "home.friends": "Friends",
    "home.shared": "GB Shared",
    "home.allServices": "All Services",
    "home.dostnetPlus": "DostNet Plus",

    // Feature Carousel
    "carousel.sendInternet": "Send Internet",
    "carousel.sendInternetDesc": "Share MB with friends instantly",
    "carousel.requestInternet": "Request Internet",
    "carousel.requestInternetDesc": "Ask friends for data when needed",
    "carousel.sellInternet": "Sell Internet",
    "carousel.sellInternetDesc": "Trade unused data for money",
    "carousel.history": "Internet History",
    "carousel.historyDesc": "View all your transactions",
    "carousel.dailyRewards": "Daily Rewards",
    "carousel.dailyRewardsDesc": "Claim your free MB today",
    "carousel.missions": "Missions",
    "carousel.missionsDesc": "Complete tasks and earn more",

    // Send Internet
    "send.title": "Send Internet",
    "send.feeInfo": "10% transfer fee applies. If you send 500MB, your friend receives 450MB.",
    "send.amount": "Amount to Send (MB)",
    "send.amountPlaceholder": "Enter amount in MB",
    "send.friendWillReceive": "Friend will receive:",
    "send.selectFriend": "Select Friend",
    "send.balance": "Balance",
    "send.button": "Send Internet",
    "send.success": "Successfully sent",

    // Request Internet
    "request.title": "Request Internet",
    "request.amount": "Amount Needed (MB)",
    "request.amountPlaceholder": "Enter amount in MB",
    "request.message": "Message (Optional)",
    "request.messagePlaceholder": "I need internet for urgent work...",
    "request.requestFrom": "Request From",
    "request.button": "Send Request",
    "request.success": "Request sent successfully!",

    // Sell Internet
    "sell.title": "Sell Internet",
    "sell.feeInfo": "8% platform commission. Sell 1GB for 3 somoni, receive 2.76 somoni.",
    "sell.marketRate": "Market Rate",
    "sell.averagePrice": "Average Price",
    "sell.activeOffers": "Active Offers",
    "sell.dataAmount": "Data Amount (MB)",
    "sell.amountPlaceholder": "Enter amount in MB",
    "sell.price": "Your Price (Somoni)",
    "sell.pricePlaceholder": "Enter price in somoni",
    "sell.platformFee": "Platform fee (8%)",
    "sell.youReceive": "You receive",
    "sell.button": "List for Sale",
    "sell.success": "Listed for sale",

    // History
    "history.title": "Internet History",
    "history.sent": "Sent",
    "history.received": "Received",
    "history.sold": "Sold",
    "history.recentTransactions": "Recent Transactions",
    "history.fee": "Fee:",
    "history.today": "Today",
    "history.yesterday": "Yesterday",

    // Daily Rewards
    "rewards.title": "Daily Rewards",
    "rewards.todayReward": "Today's Reward",
    "rewards.dayOfStreak": "Day",
    "rewards.streak": "of your streak",
    "rewards.claim": "Claim Reward",
    "rewards.claimed": "Claimed!",
    "rewards.loginStreak": "Your Login Streak",
    "rewards.days": "Days",
    "rewards.daysToMilestone": "days to 30-day milestone",
    "rewards.streakRewards": "Streak Rewards",
    "rewards.day": "Day",
    "rewards.bonus": "Bonus!",
    "rewards.milestone": "Milestone",
    "rewards.tip": "💡 Tip: Log in daily to maintain your streak and unlock bigger rewards!",
    "rewards.streakWarning": "⚠️ Miss a day - your streak will start over!",

    // Missions
    "missions.title": "Missions",
    "missions.available": "Available Missions",
    "missions.active": "Active",
    "missions.totalRewards": "Total Rewards",
    "missions.yourMissions": "Your Missions",
    "missions.sendInternet": "Send Internet",
    "missions.sendInternetDesc": "Share data with 3 different friends",
    "missions.inviteFriends": "Invite Friends",
    "missions.inviteFriendsDesc": "Invite 5 friends to DostNet",
    "missions.firstSale": "First Sale",
    "missions.firstSaleDesc": "Sell internet for the first time",
    "missions.dailyStreak": "Daily Streak",
    "missions.dailyStreakDesc": "Maintain 7-day login streak",
    "missions.completed": "completed",
    "missions.earned": "Earned",
    "missions.earn": "Earn",
    "missions.tip": "💡 Tip: Complete missions to earn extra MB and unlock new features!",

    // Gamification
    "gamification.title": "Gamification Hub",
    "gamification.level": "Your Level",
    "gamification.xpProgress": "XP Progress",
    "gamification.xpToNext": "XP to reach Level",
    "gamification.dailyRewards": "Daily Rewards",
    "gamification.dailyRewardsDesc": "Claim +50 MB today",
    "gamification.missions": "Missions",
    "gamification.missionsDesc": "4 active missions",
    "gamification.recentAchievements": "Recent Achievements",
    "gamification.firstShare": "First Share",
    "gamification.firstShareDesc": "Sent internet to a friend",
    "gamification.streakMaster": "Streak Master",
    "gamification.streakMasterDesc": "4-day login streak",
    "gamification.marketExpert": "Market Expert",
    "gamification.marketExpertDesc": "Complete 10 sales",
    "gamification.locked": "Locked",
    "gamification.leaderboard": "Leaderboard",
    "gamification.you": "You",

    // Common
    "common.mb": "MB",
    "common.gb": "GB",
    "common.somoni": "somoni",

    // All Services
    "allServices.title": "All Services",
    "allServices.description": "Explore all available features of DostNet",

    // Marketplace
    "marketplace.title": "Internet Marketplace",
    "marketplace.yourListing": "Your Listing",
    "marketplace.availableListings": "Available Listings",
    "marketplace.buy": "Buy",
    "marketplace.noListings": "No active listings",
    "marketplace.seller": "Seller",
    "marketplace.amount": "Amount",
    "marketplace.price": "Price",
    "marketplace.buySuccess": "Successfully purchased",
    "marketplace.createListing": "Create Listing",
    "marketplace.edit": "Edit",
    "marketplace.remove": "Remove",

    // Friends List
    "friends.title": "Friends List",
    "friends.totalFriends": "Total Friends",
    "friends.remove": "Remove",
    "friends.addFriend": "Add Friend",
    "friends.searchPlaceholder": "Search friends...",
    "friends.removeConfirm": "Are you sure you want to remove from friends?",
    "friends.removed": "Friend removed",

    // DostNet Plus
    "plus.title": "DostNet Plus",
    "plus.subtitle": "Get premium experience",
    "plus.monthly": "Monthly",
    "plus.yearly": "Yearly",
    "plus.subscribe": "Subscribe now",
    "plus.currentPlan": "Current Plan",
    "plus.benefits": "Subscription Benefits",
    "plus.benefit1": "Zero transfer fee",
    "plus.benefit1Desc": "Send internet without 10% fee",
    "plus.benefit2": "Reduced selling fee",
    "plus.benefit2Desc": "4% instead of 8% on sales",
    "plus.benefit3": "Daily +100 MB",
    "plus.benefit3Desc": "Double daily reward",
    "plus.benefit4": "Priority support",
    "plus.benefit4Desc": "Help within 24 hours",
    "plus.benefit5": "Exclusive badge",
    "plus.benefit5Desc": "Showcase your premium status",
    "plus.benefit6": "Bonus XP x2",
    "plus.benefit6Desc": "Double your XP rewards",
    "plus.save": "Save 20%",
    "plus.perMonth": "per month",
    "plus.billedYearly": "billed annually",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ru");

  useEffect(() => {
    const saved = localStorage.getItem("dostnet-language") as Language;
    if (saved && (saved === "ru" || saved === "tj" || saved === "en")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("dostnet-language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.ru] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}