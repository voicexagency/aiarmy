'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface Deal {
  id: string;
  clientName: string;
  dealValue: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  dealType: string;
  startDate: string;
  endDate: string;
  paymentStatus: 'pending' | 'partially_paid' | 'paid';
  assignedAgent: string;
  progress: number;
}

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [formData, setFormData] = useState({
    clientName: '',
    dealValue: '',
    status: 'pending',
    dealType: '',
    endDate: '',
    paymentStatus: 'pending',
    assignedAgent: 'MegaManager',
  });

  const agents = [
    'MegaManager', 'Designer', 'SMM', 'MetaADS', 'GoogleADS', 'Youtube', 'LeadGen',
    'CRM', 'PhoneCaller', 'Copywriter', 'Email Marketing Manager', 'AI Analyst',
    'Automation Engineer', 'SEO Specialist', 'Customer Support Rep'
  ];

  useEffect(() => {
    fetchDeals();
  }, []);

  useEffect(() => {
    if (filterStatus === 'all') {
      setFilteredDeals(deals);
    } else {
      setFilteredDeals(deals.filter(d => d.status === filterStatus));
    }
  }, [deals, filterStatus]);

  const fetchDeals = async () => {
    const res = await fetch('/api/deals');
    const data = await res.json();
    setDeals(data);
  };

  const handleCreateDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/deals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        dealValue: parseInt(formData.dealValue),
      }),
    });
    const newDeal = await res.json();
    setDeals([...deals, newDeal]);
    setShowModal(false);
    setFormData({
      clientName: '',
      dealValue: '',
      status: 'pending',
      dealType: '',
      endDate: '',
      paymentStatus: 'pending',
      assignedAgent: 'MegaManager',
    });
  };

  const handleDeleteDeal = async (dealId: string) => {
    await fetch(`/api/deals/${dealId}`, { method: 'DELETE' });
    setDeals(deals.filter(d => d.id !== dealId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-600';
      case 'active':
        return 'bg-blue-600';
      case 'completed':
        return 'bg-green-600';
      case 'cancelled':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getPaymentColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-400';
      case 'partially_paid':
        return 'text-yellow-400';
      case 'pending':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const activeDealCount = deals.filter(d => d.status === 'active').length;
  const totalEarned = deals.filter(d => d.paymentStatus === 'paid').reduce((sum, d) => sum + d.dealValue, 0);
  const pendingPayment = deals.filter(d => d.paymentStatus === 'pending' || d.paymentStatus === 'partially_paid').reduce((sum, d) => sum + d.dealValue, 0);

  return (
    <div className="flex flex-col gap-8">
      {/* Stats Row */}
      <div className="flex gap-6 mb-6">
        <div className="bg-[#111127] p-6 rounded-xl border border-[#1e1e3a] flex-1">
          <span className="text-sm text-gray-400">Active Deals</span>
          <span className="text-3xl font-bold text-blue-400">{activeDealCount}</span>
        </div>
        <div className="bg-[#111127] p-6 rounded-xl border border-[#1e1e3a] flex-1">
          <span className="text-sm text-gray-400">Total Earned</span>
          <span className="text-3xl font-bold text-green-400">${totalEarned.toLocaleString()}</span>
        </div>
        <div className="bg-[#111127] p-6 rounded-xl border border-[#1e1e3a] flex-1">
          <span className="text-sm text-gray-400">Pending Payment</span>
          <span className="text-3xl font-bold text-yellow-400">${pendingPayment.toLocaleString()}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filterStatus === 'all'
                ? 'bg-[#8b5cf6] text-white'
                : 'bg-[#1e1e3a] text-gray-300 hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus('active')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filterStatus === 'active'
                ? 'bg-[#8b5cf6] text-white'
                : 'bg-[#1e1e3a] text-gray-300 hover:text-white'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filterStatus === 'pending'
                ? 'bg-[#8b5cf6] text-white'
                : 'bg-[#1e1e3a] text-gray-300 hover:text-white'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filterStatus === 'completed'
                ? 'bg-[#8b5cf6] text-white'
                : 'bg-[#1e1e3a] text-gray-300 hover:text-white'
            }`}
          >
            Completed
          </button>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#8b5cf6] hover:bg-purple-600 px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          + Add Deal
        </button>
      </div>

      {/* Deals Table */}
      <div className="bg-[#111127] rounded-xl border border-[#1e1e3a] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#1e1e3a] border-b border-[#2a2a4a]">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Client</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Deal Type</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Value</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Progress</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Status</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Payment</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Agent</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeals.map((deal) => (
              <tr key={deal.id} className="border-b border-[#1e1e3a] hover:bg-[#1a1a2e] transition-colors">
                <td className="px-6 py-4 text-white font-semibold">{deal.clientName}</td>
                <td className="px-6 py-4 text-gray-300 text-sm">{deal.dealType}</td>
                <td className="px-6 py-4 text-white font-semibold">${deal.dealValue.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-[#1e1e3a] rounded-full h-2">
                      <div
                        className="bg-[#8b5cf6] h-2 rounded-full transition-all"
                        style={{ width: `${deal.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">{deal.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`${getStatusColor(deal.status)} text-white text-xs px-3 py-1 rounded-full font-semibold`}>
                    {deal.status}
                  </span>
                </td>
                <td className={`px-6 py-4 text-sm font-semibold ${getPaymentColor(deal.paymentStatus)}`}>
                  {deal.paymentStatus === 'partially_paid' ? 'Partial' : deal.paymentStatus}
                </td>
                <td className="px-6 py-4 text-gray-300 text-sm">{deal.assignedAgent}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDeleteDeal(deal.id)}
                    className="text-gray-400 hover:text-red-400 transition-colors font-semibold"
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111127] rounded-xl border border-[#1e1e3a] p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4">Add New Deal</h2>

            <form onSubmit={handleCreateDeal} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Client Name</label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full bg-[#1e1e3a] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Deal Type</label>
                <input
                  type="text"
                  value={formData.dealType}
                  onChange={(e) => setFormData({ ...formData, dealType: e.target.value })}
                  className="w-full bg-[#1e1e3a] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
                  placeholder="e.g., Social Media Campaign"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Deal Value ($)</label>
                <input
                  type="number"
                  value={formData.dealValue}
                  onChange={(e) => setFormData({ ...formData, dealValue: e.target.value })}
                  className="w-full bg-[#1e1e3a] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">End Date</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full bg-[#1e1e3a] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Assign to Agent</label>
                <select
                  value={formData.assignedAgent}
                  onChange={(e) => setFormData({ ...formData, assignedAgent: e.target.value })}
                  className="w-full bg-[#1e1e3a] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
                >
                  {agents.map(agent => (
                    <option key={agent} value={agent}>{agent}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Payment Status</label>
                <select
                  value={formData.paymentStatus}
                  onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
                  className="w-full bg-[#1e1e3a] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
                >
                  <option value="pending">Pending</option>
                  <option value="partially_paid">Partially Paid</option>
                  <option value="paid">Paid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-[#1e1e3a] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#8b5cf6] hover:bg-purple-600 py-2 rounded-lg font-semibold transition-colors"
                >
                  Add Deal
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-[#1e1e3a] hover:bg-[#2a2a4a] py-2 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
