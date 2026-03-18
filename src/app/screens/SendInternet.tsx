import { Header } from "../components/Header";
import { useLanguage } from "../contexts/LanguageContext";
import { usePlus } from "../contexts/PlusContext";
import { useState } from "react";
import { Send, User, Info, Crown } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

const friends = [
  { id: 1, name: "Ali Rahimov", phone: "+992 900 123 456", balance: "1.2 GB" },
  { id: 2, name: "Nargis Nazarova", phone: "+992 900 234 567", balance: "500 MB" },
  { id: 3, name: "Jamshid Karimov", phone: "+992 900 345 678", balance: "2.1 GB" },
];

export default function SendInternet() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isPlusSubscriber } = usePlus();
  const [amount, setAmount] = useState("");
  const [selectedFriend, setSelectedFriend] = useState<number | null>(null);

  const calculateReceived = (sent: string) => {
    const value = parseFloat(sent);
    if (isNaN(value)) return "0";
    // Plus subscribers get 0% fee, regular users get 10% fee
    const feeMultiplier = isPlusSubscriber ? 1.0 : 0.9;
    return (value * feeMultiplier).toFixed(1);
  };

  const handleSend = () => {
    if (amount && selectedFriend) {
      alert(`${t("send.success")} ${amount}${t("common.mb")}! ${t("send.friendWillReceive")} ${calculateReceived(amount)}${t("common.mb")}`);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title={t("send.title")} />

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
                  ? t("plus.benefit1") + " - " + t("plus.benefit1Desc")
                  : t("send.feeInfo")}
              </strong>
            </p>
          </div>
        </motion.div>

        {/* Amount Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
        >
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">{t("send.amount")}</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={t("send.amountPlaceholder")}
            className="w-full text-2xl font-semibold border-b-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white pb-2 focus:border-purple-600 outline-none transition-colors"
          />
          {amount && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
              {t("send.friendWillReceive")} <strong className="text-purple-600 dark:text-purple-400">{calculateReceived(amount)}{t("common.mb")}</strong>
            </p>
          )}
        </motion.div>

        {/* Select Friend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-semibold dark:text-white mb-3">{t("send.selectFriend")}</h3>
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

        {/* Send Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={handleSend}
          disabled={!amount || !selectedFriend}
          className={`w-full rounded-2xl p-5 font-semibold transition-all ${
            amount && selectedFriend
              ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg active:scale-95"
              : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Send className="w-5 h-5" />
            <span>{t("send.button")}</span>
          </div>
        </motion.button>
      </div>
    </div>
  );
}