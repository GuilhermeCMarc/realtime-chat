import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as any;
  console.error(error);

  return (
    <div className="min-h-screen bg-slate1 text-slate12 grid place-items-center">
      <div className="max-w-md px-5 flex flex-col items-center gap-2">
        <h1 className="text-xl font-bold">Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p className="text-slate11">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}
