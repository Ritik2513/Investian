const Topbar = () => {
  return (
    <header className="flex items-center justify-between bg-panel px-6 py-4 border-b border-gray-700 text-white">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>

      <div className="flex items-center gap-3">
        <span className="text-sm">Alex Rivera</span>
        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-semibold">
          R
        </div>
      </div>
    </header>
  );
};

export default Topbar;
