import React from "react";
import { Controller, Control } from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/react";

interface ControllerSelectProps {
  name: string;
  control: Control<any>;
  errors?: Record<string, any>;
  options: string[];
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
}

const ControllerSelect: React.FC<ControllerSelectProps> = ({
  name,
  control,
  errors,
  options,
  label = "Select",
  placeholder = "Please select an option",
  isRequired = false,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: isRequired ? `${label} is required` : undefined,
      }}
      render={({ field }) => (
        <Select
          {...field}
          isRequired={isRequired}
          selectedKeys={[field.value]}
          label={label}
          placeholder={placeholder}
          className="text-black"
          errorMessage={errors?.[name]?.message}
          isInvalid={!!errors?.[name]}
          value={field.value}
        >
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </Select>
      )}
    />
  );
};

export default ControllerSelect;
