"use client";

import React, { useMemo, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
  DatePicker,
  Select,
  SelectItem,
  Button,
} from "@nextui-org/react";
import { getLocalTimeZone } from "@internationalized/date";

interface ExpensePopoverProps {
  filterValue: string;
  setFilterValue: (value: string) => void;
  fromDate: Date | null;
  setFromDate: (date: Date | null) => void;
  toDate: Date | null;
  setToDate: (date: Date | null) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
}

const ExpensePopover: React.FC<ExpensePopoverProps> = ({
  filterValue,
  setFilterValue,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  categoryFilter,
  setCategoryFilter,
}) => {
  const categoryOptions = useMemo(() => ["all", "Rent", "Utilities", "Groceries", "Other"], []);
  const [tempFilters, setTempFilters] = useState({
    filterValue,
    fromDate,
    toDate,
    categoryFilter,
  });

  const handleApplyFilters = () => {
    setFilterValue(tempFilters.filterValue);
    setFromDate(tempFilters.fromDate);
    setToDate(tempFilters.toDate);
    setCategoryFilter(tempFilters.categoryFilter);
  };

  const handleClearFilters = () => {
    const defaultFilters = {
      filterValue: "",
      fromDate: null,
      toDate: null,
      categoryFilter: "all",
    };

    setTempFilters(defaultFilters);
    setFilterValue(defaultFilters.filterValue);
    setFromDate(defaultFilters.fromDate);
    setToDate(defaultFilters.toDate);
    setCategoryFilter(defaultFilters.categoryFilter);
  };

  return (
    <Popover key={"expense_filter"} showArrow offset={10} placement="bottom">
      <PopoverTrigger>
        <Button color="primary" className="capitalize">
          {"filter"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        <div className="px-1 py-2 w-full">
          <div className="mt-2 flex flex-col gap-2 w-full">
            <Input
              label="Description"
              value={tempFilters.filterValue}
              onValueChange={(value) =>
                setTempFilters((prev) => ({ ...prev, filterValue: value }))
              }
            />
            <DatePicker
              label="From Date"
              onChange={(e) => {
                const selectedDate = e.toDate(getLocalTimeZone());
                setTempFilters((prev) => ({ ...prev, fromDate: selectedDate }));
              }}
              className="w-full rounded-md text-black"
            />
            <DatePicker
              label="To Date"
              onChange={(e) => {
                const selectedDate = e.toDate(getLocalTimeZone());
                setTempFilters((prev) => ({ ...prev, toDate: selectedDate }));
              }}
              className="w-full rounded-md text-black"
            />
            <Select
              label="Category"
              value={tempFilters.categoryFilter}
              onChange={(e) =>
                setTempFilters((prev) => ({ ...prev, categoryFilter: e.target.value }))
              }
              className="text-black "
            >
              {categoryOptions.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </Select>
            <div className="flex justify-between mt-4">
              <Button color="default" onPress={handleClearFilters}>
                Clear
              </Button>
              <Button color="success" onPress={handleApplyFilters}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ExpensePopover;
