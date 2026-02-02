export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          App preferences (UI demo).
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">Email notifications</div>
            <div className="text-xs text-gray-500">Get updates by email</div>
          </div>
          <div className="h-6 w-10 rounded-full bg-gray-200" />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">Two-factor auth</div>
            <div className="text-xs text-gray-500">Extra security layer</div>
          </div>
          <div className="h-6 w-10 rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
