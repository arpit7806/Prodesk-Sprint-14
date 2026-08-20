import Link from "next/link";

export default function Home() {
  return (
    <main className="landing">
      <div className="landing-card">
        <p className="eyebrow">Sprint 14 — Walking Skeleton</p>
        <h1>Auth &amp; Routing MVP</h1>
        <p className="sub">
          Minimal shell proving the login → session → protected route loop
          works end to end.
        </p>
        <div className="landing-actions">
          <Link href="/login" className="btn btn-primary">
            Log in
          </Link>
          <Link href="/register" className="btn btn-ghost">
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
