import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <main className="min-h-screen bg-slate1 text-slate12 selection:bg-indigo9 w-screen overflow-x-hidden">
      <Outlet />
    </main>
  );
}
