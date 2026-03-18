import { Header } from "../components/Header";
import { useLanguage } from "../contexts/LanguageContext";
import { Send, Download, DollarSign, ArrowUpRight, ArrowDownLeft, Banknote } from "lucide-react";
import { motion } from "motion/react";

const transactions = [
  {
    id: 1,
    type: "sent",
    amount: "500 MB",
    friend: "Ali Rahimov",
    date: "history.today",
    time: "14:30",
    fee: "50 MB",
  },
  {
    id: 2,
    type: "received",
    amount: "1 GB",
    friend: "Nargis Nazarova",
    date: "history.yesterday",
    time: "18:45",
    fee: null,
  },
  {
    id: 3,
    type: "sold",
    amount: "2 GB",
    price: "6 somoni",
    date: "2",
    time: "",
    fee: "0.48 somoni",
  },
  {
    id: 4,
    type: "sent",
    amount: "300 MB",
    friend: "Jamshid Karimov",
    date: "3",
    time: "",
    fee: "30 MB",
  },
  {
    id: 5,
    type: "received",
    amount: "750 MB",
    friend: "Ali Rahimov",
    date: "5",
    time: "",
    fee: null,
  },
];

export default function InternetHistory() {
  const { t } = useLanguage();

  const getIcon = (type: string) => {
    switch (type) {
      case "sent":
        return ArrowUpRight;
      case "received":
        return ArrowDownLeft;
      case "sold":
        return Banknote;
      default:
        return Send;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "sent":
        return "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/30";
      case "received":
        return "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30";
      case "sold":
        return "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30";
      default:
        return "text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-700";
    }
  };

  const formatDate = (date: string, time: string) => {
    if (date === "history.today" || date === "history.yesterday") {
      return `${t(date)}${time ? `, ${time}` : ""}`;
    }
    return `${date} ${t("rewards.days").toLowerCase()}${time ? ` ${time}` : ""}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title={t("history.title")} />

      <div className="p-5">
        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <Send className="w-5 h-5 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
            <p className="text-xl font-bold text-orange-600 dark:text-orange-400">800</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{t("common.mb")} {t("history.sent")}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <Download className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <p className="text-xl font-bold text-green-600 dark:text-green-400">1.75</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{t("common.gb")} {t("history.received")}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">2 {t("common.gb")}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{t("history.sold")}</p>
          </div>
        </motion.div>

        {/* Transactions List */}
        <div className="space-y-3">
          <h3 className="font-semibold dark:text-white mb-3">{t("history.recentTransactions")}</h3>
          {transactions.map((tx, index) => {
            const Icon = getIcon(tx.type);
            const colorClass = getColor(tx.type);

            return (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-start gap-3">
                  <div className={`rounded-full p-2 ${colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <p className="font-semibold dark:text-white">{t(`history.${tx.type}`)}</p>
                        {"friend" in tx && <p className="text-sm text-gray-500 dark:text-gray-400">{tx.friend}</p>}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold dark:text-white">{tx.amount}</p>
                        {"price" in tx && tx.price && (
                          <p className="text-sm text-green-600 dark:text-green-400">{tx.price}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{formatDate(tx.date, tx.time)}</span>
                      {tx.fee && <span className="text-orange-600 dark:text-orange-400">{t("history.fee")} {tx.fee}</span>}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
