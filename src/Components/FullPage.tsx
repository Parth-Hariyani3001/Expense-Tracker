import type { JSX } from "react";

function FullPage({ children }: { children: JSX.Element }) {
  return (
    <div className="h-screen bg-grey-50 flex items-center justify-center">
      {children}
    </div>
  );
}

export default FullPage;
