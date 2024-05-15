import React, { Suspense } from 'react';

import { AuthGuard } from 'src/auth/guard';

import { LoadingScreen } from 'src/components/loading-screen';

import DashboardLayout from '../layouts/dashboard/index';


const CustomRouter = (Component) => (props) => (
  <AuthGuard>
    <DashboardLayout>
      <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
      </Suspense>
    </DashboardLayout>
  </AuthGuard>
);

export default CustomRouter;
