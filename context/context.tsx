"use client";
import React, { useContext, useState } from "react";
import { createContext } from "react";

interface AppContextType {
  scriptLines: string[];
  setScriptLines: React.Dispatch<React.SetStateAction<string[]>>;
}

export const AppContext = createContext<AppContextType>({
  scriptLines: [],
  setScriptLines: () => {},
});

export default function Provider({ children }: { children: React.ReactNode }) {
  const [scriptLines, setScriptLines] = useState<string[]>([]);

  return (
    <AppContext.Provider value={{ scriptLines, setScriptLines }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("use context is undefined");
  }
  return context;
};
