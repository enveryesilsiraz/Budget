"use client";

import { Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { DateValue } from "@react-types/datepicker";
import { useAppContext } from "@/context/AppContext";
import {
  CalendarDate,
  getLocalTimeZone,
  GregorianCalendar,
  today,
} from "@internationalized/date";
import moment from "moment";
import type { Entry } from "@/types/expense/index";
import ControllerAmountInput from "../molecules/ControllerAmountInput";
import ControllerDateInput from "../molecules/ControllerDateInput";
import ControllerTextArea from "../molecules/ControllerTextArea";
import ControllerSelect from "../molecules/ControllerSelect";

const ExpenseModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  initialData?: {
    id: string;
    amount: string;
    description: string;
    date: string;
    category: string;
  } | null;
}> = ({ visible, onClose, initialData }) => {
  const { dispatch } = useAppContext();
  const categories = ["rent", "utilities", "groceries", "other"];

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: initialData ? initialData.amount : "",
      description: initialData ? initialData.description : "",
      category: initialData ? initialData.category : "",
      date: initialData
        ? new CalendarDate(
            new GregorianCalendar(),
            moment(new Date(initialData.date)).year(),
            moment(new Date(initialData.date)).month() + 1,
            moment(new Date(initialData.date)).date()
          )
        : today(getLocalTimeZone()),
    },
  });

  function toDate(value: DateValue): Date {
    return new Date(value.year, value.month - 1, value.day);
  }

  const onSubmit = (data: any) => {
    const entry: Entry = {
      id: initialData ? initialData.id : `${Date.now()}`, 
      type: "expense", 
      amount: data.amount,
      description: data.description,
      date: toDate(data.date).toISOString(),
      category: data.category,
    };
    if (initialData) {
      dispatch({
        type: "EDIT_ENTRY",
        payload: entry,
      });
    } else {
      dispatch({
        type: "ADD_ENTRY",
        payload: entry,
      });
    }
    reset();
    onClose();
  };
  if (!visible) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
     <div
    className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
    onClick={onClose}
  ></div>
      <div className="relative bg-content1 text-white p-6 rounded-lg max-w-sm w-full">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold mb-4 text-center">
            {initialData ? "Edit Expense" : "Add Expense"}
          </h3>
          <ControllerAmountInput
            name="amount"
            control={control}
            errors={errors}
          />
          <ControllerTextArea
            name="description"
            control={control}
            errors={errors}
            placeholder="Enter description"
            label="Description"
          />
          <ControllerDateInput name="date" control={control} errors={errors} />
          <ControllerSelect
            name="category"
            control={control}
            errors={errors}
            options={categories}
            label="Category"
            placeholder="Select a category"
            isRequired
          />
          <div
            className={`flex justify-end mt-6 transition-all duration-300 overflow-hidden ${
              initialData &&
              watch("amount") === initialData.amount &&
              watch("description") === initialData.description &&
              watch("category") === initialData.category &&
              toDate(watch("date")).toISOString() === initialData.date
                ? "max-h-0"
                : "max-h-20"
            }`}
          >
            <Button onClick={onClose} color="danger" className="mr-2">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              type="submit"
              className="bg-green-500 text-white"
            >
              {initialData ? "Save Changes" : "Add Expense"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseModal;
