import { Toaster } from "react-hot-toast";

export function DarkToast() {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{
        margin: "8px",
      }}
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration: 5000,
        },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "16px 24px",
          borderRadius: "8px",
          backgroundColor: "#1f2937", // dark gray
          color: "#f9fafb", // light text
          border: "1px solid #374151", // subtle border
        },
      }}
    />
  );
}

export function LightToast() {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{
        margin: "8px",
      }}
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration: 5000,
        },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "16px 24px",
          borderRadius: "8px",
          backgroundColor: "#f9fafb", // light background
          color: "#1f2937", // dark text
          border: "1px solid #d1d5db", // subtle border
        },
      }}
    />
  );
}
