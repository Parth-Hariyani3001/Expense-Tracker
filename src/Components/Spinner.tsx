function Spinner() {
  return (
    <div className="absolute bg-slate-200/20 inset-0 backdrop-blur-sm flex items-center justify-center dark:bg-gray-900">
      <div className="loader"></div>
    </div>
  );
}

export default Spinner;
