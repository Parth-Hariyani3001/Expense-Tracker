import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import { Toaster } from "react-hot-toast";
import AppLayout from "./Components/AppLayout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ProtectedRoute from "./Components/ProtectedRoute.tsx";
import Categories from "./pages/Categories.tsx";
import Transactions from "./pages/Transactions.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 200 * 1000,
    },
  },
});

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={client}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route path="signin" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="categories" element={<Categories />} />
              <Route path="transactions" element={<Transactions />} />
            </Route>
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
    </ThemeProvider>
  );
}

export default App;
