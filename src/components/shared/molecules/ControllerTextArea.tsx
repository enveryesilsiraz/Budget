import React from "react";
import { Controller, Control } from "react-hook-form";
import { Textarea } from "@nextui-org/react";

interface ControllerTextAreaProps {
  name: string;
  control: Control<any>;
  errors?: Record<string, any>; 
  placeholder?: string;
  label?: string;
}

const ControllerTextArea: React.FC<ControllerTextAreaProps> = ({
  name,
  control,
  errors,
  placeholder = "Enter text",
  label = "Text",
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Textarea
          {...field}
          label={label}
          placeholder={placeholder}
          className="text-black resize-none"
          isInvalid={!!errors?.[name]}
          errorMessage={errors?.[name]?.message}
        />
      )}
    />
  );
};

export default ControllerTextArea;
