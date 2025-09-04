import type { LucideIcon } from "lucide-react";

function CategoryStatItem({
  lengthProperty,
  description,
  Icon,
  iconColor,
}: {
  lengthProperty: number;
  description: string;
  Icon: LucideIcon;
  iconColor: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm  dark:bg-gray-800 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <div
          className={`w-12 h-12 bg-${iconColor}-100 dark:bg-${iconColor}-300 rounded-lg flex items-center justify-center`}
        >
          <Icon
            className={`w-6 h-6 text-${iconColor}-600 dark:text-${iconColor}-800`}
          />
        </div>
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          {lengthProperty}
        </span>
      </div>
      <h3 className="text-sm font-medium text-gray-600 mt-4 dark:text-gray-400">
        {description}
      </h3>
    </div>
  );
}

export default CategoryStatItem;
