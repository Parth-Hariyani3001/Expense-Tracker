import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LightToast, DarkToast } from "./Components/Toast.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import AppLayout from "./Components/AppLayout.tsx";
// import Dashboard from "./pages/Dashboard.tsx";
import ProtectedRoute from "./Components/ProtectedRoute.tsx";
import Categories from "./pages/Categories.tsx";
import Transactions from "./pages/Transactions.tsx";
import { useTheme } from "./context/ThemeContext.tsx";
import Budget from "./pages/Budget.tsx";
import { DatePickerProvider } from "./context/DatePickerContext.tsx";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 200 * 1000,
    },
  },
});

function App() {
  const {
    context: { isDarkMode },
  } = useTheme();

  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools initialIsOpen={false} />
      <DatePickerProvider>
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
              <Route index element={<Navigate replace to="categories" />} />
              {/* <Route path="dashboard" element={<Dashboard />} /> */}
              <Route path="categories" element={<Categories />} />
              <Route path="budget" element={<Budget />} />
              <Route path="transactions" element={<Transactions />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DatePickerProvider>

      {isDarkMode ? <DarkToast /> : <LightToast />}
    </QueryClientProvider>
  );
}

export default App;
