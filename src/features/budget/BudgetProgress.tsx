function BudgetProgress({ progress }: { progress: number }) {
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all duration-300 ${
          (progress || 0) >= 100
            ? "bg-red-500"
            : (progress || 0) >= 80
            ? "bg-yellow-500"
            : "bg-green-500"
        }`}
        style={{
          width: `${Math.min(progress || 0, 100)}%`,
        }}
      ></div>
    </div>
  );
}

export default BudgetProgress;
