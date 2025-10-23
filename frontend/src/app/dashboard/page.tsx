'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import DualPanelEditor from '@/components/DualPanelEditor';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <DualPanelEditor />
      </DashboardLayout>
    </ProtectedRoute>
  );
}

