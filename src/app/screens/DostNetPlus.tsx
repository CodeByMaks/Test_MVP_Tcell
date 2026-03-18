import { Header } from "../components/Header";
import { useLanguage } from "../contexts/LanguageContext";
import { usePlus } from "../contexts/PlusContext";
import { useState } from "react";
import { Crown, Check, Zap, TrendingDown, Gift, Headphones, Award, Star } from "lucide-react";
import { motion } from "motion/react";

export default function DostNetPlus() {
  const { t } = useLanguage();
  const { isPlusSubscriber, setPlusSubscription } = usePlus();
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly");

  const benefits = [
    {
      icon: TrendingDown,
      titleKey: "plus.benefit1",
      descKey: "plus.benefit1Desc",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/30",
    },
    {
      icon: TrendingDown,
      titleKey: "plus.benefit2",
      descKey: "plus.benefit2Desc",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/30",
    },
    {
      icon: Gift,
      titleKey: "plus.benefit3",
      descKey: "plus.benefit3Desc",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/30",
    },
    {
      icon: Headphones,
      titleKey: "plus.benefit4",
      descKey: "plus.benefit4Desc",
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-900/30",
    },
    {
      icon: Award,
      titleKey: "plus.benefit5",
      descKey: "plus.benefit5Desc",
      color: "text-pink-600 dark:text-pink-400",
      bgColor: "bg-pink-50 dark:bg-pink-900/30",
    },
    {
      icon: Star,
      titleKey: "plus.benefit6",
      descKey: "plus.benefit6Desc",
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/30",
    },
  ];

  const handleSubscribe = () => {
    const price = selectedPlan === "monthly" ? "5" : "48";
    if (confirm(`${t("plus.subscribe")} - ${price} ${t("common.somoni")} (${t(`plus.${selectedPlan}`)})?`)) {
      setPlusSubscription(true);
      alert(`${t("plus.subscribe")} ${t("common.somoni")} ${price}!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-8">
      <Header title={t("plus.title")} />

      <div className="p-5 space-y-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 opacity-20">
            <Crown className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-8 h-8" />
              <h2 className="text-3xl font-bold">{t("plus.title")}</h2>
            </div>
            <p className="text-yellow-50 text-lg">{t("plus.subtitle")}</p>
          </div>
        </motion.div>

        {/* Plan Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={() => setSelectedPlan("monthly")}
              className={`p-4 rounded-xl font-semibold transition-all ${
                selectedPlan === "monthly"
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              <p className="text-sm mb-1">{t("plus.monthly")}</p>
              <p className="text-2xl">5 {t("common.somoni")}</p>
              <p className="text-xs opacity-75">{t("plus.perMonth")}</p>
            </button>

            <button
              onClick={() => setSelectedPlan("yearly")}
              className={`p-4 rounded-xl font-semibold transition-all relative ${
                selectedPlan === "yearly"
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                {t("plus.save")}
              </div>
              <p className="text-sm mb-1">{t("plus.yearly")}</p>
              <p className="text-2xl">48 {t("common.somoni")}</p>
              <p className="text-xs opacity-75">{t("plus.billedYearly")}</p>
            </button>
          </div>
        </motion.div>

        {/* Benefits */}
        <div>
          <h3 className="font-semibold text-lg dark:text-white mb-4">
            {t("plus.benefits")}
          </h3>

          <div className="space-y-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.titleKey}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex gap-4">
                    <div className={`${benefit.bgColor} rounded-xl p-3 flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${benefit.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {t(benefit.titleKey)}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t(benefit.descKey)}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="bg-green-50 dark:bg-green-900/30 rounded-full p-1">
                        <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Subscribe Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={handleSubscribe}
          className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-white rounded-2xl p-5 font-bold text-lg shadow-xl active:scale-95 transition-transform"
        >
          <div className="flex items-center justify-center gap-2">
            <Crown className="w-6 h-6" />
            <span>{t("plus.subscribe")}</span>
          </div>
        </motion.button>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-xl p-4 text-center"
        >
          <p className="text-sm text-purple-900 dark:text-purple-100">
            <Zap className="w-4 h-4 inline mr-1" />
            DostNet Plus {t("plus.benefits")}
          </p>
        </motion.div>
      </div>
    </div>
  );
}