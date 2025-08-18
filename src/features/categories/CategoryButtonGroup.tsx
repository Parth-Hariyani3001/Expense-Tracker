import { Edit2, Trash2 } from "lucide-react";

function CategoryButtonGroup({ handleEdit }: { handleEdit: () => void }) {
  const placeholderFunction = () => {
    console.log("clicked");
  };
  return (
    <>
      {/* onClick={() => handleEdit(category)} */}
      <button
        onClick={() => handleEdit(category)}
        className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:shadow-sm"
      >
        <Edit2 className="w-4 h-4 transition-transform hover:scale-110" />
      </button>
      {/* onClick={() => handleDelete(category.id)} */}
      <button
        onClick={placeholderFunction}
        className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:shadow-sm"
      >
        <Trash2 className="w-4 h-4 transition-transform hover:scale-110" />
      </button>
    </>
  );
}

export default CategoryButtonGroup;
