import { useNavigate } from "react-router";
import { FeatureCarousel } from "../components/FeatureCarousel";
import { SettingsMenu } from "../components/SettingsMenu";
import { useLanguage } from "../contexts/LanguageContext";
import { usePlus } from "../contexts/PlusContext";
import { Wifi, Zap, Grid, Crown } from "lucide-react";
import { motion } from "motion/react";

export default function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isPlusSubscriber } = usePlus();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-purple-700 dark:from-purple-800 dark:to-purple-900 text-white px-5 pt-6 pb-12 rounded-b-[2rem]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Wifi className="w-8 h-8" />
              <h1 className="text-3xl font-bold">{t("home.title")}</h1>
              {isPlusSubscriber && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-2 py-1 rounded-full flex items-center gap-1">
                  <Crown className="w-4 h-4" />
                  <span className="text-xs font-bold">Plus</span>
                </div>
              )}
            </div>
            <SettingsMenu />
          </div>
          <p className="text-purple-100 text-sm leading-relaxed">
            {t("home.subtitle")}
          </p>
        </motion.div>

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-purple-200 text-sm mb-1">{t("home.balance")}</p>
              <p className="text-3xl font-bold">3.2 {t("common.gb")}</p>
            </div>
            <div className="bg-white/20 rounded-full p-3">
              <Zap className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/20">
            <p className="text-purple-100 text-xs">{t("home.lastActivity")}</p>
          </div>
        </motion.div>
      </div>

      {/* Carousel */}
      <div className="px-5 -mt-6 mb-6">
        <FeatureCarousel />
      </div>

      {/* Main Actions */}
      <div className="px-5 space-y-3">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => navigate("/all-services")}
          className="w-full bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 rounded-2xl p-5 shadow-sm active:scale-95 transition-transform"
        >
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p className="font-semibold mb-1">{t("home.allServices")}</p>
              <p className="text-sm text-purple-600 dark:text-purple-400">{t("allServices.description")}</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-2">
              <Grid className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => navigate("/plus")}
          className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-white rounded-2xl p-5 shadow-lg active:scale-95 transition-transform"
        >
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p className="font-semibold mb-1 flex items-center gap-2">
                <Crown className="w-5 h-5" />
                {t("home.dostnetPlus")}
              </p>
              <p className="text-sm text-yellow-50">{t("plus.subtitle")}</p>
            </div>
            <div className="bg-white/20 rounded-full p-2">
              <Crown className="w-5 h-5" />
            </div>
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate("/gamification")}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-800 text-white rounded-2xl p-5 shadow-lg active:scale-95 transition-transform"
        >
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p className="font-semibold mb-1">{t("home.enterGamification")}</p>
              <p className="text-sm text-purple-100">{t("home.enterGamificationDesc")}</p>
            </div>
            <div className="bg-white/20 rounded-full p-2">
              <Zap className="w-5 h-5" />
            </div>
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={() => navigate("/history")}
          className="w-full bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 rounded-2xl p-5 shadow-sm active:scale-95 transition-transform"
        >
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p className="font-semibold mb-1">{t("home.exploreServices")}</p>
              <p className="text-sm text-purple-600 dark:text-purple-400">{t("home.exploreServicesDesc")}</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-2">
              <Wifi className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </motion.button>
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="px-5 mt-6"
      >
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">12</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{t("home.transactions")}</p>
          </div>
          <button 
            onClick={() => navigate("/friends")}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 text-center active:scale-95 transition-transform"
          >
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">5</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{t("home.friends")}</p>
          </button>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">3.5</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{t("home.shared")}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}