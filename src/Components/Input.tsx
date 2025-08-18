import type { UseFormRegisterReturn } from "react-hook-form";

function Input({
  type,
  errorMessage,
  placeholder,
  registerObject,
  required = false,
}: {
  type: string;
  placeholder: string;
  errorMessage: string;
  registerObject: UseFormRegisterReturn;
  required?: boolean;
}) {
  return (
    <>
      <input
        required={required}
        type={type}
        className={`w-full pl-11 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
          errorMessage
            ? "border-red-300 bg-red-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        placeholder={placeholder}
        {...registerObject}
      />
    </>
  );
}

export default Input;
