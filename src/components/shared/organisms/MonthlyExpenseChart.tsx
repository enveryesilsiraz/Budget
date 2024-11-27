"use client";

import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAppContext } from "@/context/AppContext";
import moment from "moment";
import {
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";

const MonthlyExpenseChart = () => {
  const { state } = useAppContext();
  const { entries } = state;

  const [selectedMonth, setSelectedMonth] = useState<string>(
    moment().format("YYYY-MM")
  );

  const categoryColors: Record<string, string> = {
    rent: "#f87171",        
    groceries: "#34d399",   
    utilities: "#60a5fa",  
    other: "#fbbf24",         };

  const filteredData = useMemo(() => {
    const groupedData: Record<string, Record<string, string | number>> = {};

    entries.forEach((entry) => {
      if (entry.type === "expense") {
        const date = entry.date;
        const category = entry.category;
        const amount =
          typeof entry.amount === "string"
            ? parseFloat(entry.amount)
            : entry.amount;
        const entryMonth = moment(date).format("YYYY-MM");
        if (entryMonth !== selectedMonth) return;

        const formattedDate = moment(date).format("YYYY-MM-DD");

        if (!groupedData[formattedDate]) {
          groupedData[formattedDate] = { name: formattedDate };
        }

        groupedData[formattedDate][category] =
          Number(groupedData[formattedDate][category] || 0) + amount;
      }
    });

    return Object.values(groupedData).sort(
      (a, b) =>
        new Date(a.name as string).getTime() -
        new Date(b.name as string).getTime()
    );
  }, [entries, selectedMonth]);
  const categories = useMemo(() => {
    const categorySet = new Set<string>();

    entries.forEach((entry) => {
      if (entry.type === "expense") {
        categorySet.add(entry.category);
      }
    });

    return Array.from(categorySet);
  }, [entries]);
  const availableMonths = useMemo(() => {
    const monthsSet = new Set<string>();

    entries.forEach((entry) => {
      if (entry.type === "expense") {
        const entryMonth = moment(entry.date).format("YYYY-MM");
        monthsSet.add(entryMonth);
      }
    });

    return Array.from(monthsSet).sort((a, b) => moment(a).diff(moment(b)));
  }, [entries]);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <p className="text-small  w-full z-[-5]">
            Monthly Expenses
          </p>
          <Select
            value={selectedMonth}
            onChange={(value) =>
              setSelectedMonth(value.target.value.toString())
            }
          >
            {availableMonths.map((month) => (
              <SelectItem key={month} value={month}>
                {moment(month).format("MMMM YYYY")}
              </SelectItem>
            ))}
          </Select>
        </div>
      </CardHeader>

      <CardBody>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={filteredData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {categories.map((category) => (
              <Bar
                key={category}
                dataKey={category}
                stackId="a"
                fill={categoryColors[category] || "#cccccc"}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
};

export default MonthlyExpenseChart;
