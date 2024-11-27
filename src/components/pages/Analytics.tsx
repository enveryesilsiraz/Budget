import React from "react";
import MonthlyIncomeChart from "../shared/organisms/MonthlyIncomeChart";
import YearlyIncomeChart from "../shared/organisms/YearlyIncomeChart";
import YearlyExpenseChart from "../shared/organisms/YearlyExpenseChart";
import MonthlyExpenseChart from "../shared/organisms/MonthlyExpenseChart";
import ExpenseProgress from "../shared/organisms/ExpenseProgress";

const Analytics = () => (
  <div className="p-6">
    <div className=" py-4 lg:ps-12 lg:pe-3 px-0 ">
      <h1 className="text-2xl font-bold px-2">Analytics</h1>
      <div className="mt-7 mb-2 mx-2 flex flex-col lg:flex-row gap-8">
        <MonthlyIncomeChart /> <YearlyIncomeChart />
      </div>
      <div className="mt-7 mb-2 mx-2 flex flex-col lg:flex-row gap-8">
        <MonthlyExpenseChart /> <YearlyExpenseChart />
      </div>
      <div className="mx-2 my-8">
        <ExpenseProgress />
      </div>
    </div>
  </div>
);

export default Analytics;
