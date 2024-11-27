"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
} from "react";
import type { Entry } from "@/types/income/index";

interface CategoryLimit {
  category: string;
  limit: number;
}

interface AppState {
  entries: Entry[];
  categoryLimits: CategoryLimit[];
  incomeSums: Record<string, number>;
  expenseSums: Record<string, number>;
  totalIncome: number;
  totalExpense: number;
}
type Action =
  | { type: "ADD_ENTRY"; payload: Entry }
  | { type: "DELETE_ENTRY"; payload: string }
  | { type: "EDIT_ENTRY"; payload: Entry }
  | { type: "POPULATE_ENTRIES"; payload: Entry[] }
  | { type: "SET_CATEGORY_LIMIT"; payload: CategoryLimit }
  | { type: "REMOVE_CATEGORY_LIMIT"; payload: string };

const initialState: AppState = {
  entries: [],
  categoryLimits: [],
  incomeSums: {},
  expenseSums: {},
  totalIncome: 0,
  totalExpense: 0,
};

const calculateSums = (entries: Entry[]) => {
  const incomeSums: Record<string, number> = {};
  const expenseSums: Record<string, number> = {};
  let totalIncome = 0;
  let totalExpense = 0;

  for (const entry of entries) {
    const { category, amount, type } = entry;
    const numericAmount =
      typeof amount === "string" ? parseFloat(amount) : amount;

    if (type === "income") {
      incomeSums[category] = (incomeSums[category] || 0) + numericAmount;
      totalIncome += numericAmount;
    } else if (type === "expense") {
      expenseSums[category] = (expenseSums[category] || 0) + numericAmount;
      totalExpense += numericAmount;
    }
  }

  return { incomeSums, expenseSums, totalIncome, totalExpense };
};
const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "ADD_ENTRY":
      const updatedEntries = [...state.entries, action.payload];
      return {
        ...state,
        entries: updatedEntries,
        ...calculateSums(updatedEntries),
      };

    case "DELETE_ENTRY":
      const filteredEntries = state.entries.filter(
        (entry) => entry.id !== action.payload
      );
      return {
        ...state,
        entries: filteredEntries,
        ...calculateSums(filteredEntries),
      };

    case "EDIT_ENTRY":
      const editedEntries = state.entries.map((entry) =>
        entry.id === action.payload.id ? { ...entry, ...action.payload } : entry
      );
      return {
        ...state,
        entries: editedEntries,
        ...calculateSums(editedEntries),
      };

    case "POPULATE_ENTRIES":
      return {
        ...state,
        entries: action.payload,
        ...calculateSums(action.payload),
      };

    case "SET_CATEGORY_LIMIT": {
      const updatedLimits = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      const newCategoryLimits = updatedLimits.reduce(
        (updated, { category, limit }) => {
          const existingIndex = updated.findIndex(
            (item) =>
              item.category.toLowerCase().trim() ===
              category.toLowerCase().trim()
          );

          if (existingIndex >= 0) {
            updated[existingIndex] = { category, limit };
          } else {
            updated.push({ category, limit });
          }

          return updated;
        },
        [...state.categoryLimits]
      );

      return {
        ...state,
        categoryLimits: newCategoryLimits,
      };
    }

    case "REMOVE_CATEGORY_LIMIT":
      return {
        ...state,
        categoryLimits: state.categoryLimits.filter(
          (limit) => limit.category !== action.payload
        ),
      };

    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
};

const AppContext = createContext<
  | {
      state: AppState;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  useEffect(() => {
    const savedEntries = localStorage.getItem("entries");
    const savedLimits = localStorage.getItem("categoryLimits");

    if (savedEntries) {
      const parsedEntries: Entry[] = JSON.parse(savedEntries);
      dispatch({ type: "POPULATE_ENTRIES", payload: parsedEntries });
    }

    if (savedLimits) {
      const parsedLimits: CategoryLimit[] = JSON.parse(savedLimits);
      parsedLimits.forEach((limit) =>
        dispatch({ type: "SET_CATEGORY_LIMIT", payload: limit })
      );
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(state.entries));
    localStorage.setItem(
      "categoryLimits",
      JSON.stringify(state.categoryLimits)
    );
  }, [state.entries, state.categoryLimits]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
