import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

interface HeaderProps {
  title: string;
  showBack?: boolean;
}

export function Header({ title, showBack = true }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-border z-10 px-5 py-4">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-full hover:bg-secondary dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 dark:text-white" />
          </button>
        )}
        <h1 className="text-xl font-semibold dark:text-white">{title}</h1>
      </div>
    </div>
  );
}