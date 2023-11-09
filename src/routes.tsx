import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute';
import navConfig from './layouts/dashboard/nav/config';

const DashboardLayout = lazy(() => import('./layouts/dashboard'));
const SimpleLayout = lazy(() => import('./layouts/simple'));
const CitiesPage = lazy(() => import('./pages/CitiesPage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));
const HotelsPage = lazy(() => import('./pages/HotelsPage'));
const TourPackPage = lazy(() => import('./pages/TourPackPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const Page404 = lazy(() => import('./pages/Page404'));

const firstPage = navConfig[0].path;

export default function Router() {
    const routes = useRoutes([
        {
            path: "/dashboard",
            element: (
                <ProtectedRoute>
                    <DashboardLayout />
                </ProtectedRoute>
            ),
            children: [
                { element: <Navigate to={firstPage} />, index: true },
                { path: "cities", element: <CitiesPage /> },
                { path: "hotels", element: <HotelsPage /> },
                { path: "tour-packs", element: <TourPackPage /> },
                { path: "orders", element: <OrdersPage /> }
            ],
        },
        {
            path: "login",
            element:
                <Suspense fallback="">
                    <LoginPage />
                </Suspense>
        },
        {
            element: <SimpleLayout />,
            children: [
                { element: <Navigate to={firstPage} />, index: true },
                {
                    path: "404",
                    element: (
                        <Suspense fallback="">
                            <Page404 />
                        </Suspense>
                    ),
                },
                { path: "*", element: <Navigate to="/404" /> },
            ],
        },
        {
            path: "*",
            element: <Navigate to="/404" replace />,
        },
    ]);

    return routes;
}