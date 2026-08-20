"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setUser, clearUser } from "@/store/userSlice";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user);

  // Handles direct navigation / page refresh: the session cookie survives
  // a reload, but the Redux store doesn't. Re-hydrate it from the session
  // the moment we know we're authenticated.
  useEffect(() => {
    if (status === "authenticated" && session?.user && !user.isAuthenticated) {
      dispatch(
        setUser({
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
        })
      );
    }
  }, [status, session, user.isAuthenticated, dispatch]);

  const handleLogout = async () => {
    dispatch(clearUser());
    await signOut({ redirect: false });
    router.push("/login");
  };

  if (status === "loading") {
    return (
      <main className="dashboard-screen">
        <p className="sub">Checking session...</p>
      </main>
    );
  }

  return (
    <main className="dashboard-screen">
      <div className="dashboard-card">
        <p className="eyebrow">Protected route</p>
        <h1>Dashboard</h1>
        <p className="sub">
          This page only rendered because the middleware confirmed a valid
          session token. The fields below are pulled from the Redux store,
          not straight off the session object.
        </p>

        <div className="user-payload">
          <div className="payload-row">
            <span>Name</span>
            <strong>{user.name || "—"}</strong>
          </div>
          <div className="payload-row">
            <span>Email</span>
            <strong>{user.email || "—"}</strong>
          </div>
          <div className="payload-row">
            <span>User ID</span>
            <strong>{user.id || "—"}</strong>
          </div>
        </div>

        <button className="btn btn-ghost" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </main>
  );
}
