import { lazy, Suspense } from 'react';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------
const CommonDashboard = lazy(() => import('src/pages/dashboard/common-dashboard'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: '/cd4b3359-ae12-46e4-a381-1693725dd780',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <CommonDashboard />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
  },
];
