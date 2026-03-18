import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface PlusContextType {
  isPlusSubscriber: boolean;
  setPlusSubscription: (status: boolean) => void;
}

const PlusContext = createContext<PlusContextType | undefined>(undefined);

export function PlusProvider({ children }: { children: ReactNode }) {
  const [isPlusSubscriber, setIsPlusSubscriber] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("dostnet-plus");
    if (saved === "true") {
      setIsPlusSubscriber(true);
    }
  }, []);

  const setPlusSubscription = (status: boolean) => {
    setIsPlusSubscriber(status);
    localStorage.setItem("dostnet-plus", status ? "true" : "false");
  };

  return (
    <PlusContext.Provider value={{ isPlusSubscriber, setPlusSubscription }}>
      {children}
    </PlusContext.Provider>
  );
}

export function usePlus() {
  const context = useContext(PlusContext);
  if (!context) {
    throw new Error("usePlus must be used within PlusProvider");
  }
  return context;
}
