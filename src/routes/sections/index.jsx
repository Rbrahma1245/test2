import { useRoutes } from 'react-router-dom';

import { generalRoutes } from 'src/pages/general/GeneralRouteList';
import { customGeneralRoutes } from 'src/pages/custom-general/CustomGeneralRouteList';

import { mainRoutes } from './main';
import { authRoutes } from './auth';
import { dashboardRoutes } from './dashboard';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // {
    //   path: '/',
    //   element: (
    //     <GuestGuard>
    //       <AuthClassicLayout>
    //         <JwtLoginView />
    //       </AuthClassicLayout>
    //     </GuestGuard>
    //   ),
    // },

    // Auth routes
    ...authRoutes,

    // Dashboard routes
    ...dashboardRoutes,

    // ...generalRoutes,
    ...generalRoutes,

    ...customGeneralRoutes,
   

    // Main routes
    ...mainRoutes,

    // No match 404
    // { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}