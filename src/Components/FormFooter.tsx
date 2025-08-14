import { useNavigate } from "react-router-dom";

function FormFooter({
  pathTo,
  destination,
  message,
}: {
  pathTo: string;
  destination: string;
  message: string;
}) {
  const navigateTo = useNavigate();

  const handleNavigation = () => {
    navigateTo(pathTo);
  };

  return (
    <>
      {/* Toggle between Login/Signup */}
      <div className="mt-6 text-center">
        <p className="text-gray-600 text-sm">
          {message}
          <button
            onClick={handleNavigation}
            className="ml-1 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            {destination}
          </button>
        </p>
      </div>

      {/* Footer */}
      <div className="text-center mt-8">
        <p className="text-xs text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </>
  );
}

export default FormFooter;
