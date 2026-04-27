export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      {/* Stats Row */}
      <div className="flex gap-8 mb-6">
        <div className="bg-[#111127] p-6 rounded-xl border border-[#1e1e3a] flex flex-col min-w-[140px]">
          <span className="text-sm text-gray-400">Total Tasks</span>
          <span className="text-2xl font-bold text-white">97</span>
        </div>
        <div className="bg-[#111127] p-6 rounded-xl border border-[#1e1e3a] flex flex-col min-w-[140px]">
          <span className="text-sm text-gray-400">In Progress</span>
          <span className="text-2xl font-bold text-[#8b5cf6]">6</span>
        </div>
        <div className="bg-[#111127] p-6 rounded-xl border border-[#1e1e3a] flex flex-col min-w-[140px]">
          <span className="text-sm text-gray-400">Completed</span>
          <span className="text-2xl font-bold text-green-400">42</span>
        </div>
        <div className="bg-[#111127] p-6 rounded-xl border border-[#1e1e3a] flex flex-col min-w-[140px]">
          <span className="text-sm text-gray-400">Team Members</span>
          <span className="text-2xl font-bold text-yellow-400">8</span>
        </div>
      </div>

      {/* Active Tasks Feed */}
      <div className="bg-[#111127] p-6 rounded-xl border border-[#1e1e3a]">
        <h3 className="text-lg font-semibold mb-4">Active Tasks</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-3">
            <span className="bg-[#8b5cf6] rounded-full w-6 h-6 flex items-center justify-center text-white">MM</span>
            <span>Design new funnel landing page</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="bg-[#3b82f6] rounded-full w-6 h-6 flex items-center justify-center text-white">D</span>
            <span>Animated hero section refresh</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="bg-[#ec4899] rounded-full w-6 h-6 flex items-center justify-center text-white">SMM</span>
            <span>Schedule reels for May</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="bg-[#10b981] rounded-full w-6 h-6 flex items-center justify-center text-white">MA</span>
            <span>Optimize retargeting campaign</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="bg-[#6366f1] rounded-full w-6 h-6 flex items-center justify-center text-white">LG</span>
            <span>Prospect new leads via Apify</span>
          </li>
        </ul>
      </div>

      {/* Team Status */}
      <div className="bg-[#111127] p-6 rounded-xl border border-[#1e1e3a]">
        <h3 className="text-lg font-semibold mb-4">Team Status</h3>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <li className="flex flex-col items-center">
            <span className="bg-[#8b5cf6] rounded-full w-8 h-8 flex items-center justify-center text-white text-sm mb-2">MM</span>
            <span className="text-gray-300">MegaManager</span>
            <span className="text-xs text-purple-300">Managing tasks</span>
          </li>
          <li className="flex flex-col items-center">
            <span className="bg-[#3b82f6] rounded-full w-8 h-8 flex items-center justify-center text-white text-sm mb-2">D</span>
            <span className="text-gray-300">Designer</span>
            <span className="text-xs text-blue-300">Working on landing page</span>
          </li>
          <li className="flex flex-col items-center">
            <span className="bg-[#ec4899] rounded-full w-8 h-8 flex items-center justify-center text-white text-sm mb-2">SMM</span>
            <span className="text-gray-300">SMM</span>
            <span className="text-xs text-pink-300">Planning May reels</span>
          </li>
          <li className="flex flex-col items-center">
            <span className="bg-[#10b981] rounded-full w-8 h-8 flex items-center justify-center text-white text-sm mb-2">MA</span>
            <span className="text-gray-300">MetaADS</span>
            <span className="text-xs text-green-300">Optimizing retargeting</span>
          </li>
          <li className="flex flex-col items-center">
            <span className="bg-[#ef4444] rounded-full w-8 h-8 flex items-center justify-center text-white text-sm mb-2">GA</span>
            <span className="text-gray-300">GoogleADS</span>
            <span className="text-xs text-red-300">Reviewing keywords</span>
          </li>
          <li className="flex flex-col items-center">
            <span className="bg-[#f59e0b] rounded-full w-8 h-8 flex items-center justify-center text-white text-sm mb-2">YT</span>
            <span className="text-gray-300">Youtube</span>
            <span className="text-xs text-yellow-300">Uploading Shorts</span>
          </li>
          <li className="flex flex-col items-center">
            <span className="bg-[#6366f1] rounded-full w-8 h-8 flex items-center justify-center text-white text-sm mb-2">LG</span>
            <span className="text-gray-300">LeadGen</span>
            <span className="text-xs text-indigo-300">Prospecting leads</span>
          </li>
          <li className="flex flex-col items-center">
            <span className="bg-[#f97316] rounded-full w-8 h-8 flex items-center justify-center text-white text-sm mb-2">CRM</span>
            <span className="text-gray-300">CRM</span>
            <span className="text-xs text-orange-300">Booking appointments</span>
          </li>
        </ul>
      </div>

      {/* Quick Task Assignment Form */}
      <div className="bg-[#111127] p-6 rounded-xl border border-[#1e1e3a]">
        <h3 className="text-lg font-semibold mb-4">Assign Quick Task</h3>
        <form className="flex gap-4">
          <input type="text" placeholder="Task description" className="flex-1 rounded-md bg-[#1e1e3a] text-white p-2 placeholder:text-gray-400 focus:outline-none" />
          <select className="rounded-md bg-[#1e1e3a] text-white p-2 focus:outline-none">
            <option>MegaManager</option>
            <option>Designer</option>
            <option>SMM</option>
            <option>MetaADS</option>
            <option>GoogleADS</option>
            <option>Youtube</option>
            <option>LeadGen</option>
            <option>CRM</option>
          </select>
          <button type="submit" className="bg-[#8b5cf6] rounded-md px-4 py-2 font-semibold text-white hover:bg-purple-600 transition-colors">Assign</button>
        </form>
      </div>
    </div>
  );
}
