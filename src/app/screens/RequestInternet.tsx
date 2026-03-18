import { Header } from "../components/Header";
import { useLanguage } from "../contexts/LanguageContext";
import { useState } from "react";
import { Download, User } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

const friends = [
  { id: 1, name: "Ali Rahimov", phone: "+992 900 123 456", balance: "1.2 GB" },
  { id: 2, name: "Nargis Nazarova", phone: "+992 900 234 567", balance: "500 MB" },
  { id: 3, name: "Jamshid Karimov", phone: "+992 900 345 678", balance: "2.1 GB" },
];

export default function RequestInternet() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [amount, setAmount] = useState("");
  const [selectedFriend, setSelectedFriend] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const handleRequest = () => {
    if (amount && selectedFriend) {
      alert(`${t("request.success")} ${amount}${t("common.mb")}`);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title={t("request.title")} />

      <div className="p-5 space-y-6">
        {/* Amount Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
        >
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">{t("request.amount")}</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={t("request.amountPlaceholder")}
            className="w-full text-2xl font-semibold border-b-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white pb-2 focus:border-purple-600 outline-none transition-colors"
          />
        </motion.div>

        {/* Message Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
        >
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">{t("request.message")}</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("request.messagePlaceholder")}
            className="w-full border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl p-3 focus:border-purple-600 outline-none transition-colors resize-none"
            rows={3}
          />
        </motion.div>

        {/* Select Friend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-semibold dark:text-white mb-3">{t("request.requestFrom")}</h3>
          <div className="space-y-2">
            {friends.map((friend, index) => (
              <motion.button
                key={friend.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => setSelectedFriend(friend.id)}
                className={`w-full bg-white dark:bg-gray-800 rounded-xl p-4 text-left transition-all ${
                  selectedFriend === friend.id
                    ? "border-2 border-purple-600 shadow-md"
                    : "border border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-2">
                    <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold dark:text-white">{friend.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{friend.phone}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t("send.balance")}</p>
                    <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">{friend.balance}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Request Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={handleRequest}
          disabled={!amount || !selectedFriend}
          className={`w-full rounded-2xl p-5 font-semibold transition-all ${
            amount && selectedFriend
              ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg active:scale-95"
              : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            <span>{t("request.button")}</span>
          </div>
        </motion.button>
      </div>
    </div>
  );
}