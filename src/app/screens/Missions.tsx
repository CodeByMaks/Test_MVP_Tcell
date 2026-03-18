import { Header } from "../components/Header";
import { useLanguage } from "../contexts/LanguageContext";
import { Target, Send, UserPlus, CheckCircle2, Circle, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface Mission {
  id: number;
  titleKey: string;
  descriptionKey: string;
  reward: string;
  progress: number;
  total: number;
  completed: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

export default function Missions() {
  const { t } = useLanguage();
  
  const initialMissions: Mission[] = [
    {
      id: 1,
      titleKey: "missions.sendInternet",
      descriptionKey: "missions.sendInternetDesc",
      reward: "100",
      progress: 2,
      total: 3,
      completed: false,
      icon: Send,
    },
    {
      id: 2,
      titleKey: "missions.inviteFriends",
      descriptionKey: "missions.inviteFriendsDesc",
      reward: "250",
      progress: 1,
      total: 5,
      completed: false,
      icon: UserPlus,
    },
    {
      id: 3,
      titleKey: "missions.firstSale",
      descriptionKey: "missions.firstSaleDesc",
      reward: "150",
      progress: 0,
      total: 1,
      completed: false,
      icon: Zap,
    },
    {
      id: 4,
      titleKey: "missions.dailyStreak",
      descriptionKey: "missions.dailyStreakDesc",
      reward: "200",
      progress: 4,
      total: 7,
      completed: false,
      icon: Target,
    },
  ];

  const [missions] = useState(initialMissions);
  const totalRewards = missions.reduce((sum, m) => {
    if (m.completed) return sum;
    const mb = parseInt(m.reward);
    return sum + mb;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title={t("missions.title")} />

      <div className="p-5 space-y-6">
        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-800 rounded-2xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-6 h-6" />
            <h2 className="text-xl font-bold">{t("missions.available")}</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-purple-200 text-sm mb-1">{t("missions.active")}</p>
              <p className="text-3xl font-bold">{missions.filter((m) => !m.completed).length}</p>
            </div>
            <div>
              <p className="text-purple-200 text-sm mb-1">{t("missions.totalRewards")}</p>
              <p className="text-3xl font-bold">{totalRewards} {t("common.mb")}</p>
            </div>
          </div>
        </motion.div>

        {/* Missions List */}
        <div className="space-y-3">
          <h3 className="font-semibold dark:text-white">{t("missions.yourMissions")}</h3>
          {missions.map((mission, index) => {
            const Icon = mission.icon;
            const progressPercent = (mission.progress / mission.total) * 100;

            return (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border-2 ${
                  mission.completed ? "border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20" : "border-gray-100 dark:border-gray-700"
                }`}
              >
                <div className="flex gap-4">
                  <div
                    className={`rounded-full p-3 flex-shrink-0 ${
                      mission.completed ? "bg-green-100 dark:bg-green-900/40" : "bg-purple-100 dark:bg-purple-900/40"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${mission.completed ? "text-green-600 dark:text-green-400" : "text-purple-600 dark:text-purple-400"}`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold dark:text-white">{t(mission.titleKey)}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{t(mission.descriptionKey)}</p>
                      </div>
                      {mission.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 ml-2" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600 flex-shrink-0 ml-2" />
                      )}
                    </div>

                    {/* Progress Bar */}
                    {!mission.completed && (
                      <div className="mb-3">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                            className="bg-gradient-to-r from-purple-600 to-purple-700 h-full"
                          />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {mission.progress}/{mission.total} {t("missions.completed")}
                        </p>
                      </div>
                    )}

                    {/* Reward Badge */}
                    <div
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                        mission.completed
                          ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
                          : "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300"
                      }`}
                    >
                      <Zap className="w-4 h-4" />
                      <span>
                        {mission.completed ? t("missions.earned") : t("missions.earn")} {mission.reward} {t("common.mb")}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-xl p-4"
        >
          <p className="text-sm text-purple-900 dark:text-purple-100">{t("missions.tip")}</p>
        </motion.div>
      </div>
    </div>
  );
}
