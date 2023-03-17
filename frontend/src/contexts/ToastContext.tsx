import { createContext, useContext, useState } from "react";

import { Provider } from "@radix-ui/react-toast";
import { Portal } from "@radix-ui/react-portal";
import Toast, { ToastType } from "../components/feedback/Toast";

export type ToastMessage = {
  title?: string;
  description?: string;
  duration?: number;
  type: ToastType;
};

export type ToastContext = {
  toast: {
    info: (message: Omit<ToastMessage, "type">) => void;
    error: (message: Omit<ToastMessage, "type">) => void;
    success: (message: Omit<ToastMessage, "type">) => void;
  };
};

const ToastContext = createContext<ToastContext>({
  toast: {
    error: (message) => {},
    info: (message) => {},
    success: (message) => {},
  },
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  function addToast(message: ToastMessage) {
    console.log("adding toast", { message });
    setToasts((prev) => [message, ...prev]);
  }

  const error = (message: Omit<ToastMessage, "type">) =>
    addToast({ ...message, type: "error" });

  const info = (message: Omit<ToastMessage, "type">) =>
    addToast({ ...message, type: "info" });

  const success = (message: Omit<ToastMessage, "type">) =>
    addToast({ ...message, type: "success" });

  return (
    <ToastContext.Provider value={{ toast: { error, info, success } }}>
      {toasts.length > 0 && (
        <Portal>
          <ol className="fixed flex flex-col-reverse space-y-5 text-slate12 top-0 max-w-sm w-full pointer-events-none h-screen right-0 p-5 list-none">
            {toasts.map((toast, i) => (
              <Toast
                key={`${i}-${toast.title ?? toast.description}`}
                {...toast}
              />
            ))}
          </ol>
        </Portal>
      )}
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
