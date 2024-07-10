// FormContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

interface FormData {
  details: any;
  verification: any;
  license: any;
}

interface FormContextProps {
  formMethods: UseFormReturn<any>;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const formMethods = useForm<any>();
  const [formData, setFormData] = useState<FormData>({
    details: {},
    verification: {},
    license: {},
  });

  return (
    <FormContext.Provider value={{ formMethods, formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
