import React from "react";
import { Controller, Control } from "react-hook-form";
import { Input } from "@nextui-org/react";


interface ControlledAmountInputProps {
  name: string;
  control: Control<any>;
  errors: Record<string, any>;
}

const ControllerAmountInput: React.FC<ControlledAmountInputProps> = ({
  name,
  control,
  errors,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: "Amount is required",
      }}
      render={({ field }) => (
        <Input
          {...field}
          isRequired
          type="number"
          label="Amount"
          placeholder="Enter amount"
          errorMessage={errors[name]?.message}
          isInvalid={!!errors[name]}
          onChange={(e) => {
            const value = e.target.value;
            if (!value || parseFloat(value) > 0) {
              field.onChange(value);
            }
          }}
          value={field.value}
        />
      )}
    />
  );
};

export default ControllerAmountInput;
