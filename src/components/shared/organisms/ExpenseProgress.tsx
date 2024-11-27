"use client";

import React, { useMemo } from "react";
import { Card, CardBody, CardHeader, Progress } from "@nextui-org/react";
import { useAppContext } from "@/context/AppContext";

const GeneralExpenseProgress = () => {
  const { state } = useAppContext();
  const { entries, categoryLimits } = state;

  const categoryOptions = useMemo(
    () => ["Rent", "Utilities", "Groceries", "Other"],
    []
  );
  const expensesByCategory = useMemo(() => {
    const groupedExpenses: Record<string, number> = {};

    entries.forEach((entry) => {
      if (entry.type === "expense") {
        const category = entry.category.toLowerCase();
        const amount =
          typeof entry.amount === "string"
            ? parseFloat(entry.amount)
            : entry.amount;
        groupedExpenses[category] = (groupedExpenses[category] || 0) + amount;
      }
    });

    categoryOptions.forEach((category) => {
      const normalizedCategory = category.toLowerCase();
      if (!groupedExpenses[normalizedCategory]) {
        groupedExpenses[normalizedCategory] = 0;
      }
    });

    return groupedExpenses;
  }, [entries, categoryOptions]);

  return (
    <Card className="w-full ">
      <CardHeader>
        <p className="text-small ">Expense Progress</p>
      </CardHeader>

      <CardBody>
        {categoryOptions.map((category) => {
          const normalizedCategory = category.toLowerCase();
          const totalExpense = expensesByCategory[normalizedCategory] || 0;
          const limit =
            categoryLimits.find(
              (limit) => limit.category.toLowerCase() === normalizedCategory
            )?.limit || 0;

          return (
            <div key={category} className="mb-4">
              <Progress
                label={`${category} Expenses - ${totalExpense.toLocaleString(
                  "en-US"
                )}`}
                size="sm"
                value={totalExpense}
                maxValue={limit}
                color={totalExpense > limit ? "danger" : "success"}
                className="capitalize"
                showValueLabel={true}
              />
              <p className=" mt-1">
                {totalExpense > limit
                  ? `Over the limit by ${(totalExpense - limit).toLocaleString(
                      "en-US"
                    )}`
                  : `Remaining budget: ${(limit - totalExpense).toLocaleString(
                      "en-US"
                    )}`}
              </p>
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
};

export default GeneralExpenseProgress;
