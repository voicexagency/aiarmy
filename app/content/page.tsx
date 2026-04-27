'use client';

import { useState, useEffect } from 'react';

interface ContentItem {
  id: string;
  title: string;
  type: 'blog' | 'social' | 'email' | 'video';
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  author: string;
  platform?: string;
  publishDate?: string;
  views?: number;
  engagement?: number;
  description: string;
  createdAt: string;
}

export default function ContentPage() {
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'Top 10 AI Marketing Trends 2026',
      type: 'blog',
      status: 'published',
      author: 'Copywriter',
      publishDate: '2026-04-25',
      views: 3420,
      engagement: 285,
      description: 'Comprehensive guide on latest AI marketing trends',
      createdAt: '2026-04-20T10:00:00Z',
    },
    {
      id: '2',
      title: 'Behind the Scenes: Our AI Team',
      type: 'video',
      status: 'scheduled',
      author: 'Youtube',
      platform: 'YouTube',
      publishDate: '2026-04-28',
      description: 'Documentary-style video showcasing our autonomous agents',
      createdAt: '2026-04-15T14:30:00Z',
    },
    {
      id: '3',
      title: 'Weekly Newsletter - April',
      type: 'email',
      status: 'scheduled',
      author: 'Email Marketing Manager',
      publishDate: '2026-04-28',
      engagement: 42,
      description: 'Weekly digest of AI updates and tips',
      createdAt: '2026-04-22T09:00:00Z',
    },
    {
      id: '4',
      title: 'Instagram Reels Bundle (Week 17)',
      type: 'social',
      status: 'published',
      author: 'SMM',
      platform: 'Instagram',
      views: 12540,
      engagement: 1204,
      description: '7 daily reels + carousel posts',
      createdAt: '2026-04-18T11:00:00Z',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [formData, setFormData] = useState({
    title: '',
    type: 'blog' as 'blog' | 'social' | 'email' | 'video',
    author: 'Copywriter',
    status: 'draft' as 'draft' | 'scheduled' | 'published' | 'archived',
    platform: '',
    description: '',
  });

  const authors = [
    'Copywriter', 'SMM', 'Youtube', 'Email Marketing Manager', 'Designer', 'AI Analyst'
  ];

  const platforms = ['Blog', 'Instagram', 'Facebook', 'LinkedIn', 'TikTok', 'YouTube', 'Email'];

  const filteredItems = contentItems.filter(item => {
    const typeMatch = filterType === 'all' || item.type === filterType;
    const statusMatch = filterStatus === 'all' || item.status === filterStatus;
    return typeMatch && statusMatch;
  });

  const handleCreateContent = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: ContentItem = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
      publishDate: new Date().toISOString().split('T')[0],
    };
    setContentItems([newItem, ...contentItems]);
    setShowModal(false);
    setFormData({
      title: '',
      type: 'blog',
      author: 'Copywriter',
      status: 'draft',
      platform: '',
      description: '',
    });
  };

  const handleDeleteContent = (id: string) => {
    setContentItems(contentItems.filter(item => item.id !== id));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'blog': return '📝';
      case 'social': return '📱';
      case 'email': return '📧';
      case 'video': return '📹';
      default: return '📄';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'blog': return 'bg-blue-600';
      case 'social': return 'bg-pink-600';
      case 'email': return 'bg-purple-600';
      case 'video': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-600';
      case 'scheduled': return 'bg-yellow-600';
      case 'published': return 'bg-green-600';
      case 'archived': return 'bg-slate-600';
      default: return 'bg-gray-600';
    }
  };

  const stats = {
    total: contentItems.length,
    published: contentItems.filter(i => i.status === 'published').length,
    scheduled: contentItems.filter(i => i.status === 'scheduled').length,
    totalViews: contentItems.reduce((sum, i) => sum + (i.views || 0), 0),
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#111127] p-6 rounded-xl border border-[#1e1e3a]">
          <span className="text-sm text-gray-400">Total Content</span>
          <span className="text-3xl font-bold text-white">{stats.total}</span>
        </div>
        <div className="bg-[#111127] p-6 rounded-xl border border-[#1e1e3a]">
          <span className="text-sm text-gray-400">Published</span>
          <span className="text-3xl font-bold text-green-400">{stats.published}</span>
        </div>
        <div className="bg-[#111127] p-6 rounded-xl border border-[#1e1e3a]">
          <span className="text-sm text-gray-400">Scheduled</span>
          <span className="text-3xl font-bold text-yellow-400">{stats.scheduled}</span>
        </div>
        <div className="bg-[#111127] p-6 rounded-xl border border-[#1e1e3a]">
          <span className="text-sm text-gray-400">Total Views</span>
          <span className="text-3xl font-bold text-blue-400">{stats.totalViews.toLocaleString()}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filterType === 'all'
                ? 'bg-[#8b5cf6] text-white'
                : 'bg-[#1e1e3a] text-gray-300 hover:text-white'
            }`}
          >
            All Types
          </button>
          <button
            onClick={() => setFilterType('blog')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filterType === 'blog'
                ? 'bg-blue-600 text-white'
                : 'bg-[#1e1e3a] text-gray-300 hover:text-white'
            }`}
          >
            📝 Blog
          </button>
          <button
            onClick={() => setFilterType('social')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filterType === 'social'
                ? 'bg-pink-600 text-white'
                : 'bg-[#1e1e3a] text-gray-300 hover:text-white'
            }`}
          >
            📱 Social
          </button>
          <button
            onClick={() => setFilterType('email')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filterType === 'email'
                ? 'bg-purple-600 text-white'
                : 'bg-[#1e1e3a] text-gray-300 hover:text-white'
            }`}
          >
            📧 Email
          </button>
          <button
            onClick={() => setFilterType('video')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filterType === 'video'
                ? 'bg-red-600 text-white'
                : 'bg-[#1e1e3a] text-gray-300 hover:text-white'
            }`}
          >
            📹 Video
          </button>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#8b5cf6] hover:bg-purple-600 px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          + Create Content
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-[#111127] rounded-xl border border-[#1e1e3a] p-6 hover:border-[#8b5cf6] transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getTypeIcon(item.type)}</span>
                <span className={`${getTypeColor(item.type)} text-white text-xs px-2 py-1 rounded-full font-semibold`}>
                  {item.type}
                </span>
              </div>
              <button
                onClick={() => handleDeleteContent(item.id)}
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                ×
              </button>
            </div>

            <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs text-gray-400">
                <span>Author: {item.author}</span>
                <span>{item.platform && `📌 ${item.platform}`}</span>
              </div>
              {item.publishDate && (
                <div className="text-xs text-gray-400">
                  {item.status === 'scheduled' ? 'Publishing:' : 'Published:'} {item.publishDate}
                </div>
              )}
            </div>

            <div className="flex gap-2 mb-4">
              {item.views && (
                <div className="flex-1 bg-[#1e1e3a] rounded-lg p-2 text-center">
                  <div className="text-xs text-gray-400">Views</div>
                  <div className="text-sm font-bold text-white">{item.views.toLocaleString()}</div>
                </div>
              )}
              {item.engagement && (
                <div className="flex-1 bg-[#1e1e3a] rounded-lg p-2 text-center">
                  <div className="text-xs text-gray-400">Engagement</div>
                  <div className="text-sm font-bold text-[#8b5cf6]">{item.engagement}</div>
                </div>
              )}
            </div>

            <span className={`${getStatusColor(item.status)} text-white text-xs px-3 py-1 rounded-full font-semibold w-full block text-center`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111127] rounded-xl border border-[#1e1e3a] p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4">Create New Content</h2>

            <form onSubmit={handleCreateContent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#1e1e3a] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'blog' | 'social' | 'email' | 'video' })}
                  className="w-full bg-[#1e1e3a] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
                >
                  <option value="blog">Blog Post</option>
                  <option value="social">Social Media</option>
                  <option value="email">Email</option>
                  <option value="video">Video</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Author</label>
                <select
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full bg-[#1e1e3a] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
                >
                  {authors.map(author => (
                    <option key={author} value={author}>{author}</option>
                  ))}
                </select>
              </div>

              {(formData.type as string) === 'social' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Platform</label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    className="w-full bg-[#1e1e3a] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
                  >
                    <option value="">Select platform</option>
                    {platforms.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full bg-[#1e1e3a] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
                >
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#1e1e3a] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] h-20"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#8b5cf6] hover:bg-purple-600 py-2 rounded-lg font-semibold transition-colors"
                >
                  Create
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
