import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonDesign = "primary" | "icon";

interface ButtonProps {
  type: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: () => void;
  children: ReactNode;
  buttonDesign: ButtonDesign;
}

function Button({ type, onClick, children, buttonDesign }: ButtonProps) {
  let buttonClass;

  switch (buttonDesign) {
    case "primary":
      buttonClass =
        "w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
      break;

    case "icon":
      buttonClass =
        "absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors";
  }

  return (
    <button onClick={onClick} type={type} className={buttonClass}>
      {children}
    </button>
  );
}

export default Button;
