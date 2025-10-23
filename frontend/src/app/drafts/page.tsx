'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import { draftsApi } from '@/lib/api';
import { useDraftStore } from '@/store/useDraftStore';
import toast from 'react-hot-toast';

export default function DraftsPage() {
  const router = useRouter();
  const { drafts, setDrafts, setCurrentDraft, removeDraft } = useDraftStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDrafts();
  }, []);

  const loadDrafts = async () => {
    try {
      const response = await draftsApi.getAll();
      if (response.data.success) {
        setDrafts(response.data.data.drafts);
      }
    } catch (error) {
      toast.error('Failed to load drafts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDraft = (draft: any) => {
    setCurrentDraft(draft);
    router.push('/dashboard');
  };

  const handleDeleteDraft = async (id: string) => {
    if (!confirm('Are you sure you want to delete this draft?')) {
      return;
    }

    try {
      const response = await draftsApi.delete(id);
      if (response.data.success) {
        removeDraft(id);
        toast.success('Draft deleted');
      }
    } catch (error) {
      toast.error('Failed to delete draft');
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">My Drafts</h2>
            <button
              onClick={() => router.push('/dashboard')}
              className="btn-primary"
            >
              + New Draft
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading drafts...</p>
            </div>
          ) : drafts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No drafts yet</p>
              <button
                onClick={() => router.push('/dashboard')}
                className="btn-primary"
              >
                Create Your First Draft
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {drafts.map((draft: any) => (
                <div
                  key={draft.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-lg mb-2 truncate">
                    {draft.title || 'Untitled Draft'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {draft.original_content?.substring(0, 150)}...
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>{new Date(draft.created_at).toLocaleDateString()}</span>
                    <span className={`px-2 py-1 rounded ${
                      draft.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {draft.status}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenDraft(draft)}
                      className="flex-1 btn-primary text-sm py-1"
                    >
                      Open
                    </button>
                    <button
                      onClick={() => handleDeleteDraft(draft.id)}
                      className="px-3 btn-danger text-sm py-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}

