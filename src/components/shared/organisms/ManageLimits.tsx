"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Card, CardBody, CardHeader, Input, Button } from "@nextui-org/react";
import { useAppContext } from "@/context/AppContext";

const ManageCategoryLimits = () => {
  const { state, dispatch } = useAppContext();
  const { categoryLimits, expenseSums } = state;

  const categoryOptions = useMemo(
    () => ["Rent", "Utilities", "Groceries", "Other"],
    []
  );
  const [localLimits, setLocalLimits] = useState<Record<string, number>>({});
  useEffect(() => {
    const updatedLimits = categoryOptions.reduce((acc, category) => {
      const existingLimit = categoryLimits.find(
        (limit) => limit.category === category
      );
      acc[category] = existingLimit?.limit || 0;
      return acc;
    }, {} as Record<string, number>);
    setLocalLimits(updatedLimits);
  }, [categoryLimits, categoryOptions]);

  const handleLimitChange = (category: string, value: string) => {
    setLocalLimits((prevLimits) => ({
      ...prevLimits,
      [category]: parseFloat(value) || 0,
    }));
  };
  const saveLimits = () => {
    Object.entries(localLimits).forEach(([category, limit]) => {
      dispatch({
        type: "SET_CATEGORY_LIMIT",
        payload: { category, limit },
      });
    });
  };

  return (
    <Card className="w-full ">
      <CardHeader>
        <p className="text-small ">Manage Category Limits</p>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-4">
          {categoryOptions.map((category) => {
            const currentLimit = localLimits[category] || 0;

            return (
              <div key={category} className="flex items-center gap-4">
                <label className="flex-1 text-sm font-medium">{category}</label>
                <Input
                  className="w-28"
                  type="number"
                  value={currentLimit.toString()}
                  onChange={(e) => handleLimitChange(category, e.target.value)}
                  placeholder="Set limit"
                />
              </div>
            );
          })}
        </div>
        <Button
          color="success"
          className="mt-4 w-full text-white"
          onClick={saveLimits}
        >
          Save Limits
        </Button>
      </CardBody>
    </Card>
  );
};

export default ManageCategoryLimits;
