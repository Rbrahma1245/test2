import { lazy, Suspense } from 'react';

import { GuestGuard } from 'src/auth/guard';
import CompactLayout from 'src/layouts/compact';
import AuthClassicLayout from 'src/layouts/auth/classic';

import { SplashScreen } from 'src/components/loading-screen';

import { JwtVerifyView, JwtNewPasswordView, JwtForgotPasswordView, } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

// JWT
const JwtLoginPage = lazy(() => import('src/pages/auth/jwt/login'));
const JwtRegisterPage = lazy(() => import('src/pages/auth/jwt/register'));

// ----------------------------------------------------------------------

export const authRoutes = [
  {
    path: '/Snd0UmVnaXN0ZXJQYWdl',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <GuestGuard>
          <AuthClassicLayout>
            <JwtRegisterPage />
          </AuthClassicLayout>
        </GuestGuard>
      </Suspense>
    ),
  },
  {
    path: '/Snd0Rm9yZ290UGFzc3dvcmRWaWV3',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <GuestGuard>
          <CompactLayout>
            <JwtForgotPasswordView />
          </CompactLayout>
        </GuestGuard>
      </Suspense>
    ),
  },
  {
    path: '/Snd0TmV3UGFzc3dvcmRWaWV3',
    element: (
      <Suspense fallback={<SplashScreen />}>
        {/* <GuestGuard> */}
          <CompactLayout>
            <JwtNewPasswordView />
          </CompactLayout>
        {/* </GuestGuard> */}
      </Suspense>
    ),
  },
  {
    path: '/Snd0VmVyaWZ5Vmlldw==',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <GuestGuard>
          <CompactLayout>
            <JwtVerifyView />
          </CompactLayout>
        </GuestGuard>
      </Suspense>
    ),
  },
  {
    path: '/',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <GuestGuard>
          <AuthClassicLayout>
            <JwtLoginPage />
          </AuthClassicLayout>
        </GuestGuard>
      </Suspense>
    ),
  },
];