import { Portal } from "@radix-ui/react-portal";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { ToastProvider } from "../contexts/ToastContext";

export default function Root() {
  return (
    <main className="min-h-screen bg-slate1 text-slate12 selection:bg-indigo6 w-screen overflow-x-hidden">
      <AuthProvider>
        <ToastProvider>
          <QueryClientProvider client={new QueryClient()}>
            <Outlet />
          </QueryClientProvider>
        </ToastProvider>
      </AuthProvider>
    </main>
  );
}
