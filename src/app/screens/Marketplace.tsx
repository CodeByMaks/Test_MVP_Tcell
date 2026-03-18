import { Header } from "../components/Header";
import { useLanguage } from "../contexts/LanguageContext";
import { useState } from "react";
import { DollarSign, ShoppingCart, Edit, Trash2, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

interface Listing {
  id: string;
  seller: string;
  amount: number;
  price: number;
  isOwn: boolean;
}

export default function Marketplace() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [ownListing, setOwnListing] = useState<Listing | null>({
    id: "own-1",
    seller: "You",
    amount: 1024,
    price: 3.5,
    isOwn: true,
  });

  const [otherListings, setOtherListings] = useState<Listing[]>([
    {
      id: "1",
      seller: "Rustam K.",
      amount: 2048,
      price: 6.0,
      isOwn: false,
    },
    {
      id: "2",
      seller: "Sardor M.",
      amount: 512,
      price: 1.5,
      isOwn: false,
    },
    {
      id: "3",
      seller: "Zarina A.",
      amount: 1536,
      price: 4.2,
      isOwn: false,
    },
    {
      id: "4",
      seller: "Farrukh D.",
      amount: 768,
      price: 2.3,
      isOwn: false,
    },
    {
      id: "5",
      seller: "Madina S.",
      amount: 3072,
      price: 9.0,
      isOwn: false,
    },
  ]);

  const handleBuy = (listing: Listing) => {
    if (confirm(`${t("marketplace.buy")} ${listing.amount}MB ${t("common.somoni")} ${listing.price}?`)) {
      alert(`${t("marketplace.buySuccess")} ${listing.amount}${t("common.mb")} ${t("marketplace.seller")}: ${listing.seller}!`);
      setOtherListings(otherListings.filter(l => l.id !== listing.id));
    }
  };

  const handleRemoveOwn = () => {
    if (confirm(t("marketplace.remove"))) {
      setOwnListing(null);
      alert(t("marketplace.remove"));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-8">
      <Header title={t("marketplace.title")} />

      <div className="p-5 space-y-6">
        {/* Your Listing */}
        {ownListing ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-800 rounded-2xl p-6 text-white shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">{t("marketplace.yourListing")}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate("/sell")}
                  className="bg-white/20 p-2 rounded-lg active:scale-95 transition-transform"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={handleRemoveOwn}
                  className="bg-white/20 p-2 rounded-lg active:scale-95 transition-transform"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-purple-200 text-sm mb-1">{t("marketplace.amount")}</p>
                  <p className="text-2xl font-bold">{ownListing.amount} {t("common.mb")}</p>
                </div>
                <div>
                  <p className="text-purple-200 text-sm mb-1">{t("marketplace.price")}</p>
                  <p className="text-2xl font-bold">{ownListing.price} {t("common.somoni")}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate("/sell")}
            className="w-full bg-gradient-to-br from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-800 rounded-2xl p-6 text-white shadow-lg active:scale-95 transition-transform"
          >
            <div className="flex items-center justify-center gap-2">
              <Plus className="w-6 h-6" />
              <span className="font-semibold">{t("marketplace.createListing")}</span>
            </div>
          </motion.button>
        )}

        {/* Available Listings */}
        <div>
          <h3 className="font-semibold dark:text-white mb-3 text-lg">
            {t("marketplace.availableListings")}
          </h3>

          {otherListings.length > 0 ? (
            <div className="space-y-3">
              {otherListings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">
                        {listing.seller}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          {listing.amount} {t("common.mb")}
                        </span>
                        <span className="text-purple-600 dark:text-purple-400 font-semibold">
                          {listing.price} {t("common.somoni")}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleBuy(listing)}
                      className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 active:scale-95 transition-transform"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {t("marketplace.buy")}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center border border-gray-200 dark:border-gray-700">
              <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 dark:text-gray-400">{t("marketplace.noListings")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
