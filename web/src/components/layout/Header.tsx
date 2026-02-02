import Link from "next/link";

export default function Header() {
  return (
    <header className="h-14 border-b bg-white px-6 flex items-center justify-between">
      <div className="text-sm text-zinc-500">Dashboard</div>

      <div className="flex items-center gap-3">
        <Link
          href="/api/auth/logout"
          className="text-sm text-zinc-600 hover:text-black"
        >
          Sign out
        </Link>
        <div className="h-8 w-8 rounded-full bg-zinc-200" />
      </div>
    </header>
  );
}
