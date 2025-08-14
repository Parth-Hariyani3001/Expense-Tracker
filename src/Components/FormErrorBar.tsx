function FormErrorBar({ errorMessage }: { errorMessage: string }) {
  return (
    <>
      {errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </>
  );
}

export default FormErrorBar;
