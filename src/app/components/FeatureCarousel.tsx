import { Send, Download, DollarSign, History, Gift, Target } from "lucide-react";
import { useNavigate } from "react-router";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  titleKey: string;
  descriptionKey: string;
  path: string;
  gradient: string;
}

export function FeatureCarousel() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const features: Feature[] = [
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

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isDragging && scrollContainerRef.current) {
        const nextIndex = (currentIndex + 1) % features.length;
        setCurrentIndex(nextIndex);
        scrollContainerRef.current.scrollTo({
          left: nextIndex * (scrollContainerRef.current.offsetWidth * 0.85),
          behavior: "smooth",
        });
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex, isDragging]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const cardWidth = scrollContainerRef.current.offsetWidth * 0.85;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className="w-full">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide"
        onScroll={handleScroll}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.path}
              className="flex-shrink-0 snap-start"
              style={{ width: "85%" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => navigate(feature.path)}
                className={`w-full bg-gradient-to-br ${feature.gradient} rounded-2xl p-6 shadow-lg text-left text-white transition-transform active:scale-95`}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 rounded-xl p-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{t(feature.titleKey)}</h3>
                    <p className="text-sm text-white/90">{t(feature.descriptionKey)}</p>
                  </div>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              scrollContainerRef.current?.scrollTo({
                left: index * (scrollContainerRef.current.offsetWidth * 0.85),
                behavior: "smooth",
              });
            }}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex ? "bg-primary w-8" : "bg-gray-300 w-1.5"
            }`}
          />
        ))}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}