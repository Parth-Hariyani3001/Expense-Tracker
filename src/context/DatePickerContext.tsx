/* eslint-disable react-refresh/only-export-components */
import type { DateRange } from "react-day-picker";
import { createContext, useContext, useState } from "react";

type DatePickerContextType = {
  range: DateRange;
  handleUpdateRange: (range: DateRange | undefined) => void;
};

const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
const monthEnd = new Date(
  new Date().getFullYear(),
  new Date().getMonth() + 1,
  0
);

const DatePickerContext = createContext<DatePickerContextType | undefined>(
  undefined
);

export const DatePickerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [range, setRange] = useState<DateRange>({
    from: monthStart,
    to: monthEnd,
  });
  function handleUpdateRange(range: DateRange | undefined) {
    if (range?.from && !range?.to) {
      setRange({ from: range.from, to: undefined });
    } else if (range?.from && range?.to) {
      setRange(range);
    }
  }
  return (
    <DatePickerContext.Provider
      value={{ range: { ...range }, handleUpdateRange }}
    >
      {children}
    </DatePickerContext.Provider>
  );
};

export const useDatePicker = () => {
  const context = useContext(DatePickerContext);

  if (context === undefined)
    throw new Error("useDatePicker must be within a DatePickerProvider");

  return { context };
};
