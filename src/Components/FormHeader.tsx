function FormHeader({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2 dark:text-white">
        {heading}
      </h2>
      <p className="text-gray-600 text-sm dark:text-gray-400">{description}</p>
    </div>
  );
}

export default FormHeader;
