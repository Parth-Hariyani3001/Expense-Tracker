import { useState } from "react";
import { useDatePicker } from "../context/DatePickerContext";
import { Calendar } from "lucide-react";
import { format, isSameMonth } from "date-fns";
import { DayPicker, type DateRange } from "react-day-picker";
import useOutSideClick from "../hooks/useOutsideClick";

function RangeDatePicker() {
  const [showPicker, setShowPicker] = useState(false);
  const [tempRange, setTempRange] = useState<DateRange | undefined>(undefined);

  const { ref } = useOutSideClick(handleCLoseDayPicker);
  const {
    context: { range, handleUpdateRange },
  } = useDatePicker();

  const dateFilterStatus = isSameMonth(range.from as Date, range.to as Date)
    ? format(range.from as Date, "MMMM yyyy")
    : "Custom range";

  function handleCLoseDayPicker() {
    setShowPicker(false);
  }

  const onConfirm = (finalRange: DateRange | undefined) => {
    handleUpdateRange(finalRange);
    handleCLoseDayPicker();
  };

  return (
    <>
      <button
        onClick={() => setShowPicker((p) => !p)}
        className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
      >
        <Calendar className="w-4 h-4" />
        <span className="text-sm">{dateFilterStatus}</span>
      </button>

      {showPicker && (
        <div
          ref={ref}
          className="absolute z-50 mt-2 bg-white shadow-lg rounded-md p-4 top-0.5 text-gray-900 dark:bg-gray-950 dark:text-gray-100"
        >
          <DayPicker
            defaultMonth={new Date()}
            selected={tempRange}
            mode="range"
            captionLayout="dropdown"
            className="rdp"
            min={7}
            onSelect={(range) => {
              if (range?.from && !range?.to) {
                setTempRange({ from: range.from, to: undefined });
              } else if (range?.from && range?.to) {
                setTempRange(range);
              }
            }}
          />
          <button
            className="mt-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
            disabled={!tempRange?.from || !tempRange?.to}
            onClick={() => onConfirm(tempRange)}
          >
            Confirm
          </button>
        </div>
      )}
    </>
  );
}

export default RangeDatePicker;
