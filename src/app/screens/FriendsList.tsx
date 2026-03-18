import { Header } from "../components/Header";
import { useLanguage } from "../contexts/LanguageContext";
import { useState } from "react";
import { Users, UserMinus, Search, UserPlus } from "lucide-react";
import { motion } from "motion/react";

interface Friend {
  id: string;
  name: string;
  phone: string;
  balance: string;
  avatar: string;
}

export default function FriendsList() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const [friends, setFriends] = useState<Friend[]>([
    {
      id: "1",
      name: "Rustam Karimov",
      phone: "+992 90 123 4567",
      balance: "2.5 GB",
      avatar: "RK",
    },
    {
      id: "2",
      name: "Sardor Mahmadov",
      phone: "+992 93 765 4321",
      balance: "1.8 GB",
      avatar: "SM",
    },
    {
      id: "3",
      name: "Zarina Azimova",
      phone: "+992 91 234 5678",
      balance: "4.2 GB",
      avatar: "ZA",
    },
    {
      id: "4",
      name: "Farrukh Davlatov",
      phone: "+992 92 876 5432",
      balance: "0.9 GB",
      avatar: "FD",
    },
    {
      id: "5",
      name: "Madina Sharifova",
      phone: "+992 90 345 6789",
      balance: "3.1 GB",
      avatar: "MS",
    },
  ]);

  const filteredFriends = friends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.phone.includes(searchQuery)
  );

  const handleRemoveFriend = (friend: Friend) => {
    if (confirm(`${t("friends.removeConfirm")} ${friend.name}?`)) {
      setFriends(friends.filter((f) => f.id !== friend.id));
      alert(`${friend.name} ${t("friends.removed")}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-8">
      <Header title={t("friends.title")} />

      <div className="p-5 space-y-4">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-800 rounded-2xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-full p-3">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-purple-200 text-sm">{t("friends.totalFriends")}</p>
              <p className="text-3xl font-bold">{friends.length}</p>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("friends.searchPlaceholder")}
            className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-purple-600 dark:text-white"
          />
        </motion.div>

        {/* Add Friend Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full bg-white dark:bg-gray-800 border-2 border-purple-600 dark:border-purple-500 text-purple-600 dark:text-purple-400 rounded-xl p-4 font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-sm"
        >
          <UserPlus className="w-5 h-5" />
          {t("friends.addFriend")}
        </motion.button>

        {/* Friends List */}
        <div className="space-y-3">
          {filteredFriends.length > 0 ? (
            filteredFriends.map((friend, index) => (
              <motion.div
                key={friend.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {friend.avatar}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">
                      {friend.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {friend.phone}
                    </p>
                    <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                      {t("send.balance")}: {friend.balance}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveFriend(friend)}
                    className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-2 rounded-lg active:scale-95 transition-transform hover:bg-red-100 dark:hover:bg-red-900/50"
                  >
                    <UserMinus className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center border border-gray-200 dark:border-gray-700">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 dark:text-gray-400">
                {t("friends.searchPlaceholder")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
