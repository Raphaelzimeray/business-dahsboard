type Props = {
  searchParams?: {
    next?: string;
    error?: string;
  };
};

export default function LoginPage({ searchParams }: Props) {
  const next = searchParams?.next ?? "/dashboard";
  const showError = searchParams?.error === "missing";

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl bg-white shadow p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Demo authentication (cookie httpOnly + middleware protected routes).
          </p>
        </div>

        {showError && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            Please enter an email and password.
          </div>
        )}

        <form action="/api/auth/login" method="post" className="space-y-4">
          <input type="hidden" name="next" value={next} />

          <div className="space-y-1">
            <label className="text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="demo@company.com"
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-zinc-900/10"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Password</label>
            <input
              name="password"
              type="password"
              required
              placeholder="anything works"
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-zinc-900/10"
            />
            <p className="text-xs text-zinc-500">
              Mock login: any values will work.
            </p>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-black text-white py-2 text-sm font-medium hover:opacity-90"
          >
            Continue
          </button>
        </form>

        <p className="text-xs text-zinc-500">
          Tip: try opening <span className="font-mono">/dashboard</span> in a
          private window — you’ll get redirected here.
        </p>
      </div>
    </div>
  );
}
