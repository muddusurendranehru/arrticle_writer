'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import { topicsApi } from '@/lib/topicApi';
import toast from 'react-hot-toast';

export default function TopicsPage() {
  const router = useRouter();
  const [topics, setTopics] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTopic, setNewTopic] = useState({ name: '', description: '' });
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    try {
      const response = await topicsApi.getAll();
      if (response.data.success) {
        setTopics(response.data.data.topics);
      }
    } catch (error: any) {
      console.error('Load topics error:', error);
      toast.error('Failed to load topics');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTopic.name.trim()) {
      toast.error('Topic name is required');
      return;
    }

    setIsCreating(true);
    try {
      const response = await topicsApi.create({
        name: newTopic.name,
        description: newTopic.description || undefined
      });

      if (response.data.success) {
        toast.success('Topic created!');
        setShowCreateModal(false);
        setNewTopic({ name: '', description: '' });
        loadTopics();
      }
    } catch (error: any) {
      console.error('Create topic error:', error);
      toast.error(error.response?.data?.message || 'Failed to create topic');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteTopic = async (id: string, name: string) => {
    if (!confirm(`Delete topic "${name}"? This will delete all entries in this topic.`)) {
      return;
    }

    try {
      const response = await topicsApi.delete(id);
      if (response.data.success) {
        toast.success('Topic deleted');
        loadTopics();
      }
    } catch (error: any) {
      console.error('Delete topic error:', error);
      toast.error('Failed to delete topic');
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">My Research Topics</h2>
              <p className="text-gray-600 mt-1">Organize your research by topics</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary"
            >
              + New Topic
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading topics...</p>
            </div>
          ) : topics.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-gray-600 mb-4">No topics yet</p>
              <p className="text-sm text-gray-500 mb-6">
                Create topics to organize your research entries
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-primary"
              >
                Create Your First Topic
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topics.map((topic: any) => (
                <div
                  key={topic.id}
                  className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg text-gray-900 flex-1">
                      {topic.name}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded ${
                      topic.status === 'active' ? 'bg-green-100 text-green-700' :
                      topic.status === 'archived' ? 'bg-gray-100 text-gray-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {topic.status}
                    </span>
                  </div>

                  {topic.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {topic.description}
                    </p>
                  )}

                  <div className="flex items-center text-xs text-gray-500 mb-4">
                    <span className="mr-3">
                      📝 {topic.total_entries || 0} entries
                    </span>
                    <span>
                      ✅ {topic.processed_entries || 0} processed
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/topics/${topic.id}`)}
                      className="flex-1 btn-primary text-sm py-2"
                    >
                      Open
                    </button>
                    <button
                      onClick={() => handleDeleteTopic(topic.id, topic.name)}
                      className="px-3 text-red-600 hover:bg-red-50 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create Topic Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-xl font-bold mb-4">Create New Topic</h3>
              
              <form onSubmit={handleCreateTopic}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic Name *
                  </label>
                  <input
                    type="text"
                    value={newTopic.name}
                    onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
                    className="input-field"
                    placeholder="e.g., Insulin.INSULIN RESISTANCE IN YOUNG"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Any format accepted: insulin-resistance, insulin@resistance, etc.
                  </p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={newTopic.description}
                    onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
                    className="input-field"
                    rows={3}
                    placeholder="Brief description of this research topic..."
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setNewTopic({ name: '', description: '' });
                    }}
                    className="flex-1 btn-secondary"
                    disabled={isCreating}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-primary"
                    disabled={isCreating}
                  >
                    {isCreating ? 'Creating...' : 'Create Topic'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  );
}


