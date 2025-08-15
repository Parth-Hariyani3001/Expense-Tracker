import type { JSX } from "react";
import { useUser } from "../hooks/useUser";
import FullPage from "./FullPage";
import Spinner from "./Spinner";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  //1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  //2. While loading, show a spinner
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  //3.If not an authenticated user, redirect to login
  if (!isAuthenticated) return <Navigate to="/signin" />;

  //4. If there is a user present, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
