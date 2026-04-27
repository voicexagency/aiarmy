'use client';

import dynamic from 'next/dynamic';

const Office3D = dynamic(() => import('@/components/Office3D'), { ssr: false });

export default function OfficePage() {
  return (
    <div className="w-full h-full">
      <div className="fixed top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
        <h1 className="text-2xl font-bold text-white">🏢 Mairaj's Command — Team Office</h1>
        <div className="flex gap-6 text-sm text-gray-300 mt-2">
          <span>🟢 Working</span>
          <span>🟡 Idle</span>
          <span>🔵 On Break</span>
          <span className="ml-auto">👥 7 Agents</span>
        </div>
      </div>
      <Office3D />
    </div>
  );
}
