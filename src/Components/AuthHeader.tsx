import { PiggyBank } from "lucide-react";

function AuthHeader({ description }: { description: string }) {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
        <PiggyBank className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-2 ">
        Expense Tracker
      </h1>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

export default AuthHeader;
