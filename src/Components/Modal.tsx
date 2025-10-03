import type { ReactNode } from "react";
import React from "react";

function Modal({
  children,
  ref,
}: {
  children: ReactNode;
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md dark:bg-gray-800"
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
