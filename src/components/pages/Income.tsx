"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Pagination,
} from "@nextui-org/react";
import HorizontalIcon from "@mui/icons-material/HorizontalRule";
import ArrowUpwardIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDropDown";
import { useAppContext } from "@/context/AppContext";
import IncomeModal from "@/components/shared/organisms/IncomeModal";
import IncomePopover from "../shared/organisms/IncomePopover";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { IncomeEntry, IncomeTableColumn } from "@/types/income/index";
const Income: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIncome, setEditIncome] = useState<IncomeEntry | null>(null);

  const [sortConfig, setSortConfig] = useState<{
    column?: string;
    direction: string;
  }>({
    column: undefined,
    direction: "ascending",
  });

  const [rowsPerPage] = useState(16);
  const [page, setPage] = useState(1);

  const [filterValue, setFilterValue] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [toDate, setToDate] = useState<Date | null>(null);
  const [fromDate, setFromDate] = useState<Date | null>(null);

  const columns: IncomeTableColumn[] = [
    { name: "Amount", uid: "amount" },
    { name: "Description", uid: "description" },
    { name: "Date", uid: "date" },
    { name: "Category", uid: "category" },
    { name: "Actions", uid: "actions" },
  ];

  const sortData = (
    first: string | number | Date,
    second: string | number | Date,
    direction: string
  ) => {
    if (typeof first === "string" && typeof second === "string") {
      return direction === "ascending"
        ? first.localeCompare(second)
        : second.localeCompare(first);
    }
    if (typeof first === "number" && typeof second === "number") {
      return direction === "ascending" ? first - second : second - first;
    }
    if (first instanceof Date && second instanceof Date) {
      return direction === "ascending"
        ? first.getTime() - second.getTime()
        : second.getTime() - first.getTime();
    }
    return 0;
  };

  const incomes: IncomeEntry[] = state.entries.filter(
    (entry): entry is IncomeEntry => entry.type === "income"
  );

  const sortedItems = useMemo(() => {
    let sortedIncomes = [...incomes];

    if (filterValue) {
      sortedIncomes = sortedIncomes.filter((income) =>
        income.description.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      sortedIncomes = sortedIncomes.filter(
        (income) => income.category === categoryFilter.toLowerCase()
      );
    }

    if (toDate) {
      sortedIncomes = sortedIncomes.filter((income) => {
        const incomeDate = new Date(income.date);
        return incomeDate <= toDate;
      });
    }

    if (fromDate) {
      sortedIncomes = sortedIncomes.filter((income) => {
        const incomeDate = new Date(income.date);
        return incomeDate >= fromDate;
      });
    }

    if (sortConfig.column) {
      sortedIncomes.sort((a, b) => {
        const first = a[sortConfig.column as keyof IncomeEntry];
        const second = b[sortConfig.column as keyof IncomeEntry];

        return sortData(first, second, sortConfig.direction);
      });
    }
    return sortedIncomes;
  }, [incomes, filterValue, categoryFilter, sortConfig, toDate, fromDate]);
  const paginatedItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return sortedItems.slice(start, end);
  }, [page, sortedItems, rowsPerPage]);

  const pages = useMemo(
    () => Math.ceil(sortedItems.length / rowsPerPage),
    [sortedItems.length, rowsPerPage]
  );

  const handleSort = (column: string) => {
    if (column === "actions") return;
    if (sortConfig.column === column) {
      setSortConfig((prev) => ({
        column,
        direction: prev.direction === "ascending" ? "descending" : "ascending",
      }));
    } else {
      setSortConfig({ column, direction: "ascending" });
    }
  };

  const renderHeader = (column: IncomeTableColumn) => {
    const isActive = sortConfig.column === column.uid;
    if (column.uid === "actions")
      return (
        <div className="flex r justify-center">
          <span>{column.name}</span>
        </div>
      );
    const icon = isActive ? (
      sortConfig.direction === "ascending" ? (
        <ArrowUpwardIcon className="text-sm" />
      ) : (
        <ArrowDownwardIcon className="text-sm" />
      )
    ) : (
      <HorizontalIcon className="text-sm" />
    );

    return (
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => handleSort(column.uid)}
      >
        <span>
          {column.name} {icon}
        </span>
      </div>
    );
  };

  const renderCell = (
    item: IncomeEntry,
    columnKey: keyof IncomeEntry | "actions"
  ) => {
    switch (columnKey) {
      case "date":
        return new Date(item[columnKey]).toLocaleDateString();
      case "category":
        return <span className="capitalize">{item[columnKey]}</span>;
      case "actions":
        return (
          <div className="flex gap-2 items-center justify-center">
            <Button
              size="sm"
              onClick={() => {
                setEditIncome(item);
                setIsModalOpen(true);
              }}
            >
              <EditIcon className="text-sm" />
            </Button>
            <Button
              size="sm"
              color="danger"
              onClick={() =>
                dispatch({ type: "DELETE_ENTRY", payload: item.id })
              }
            >
              <DeleteIcon className="text-sm " />
            </Button>
          </div>
        );
      default:
        return item[columnKey];
    }
  };
  return (
    <div className="p-6">
      <div className="py-3 lg:ps-12 lg:pe-3 px-0">
        <div className="flex md:justify-between md:items-center flex-col gap-4 md:flex-row mb-2 px-2">
          <h1 className="text-2xl font-bold">Income</h1>
          <div className="flex gap-2 justify-between z-0">
            <IncomePopover
              filterValue={filterValue}
              setFilterValue={setFilterValue}
              fromDate={fromDate}
              setFromDate={setFromDate}
              toDate={toDate}
              setToDate={setToDate}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
            />
            <Button
              color="primary"
              onClick={() => {
                setEditIncome(null);
                setIsModalOpen(true);
              }}
            >
              Add New Income
            </Button>
          </div>
        </div>

        <div className="max-w-full py-4 px-2 w-full h-full scrollbar-hide overflow-x-scroll">
          <Table aria-label="Income Table" className="w-full text-black ">
            <TableHeader>
              {columns.map((column) => (
                <TableColumn key={column.uid}>
                  {renderHeader(column)}
                </TableColumn>
              ))}
            </TableHeader>

            <TableBody emptyContent="No incomes found" items={paginatedItems}>
              {(item) => (
                <TableRow key={item.id}>
                  {columns.map((column) => (
                    <TableCell key={column.uid} className="">
                      {renderCell(item, column.uid as keyof IncomeEntry | "actions")}
                    </TableCell>
                  ))}
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Pagination
            page={page}
            total={pages}
            onChange={(newPage) => setPage(newPage)}
            className="mt-4"
          />
        </div>

        {isModalOpen && (
          <IncomeModal 
            visible={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            initialData={editIncome}
          />
        )}
      </div>
    </div>
  );
};

export default Income;
