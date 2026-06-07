"use client";

import React, { createContext, useContext, useReducer } from "react";
import { z } from "zod";

export const wizardSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  email: z.string().email("Please enter a valid corporate email address."),
  phone: z.string().regex(/^\d{10}$|^\d{3}-\d{3}-\d{4}$/, "Phone number must be at least 10 digits."),
  legalName: z.string().min(2, "Business name must be at least 2 characters."),
  ein: z.string().regex(/^\d{2}-?\d{7}$|^\d{9}$/, "EIN must be a valid 9-digit Business Tax ID."),
  revenueAnnual: z.number().positive("Annual revenue must be a positive number."),
  requestedAmount: z.number().positive("Requested funding must be a positive number."),
  timeInBusiness: z.string().optional().nullable(),
  useOfFunds: z.string().optional().nullable(),
  creditScoreTier: z.string().optional().nullable(),
});

export type WizardData = z.infer<typeof wizardSchema>;

export interface FormState {
  readonly step: 1 | 2 | 3 | 4;
  readonly formData: WizardData;
  readonly errors: Partial<Record<keyof WizardData, string>>;
  readonly isSubmitting: boolean;
  readonly errorMessage: string | null;
  readonly applicationId: string | null;
  readonly uploadedFiles: readonly string[];
}

export type FormAction =
  | { type: "SET_STEP"; payload: 1 | 2 | 3 | 4 }
  | { type: "UPDATE_FIELD"; payload: { field: keyof WizardData; value: string | number } }
  | { type: "SET_ERROR"; payload: { field: keyof WizardData; error: string } }
  | { type: "CLEAR_ERROR"; payload: { field: keyof WizardData } }
  | { type: "SET_ERRORS"; payload: Partial<Record<keyof WizardData, string>> }
  | { type: "SET_SUBMITTING"; payload: boolean }
  | { type: "SET_ERROR_MESSAGE"; payload: string | null }
  | { type: "SET_APPLICATION_ID"; payload: string | null }
  | { type: "ADD_UPLOADED_FILE"; payload: string }
  | { type: "RESET_FORM" };

const initialState: FormState = {
  step: 1,
  formData: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    legalName: "",
    ein: "",
    revenueAnnual: 150000,
    requestedAmount: 50000,
    timeInBusiness: "",
    useOfFunds: "",
    creditScoreTier: "",
  },
  errors: {},
  isSubmitting: false,
  errorMessage: null,
  applicationId: null,
  uploadedFiles: [],
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "UPDATE_FIELD":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.field]: action.payload.value,
        },
      };
    case "SET_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.field]: action.payload.error,
        },
      };
    case "CLEAR_ERROR": {
      const nextErrors = { ...state.errors };
      delete nextErrors[action.payload.field];
      return { ...state, errors: nextErrors };
    }
    case "SET_ERRORS":
      return { ...state, errors: action.payload };
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.payload };
    case "SET_ERROR_MESSAGE":
      return { ...state, errorMessage: action.payload };
    case "SET_APPLICATION_ID":
      return { ...state, applicationId: action.payload };
    case "ADD_UPLOADED_FILE":
      return {
        ...state,
        uploadedFiles: [...state.uploadedFiles, action.payload],
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

interface FormContextProps {
  readonly state: FormState;
  readonly dispatch: React.Dispatch<FormAction>;
}

const ApplicationFormContext = createContext<FormContextProps | undefined>(undefined);

export function ApplicationFormProvider({ children }: { readonly children: React.ReactNode }): React.JSX.Element {
  const [state, dispatch] = useReducer(formReducer, initialState);
  return (
    <ApplicationFormContext.Provider value={{ state, dispatch }}>
      {children}
    </ApplicationFormContext.Provider>
  );
}

export function useApplicationForm(): FormContextProps {
  const context = useContext(ApplicationFormContext);
  if (!context) {
    throw new Error("useApplicationForm must be used within an ApplicationFormProvider");
  }
  return context;
}

export interface FormStepTransition {
  readonly handleNext: () => void;
  readonly handlePrev: () => void;
  readonly validateField: (field: keyof WizardData, value: string | number) => void;
  readonly isStepValid: () => boolean;
}

export function useFormStepTransition(): FormStepTransition {
  const { state, dispatch } = useApplicationForm();

  const validateField = (field: keyof WizardData, value: string | number) => {
    try {
      const testData = { ...state.formData, [field]: value };
      wizardSchema.pick({ [field]: true } as Record<keyof WizardData, true>).parse(testData);
      dispatch({ type: "CLEAR_ERROR", payload: { field } });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = err.flatten().fieldErrors as Record<string, string[] | undefined>;
        const fieldError = fieldErrors[field];
        if (fieldError && fieldError[0]) {
          dispatch({ type: "SET_ERROR", payload: { field, error: fieldError[0] } });
        }
      }
    }
  };

  const isStepValid = (currentStep: number): boolean => {
    if (currentStep === 1) {
      const step1Result = wizardSchema.pick({
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
      }).safeParse(state.formData);
      return step1Result.success;
    } else if (currentStep === 2) {
      const step2Result = wizardSchema.pick({
        legalName: true,
        ein: true,
      }).safeParse(state.formData);
      return step2Result.success;
    }
    return true;
  };

  const handleNext = () => {
    if (isStepValid(state.step)) {
      const nextStep = (state.step === 4 ? 4 : state.step + 1) as 1 | 2 | 3 | 4;
      dispatch({ type: "SET_STEP", payload: nextStep });
    } else {
      const fieldsToValidate = state.step === 1
        ? (["firstName", "lastName", "email", "phone"] as const)
        : (["legalName", "ein"] as const);

      fieldsToValidate.forEach((field) => {
        const value = state.formData[field];
        validateField(field, value);
      });
    }
  };

  const handlePrev = () => {
    const prevStep = (state.step === 1 ? 1 : state.step - 1) as 1 | 2 | 3 | 4;
    dispatch({ type: "SET_STEP", payload: prevStep });
  };

  return {
    handleNext,
    handlePrev,
    validateField,
    isStepValid: () => isStepValid(state.step),
  };
}
