import { Header } from "../components/Header";
import { useLanguage } from "../contexts/LanguageContext";
import { usePlus } from "../contexts/PlusContext";
import { useState } from "react";
import { DollarSign, TrendingUp, Info, Crown } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

export default function SellInternet() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isPlusSubscriber } = usePlus();
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");

  const calculateCommission = (priceValue: string) => {
    const value = parseFloat(priceValue);
    if (isNaN(value)) return "0";
    // Plus subscribers get 4% fee, regular users get 8% fee
    const feeRate = isPlusSubscriber ? 0.04 : 0.08;
    return (value * feeRate).toFixed(2);
  };

  const calculateReceived = (priceValue: string) => {
    const value = parseFloat(priceValue);
    if (isNaN(value)) return "0";
    // Plus subscribers get 4% fee, regular users get 8% fee
    const receiveRate = isPlusSubscriber ? 0.96 : 0.92;
    return (value * receiveRate).toFixed(2);
  };

  const handleList = () => {
    if (amount && price) {
      alert(`${t("sell.success")} ${amount}${t("common.mb")} ${price} ${t("common.somoni")}!`);
      navigate("/marketplace");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title={t("sell.title")} />

      <div className="p-5 space-y-6">
        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${
            isPlusSubscriber
              ? "bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 border-yellow-600"
              : "bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700"
          } border rounded-xl p-4 flex gap-3`}
        >
          {isPlusSubscriber ? (
            <Crown className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
          ) : (
            <Info className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
          )}
          <div>
            <p className={`text-sm ${isPlusSubscriber ? "text-white" : "text-purple-900 dark:text-purple-100"}`}>
              <strong>
                {isPlusSubscriber
                  ? t("plus.benefit2") + " - " + t("plus.benefit2Desc")
                  : t("sell.feeInfo")}
              </strong>
            </p>
          </div>
        </motion.div>

        {/* Market Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-800 rounded-2xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5" />
            <h3 className="font-semibold">{t("sell.marketRate")}</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-purple-200 text-sm mb-1">{t("sell.averagePrice")}</p>
              <p className="text-2xl font-bold">3 {t("common.somoni")}/{t("common.gb")}</p>
            </div>
            <div>
              <p className="text-purple-200 text-sm mb-1">{t("sell.activeOffers")}</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </motion.div>

        {/* Amount Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
        >
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">{t("sell.dataAmount")}</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={t("sell.amountPlaceholder")}
            className="w-full text-2xl font-semibold border-b-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white pb-2 focus:border-purple-600 outline-none transition-colors"
          />
        </motion.div>

        {/* Price Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
        >
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">{t("sell.price")}</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder={t("sell.pricePlaceholder")}
            className="w-full text-2xl font-semibold border-b-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white pb-2 focus:border-purple-600 outline-none transition-colors"
          />
          {price && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">{t("sell.platformFee")}</span>
                <span className="font-semibold text-gray-900 dark:text-white">{calculateCommission(price)} {t("common.somoni")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">{t("sell.youReceive")}</span>
                <span className="font-semibold text-purple-600 dark:text-purple-400">{calculateReceived(price)} {t("common.somoni")}</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* List Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={handleList}
          disabled={!amount || !price}
          className={`w-full rounded-2xl p-5 font-semibold transition-all ${
            amount && price
              ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg active:scale-95"
              : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <DollarSign className="w-5 h-5" />
            <span>{t("sell.button")}</span>
          </div>
        </motion.button>
      </div>
    </div>
  );
}