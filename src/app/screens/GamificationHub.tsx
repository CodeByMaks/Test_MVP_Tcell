import { Header } from "../components/Header";
import { useLanguage } from "../contexts/LanguageContext";
import { Gift, Target, Trophy, Zap, Star, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

export default function GamificationHub() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title={t("gamification.title")} />

      <div className="p-5 space-y-6">
        {/* User Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-800 rounded-2xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-purple-200 text-sm mb-1">{t("gamification.level")}</p>
              <p className="text-4xl font-bold">Level 5</p>
            </div>
            <div className="bg-white/20 rounded-full p-4">
              <Trophy className="w-8 h-8" />
            </div>
          </div>

          {/* XP Progress */}
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-purple-200">{t("gamification.xpProgress")}</span>
              <span className="font-semibold">850 / 1000</span>
            </div>
            <div className="bg-white/20 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "85%" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="bg-white h-full rounded-full"
              />
            </div>
          </div>
          <p className="text-purple-100 text-sm">150 {t("gamification.xpToNext")} 6</p>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => navigate("/rewards")}
            className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 text-left active:scale-95 transition-transform"
          >
            <div className="bg-purple-100 dark:bg-purple-900/40 rounded-full p-3 w-fit mb-3">
              <Gift className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold dark:text-white mb-1">{t("gamification.dailyRewards")}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t("gamification.dailyRewardsDesc")}</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate("/missions")}
            className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 text-left active:scale-95 transition-transform"
          >
            <div className="bg-purple-100 dark:bg-purple-900/40 rounded-full p-3 w-fit mb-3">
              <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold dark:text-white mb-1">{t("gamification.missions")}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t("gamification.missionsDesc")}</p>
          </motion.button>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
        >
          <h3 className="font-semibold dark:text-white mb-4">{t("gamification.recentAchievements")}</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
              <div className="bg-purple-600 rounded-full p-2">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold dark:text-white">{t("gamification.firstShare")}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t("gamification.firstShareDesc")}</p>
              </div>
              <span className="text-purple-600 dark:text-purple-400 font-semibold">+50 XP</span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
              <div className="bg-purple-600 rounded-full p-2">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold dark:text-white">{t("gamification.streakMaster")}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t("gamification.streakMasterDesc")}</p>
              </div>
              <span className="text-purple-600 dark:text-purple-400 font-semibold">+100 XP</span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-xl opacity-60">
              <div className="bg-gray-400 dark:bg-gray-600 rounded-full p-2">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold dark:text-white">{t("gamification.marketExpert")}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t("gamification.marketExpertDesc")}</p>
              </div>
              <span className="text-gray-500 dark:text-gray-400 font-semibold">{t("gamification.locked")}</span>
            </div>
          </div>
        </motion.div>

        {/* Leaderboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
        >
          <h3 className="font-semibold dark:text-white mb-4">{t("gamification.leaderboard")}</h3>
          <div className="space-y-3">
            {[
              { rank: 1, name: "Ali Rahimov", xp: 2450 },
              { rank: 2, name: "Nargis Nazarova", xp: 1820 },
              { rank: 3, name: t("gamification.you"), xp: 850, isUser: true },
            ].map((user, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  user.isUser ? "bg-purple-50 dark:bg-purple-900/30 border-2 border-purple-200 dark:border-purple-700" : "bg-gray-50 dark:bg-gray-700"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    user.rank === 1
                      ? "bg-yellow-400 text-yellow-900"
                      : user.rank === 2
                      ? "bg-gray-300 text-gray-700"
                      : user.rank === 3
                      ? "bg-orange-400 text-orange-900"
                      : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {user.rank}
                </div>
                <div className="flex-1">
                  <p className={`font-semibold ${user.isUser ? "text-purple-700 dark:text-purple-300" : "dark:text-white"}`}>
                    {user.name}
                  </p>
                </div>
                <span className={`font-semibold ${user.isUser ? "text-purple-600 dark:text-purple-400" : "text-gray-600 dark:text-gray-400"}`}>
                  {user.xp} XP
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
