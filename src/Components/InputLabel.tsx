function InputLabel({ labelText }: { labelText: string }) {
  return (
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {labelText}
    </label>
  );
}

export default InputLabel;
