import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import { Toaster } from "react-hot-toast";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 200 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path="signin" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
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
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
