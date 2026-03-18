import { Header } from "../components/Header";
import { useLanguage } from "../contexts/LanguageContext";
import { useNavigate } from "react-router";
import { Send, Download, DollarSign, History, Gift, Target } from "lucide-react";
import { motion } from "motion/react";

interface Service {
  icon: React.ComponentType<{ className?: string }>;
  titleKey: string;
  descriptionKey: string;
  path: string;
  gradient: string;
}

export default function AllServices() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const services: Service[] = [
    {
      icon: Send,
      titleKey: "carousel.sendInternet",
      descriptionKey: "carousel.sendInternetDesc",
      path: "/send",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: Download,
      titleKey: "carousel.requestInternet",
      descriptionKey: "carousel.requestInternetDesc",
      path: "/request",
      gradient: "from-violet-500 to-violet-600",
    },
    {
      icon: DollarSign,
      titleKey: "carousel.sellInternet",
      descriptionKey: "carousel.sellInternetDesc",
      path: "/sell",
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      icon: History,
      titleKey: "carousel.history",
      descriptionKey: "carousel.historyDesc",
      path: "/history",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: Gift,
      titleKey: "carousel.dailyRewards",
      descriptionKey: "carousel.dailyRewardsDesc",
      path: "/rewards",
      gradient: "from-pink-500 to-pink-600",
    },
    {
      icon: Target,
      titleKey: "carousel.missions",
      descriptionKey: "carousel.missionsDesc",
      path: "/missions",
      gradient: "from-rose-500 to-rose-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title={t("allServices.title")} />

      <div className="p-5 space-y-4">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {t("allServices.description")}
        </p>

        <div className="grid grid-cols-2 gap-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.button
                key={service.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(service.path)}
                className={`bg-gradient-to-br ${service.gradient} rounded-2xl p-6 shadow-lg text-left text-white transition-transform active:scale-95`}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="bg-white/20 rounded-xl p-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t(service.titleKey)}</h3>
                    <p className="text-xs text-white/90">{t(service.descriptionKey)}</p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
