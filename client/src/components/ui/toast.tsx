import React from "react";

export function ToastContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {children}
    </div>
  );
}

export function Toast({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-green-500 text-white p-4 rounded shadow-lg">
      {children}
    </div>
  );
}

export function ToastMessage({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}