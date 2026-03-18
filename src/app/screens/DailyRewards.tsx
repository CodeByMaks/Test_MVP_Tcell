import { Header } from "../components/Header";
import { useLanguage } from "../contexts/LanguageContext";
import { usePlus } from "../contexts/PlusContext";
import { Gift, Check, Lock, Zap, Crown } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const streakRewards = [
  { day: 1, mb: 50, claimed: true },
  { day: 2, mb: 60, claimed: true },
  { day: 3, mb: 70, claimed: true },
  { day: 4, mb: 80, claimed: true },
  { day: 5, mb: 100, claimed: false, bonus: true },
  { day: 6, mb: 80, claimed: false },
  { day: 7, mb: 90, claimed: false },
  { day: 10, mb: 200, claimed: false, milestone: true },
  { day: 30, mb: 500, claimed: false, milestone: true },
];

export default function DailyRewards() {
  const { t } = useLanguage();
  const { isPlusSubscriber } = usePlus();
  const [currentStreak, setCurrentStreak] = useState(4);
  const [claimed, setClaimed] = useState(false);

  const dailyReward = isPlusSubscriber ? 100 : 50;

  const handleClaim = () => {
    setClaimed(true);
    setCurrentStreak(5);
    alert(`${t("rewards.claimed")} ${dailyReward}${t("common.mb")}!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title={t("rewards.title")} />

      <div className="p-5 space-y-6">
        {/* Today's Reward */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`${
            isPlusSubscriber
              ? "bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500"
              : "bg-gradient-to-br from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-800"
          } rounded-2xl p-6 text-white shadow-lg`}
        >
          <div className="flex items-center gap-2 mb-4">
            {isPlusSubscriber && <Crown className="w-6 h-6" />}
            <Gift className="w-6 h-6" />
            <h2 className="text-xl font-bold">{t("rewards.todayReward")}</h2>
          </div>
          <div className="text-center py-6">
            <motion.div
              animate={claimed ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <p className="text-5xl font-bold mb-2">+{dailyReward} {t("common.mb")}</p>
            </motion.div>
            <p
              className={
                isPlusSubscriber ? "text-yellow-50" : "text-purple-200"
              }
            >
              {t("rewards.dayOfStreak")} {currentStreak} {t("rewards.streak")} (
              +{dailyReward} {t("common.mb")})
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleClaim}
            disabled={claimed}
            className={`w-full rounded-xl p-4 font-semibold transition-all ${
              claimed
                ? "bg-white/20 text-white/60 cursor-not-allowed"
                : "bg-white text-purple-600 shadow-lg"
            }`}
          >
            {claimed ? (
              <span className="flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                {t("rewards.claimed")}
              </span>
            ) : (
              t("rewards.claim")
            )}
          </motion.button>
        </motion.div>

        {/* Streak Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
        >
          <h3 className="font-semibold dark:text-white mb-4">{t("rewards.loginStreak")}</h3>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-orange-500" />
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{currentStreak} {t("rewards.days")}</p>
          </div>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentStreak / 30) * 100}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="bg-gradient-to-r from-purple-600 to-purple-700 h-full"
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{30 - currentStreak} {t("rewards.daysToMilestone")}</p>
        </motion.div>

        {/* Streak Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-semibold dark:text-white mb-3">{t("rewards.streakRewards")}</h3>
          <div className="grid grid-cols-3 gap-3">
            {streakRewards.map((reward, index) => {
              const isActive = currentStreak >= reward.day;
              const isClaimed = reward.claimed;

              return (
                <motion.div
                  key={reward.day}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className={`rounded-xl p-4 text-center border-2 ${
                    isClaimed
                      ? "bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700"
                      : isActive
                      ? "bg-white dark:bg-gray-800 border-purple-600 shadow-md"
                      : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                  }`}
                >
                  <div className="mb-2">
                    {isClaimed ? (
                      <div className="w-8 h-8 mx-auto bg-purple-600 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    ) : isActive ? (
                      <div className="w-8 h-8 mx-auto bg-purple-600 rounded-full flex items-center justify-center">
                        <Gift className="w-5 h-5 text-white" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 mx-auto bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{t("rewards.day")} {reward.day}</p>
                  <p className={`font-bold ${isActive ? "text-purple-600 dark:text-purple-400" : "text-gray-400"}`}>
                    {reward.mb}{t("common.mb")}
                  </p>
                  {reward.bonus && <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">{t("rewards.bonus")}</p>}
                  {reward.milestone && <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">{t("rewards.milestone")}</p>}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-xl p-4"
        >
          <p className="text-sm text-purple-900 dark:text-purple-100">{t("rewards.tip")}</p>
        </motion.div>

        {/* Streak Warning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-700 rounded-xl p-4"
        >
          <p className="text-sm text-orange-900 dark:text-orange-100">{t("rewards.streakWarning")}</p>
        </motion.div>
      </div>
    </div>
  );
}