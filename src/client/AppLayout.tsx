import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import logout from "@wasp/auth/logout.js";
import useAuth from "@wasp/auth/useAuth";

export default function AppLayout({ children }: PropsWithChildren<{}>) {
  const { data: auth } = useAuth();

  return (
    <main className="bg-coffee text-white">
      {auth ? (
        <button
          className="absolute top-0 right-0 m-5 hover:bg-amber-300 hover:text-black px-3 py-2 rounded transition"
          onClick={logout}
        >
          Logout
        </button>
      ) : (
        <Link
          className="absolute top-0 right-0 m-5 hover:bg-amber-300 hover:text-black px-3 py-2 rounded transition"
          to="/login"
        >
          Login
        </Link>
      )}
      {children}
    </main>
  );
}
