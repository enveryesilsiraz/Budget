import React from "react";
import { Controller, Control } from "react-hook-form";
import { DatePicker } from "@nextui-org/react";

interface ControlledDateInputProps {
  name: string;
  control: Control<any>;
  errors: Record<string, any>;
}

const ControllerDateInput: React.FC<ControlledDateInputProps> = ({
  name,
  control,
  errors,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: "Date is required",
      }}
      render={({ field }) => (
        <DatePicker
          {...field}
          label="Date"
          isRequired
          onChange={(e) => field.onChange(e)}
          className="w-full rounded-md text-black"
          errorMessage={errors[name]?.message}
          isInvalid={!!errors[name]}
          value={field.value}
        />
      )}
    />
  );
};

export default ControllerDateInput;
