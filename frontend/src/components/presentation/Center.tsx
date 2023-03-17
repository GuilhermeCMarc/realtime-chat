export default function Center({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen max-w-md mx-auto px-5 grid place-items-center">
      {children}
    </div>
  );
}
