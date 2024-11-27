"use client";
import React from "react";
import FeatureCard from "../shared/molecules/FeatureCard";

const HomePage = () => (
  <div className="p-6">
    <div className=" py-4 lg:ps-12 lg:pe-3 px-0 ">
      <h1 className="text-2xl font-bold px-2">Home</h1>
  <div className="  flex flex-col items-center justify-center">
    <div className="text-center max-w-3xl">
      <h1 className="text-4xl font-bold  mb-4 mt-6">Welcome to Budget Tracker</h1>
      <p className="text-lg  mb-6">
        BudgetMaster helps you take control of your finances by tracking your income,
        expenses, and setting category-based limits. Visualize your spending habits
        and stay within your budget effortlessly.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        <FeatureCard
          title="Track Expenses"
          description="Monitor where your money goes and categorize your expenses for better insights."
        />
        <FeatureCard
          title="Set Limits"
          description="Set spending limits for each category and get warnings if you're about to exceed them."
        />
        <FeatureCard
          title="Visualize Spending"
          description="View progress bars and charts to see how you're managing your budget."
        />
        <FeatureCard
          title="Stay Organized"
          description="Keep all your financial data in one place with easy-to-use tools."
        />
      </div>
      </div>
    
    </div>
    </div>
  </div>
);



export default HomePage;
