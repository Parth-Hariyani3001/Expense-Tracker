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
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div
          className={`w-12 h-12 bg-${iconColor}-100 rounded-lg flex items-center justify-center`}
        >
          <Icon className={`w-6 h-6 text-${iconColor}-600`} />
        </div>
        <span className="text-2xl font-bold text-gray-900">
          {lengthProperty}
        </span>
      </div>
      <h3 className="text-sm font-medium text-gray-600 mt-4">{description}</h3>
    </div>
  );
}

export default CategoryStatItem;
