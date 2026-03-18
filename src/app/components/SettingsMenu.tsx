import { Settings, Moon, Sun, Languages, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

export function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: "ru" as const, label: "Русский", flag: "🇷🇺" },
    { code: "tj" as const, label: "Тоҷикӣ", flag: "🇹🇯" },
    { code: "en" as const, label: "English", flag: "🇬🇧" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
      >
        <Settings className="w-5 h-5 text-white" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
            >
              {/* Theme Toggle */}
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 px-2">
                  {language === "ru" ? "ТЕМА" : language === "tj" ? "МАВЗӮЪ" : "THEME"}
                </p>
                <button
                  onClick={() => {
                    toggleTheme();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {theme === "light" ? (
                      <Sun className="w-5 h-5 text-orange-500" />
                    ) : (
                      <Moon className="w-5 h-5 text-purple-500" />
                    )}
                    <span className="font-medium text-gray-900 dark:text-white">
                      {theme === "light"
                        ? language === "ru"
                          ? "Светлая"
                          : language === "tj"
                          ? "Равшан"
                          : "Light"
                        : language === "ru"
                        ? "Темная"
                        : language === "tj"
                        ? "Торик"
                        : "Dark"}
                    </span>
                  </div>
                </button>
              </div>

              {/* Language Selection */}
              <div className="p-3">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 px-2">
                  {language === "ru" ? "ЯЗЫК" : language === "tj" ? "ЗАБОН" : "LANGUAGE"}
                </p>
                <div className="space-y-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                        language === lang.code
                          ? "bg-purple-100 dark:bg-purple-900/30"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{lang.flag}</span>
                        <span
                          className={`font-medium ${
                            language === lang.code
                              ? "text-purple-700 dark:text-purple-300"
                              : "text-gray-900 dark:text-white"
                          }`}
                        >
                          {lang.label}
                        </span>
                      </div>
                      {language === lang.code && (
                        <Check className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
