import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";

const baseStyle = "text-base max-w-[500px] px-6 py-4 rounded-lg shadow-md";

const lightStyles = {
    success: `${baseStyle} bg-white text-gray-800 border border-gray-200`,
    error: `${baseStyle} bg-white text-red-600 border border-red-200`,
};

const darkStyles = {
    success: `${baseStyle} bg-gray-900 text-gray-100 border border-gray-700`,
    error: `${baseStyle} bg-gray-900 text-red-400 border border-red-700`,
};

export const useAppToast = () => {
    const { context: { isDarkMode } } = useTheme();

    const successToast = (message: string) => {
        toast.success(message, {
            className: isDarkMode ? darkStyles.success : lightStyles.success,
            duration: 4000
        });
    }

    const errorToast = (message: string) => {
        toast.error(message, {
            className: isDarkMode ? darkStyles.error : lightStyles.error,
            duration: 5000
        })
    };

    return { successToast, errorToast }
}