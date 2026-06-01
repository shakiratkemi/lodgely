import { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router";
import { Footer, Navbar } from "./components";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LandingPage = lazy(() => import("./pages/Landing"));
const AboutPage = lazy(() => import("./pages/About"));
const ContactPage = lazy(() => import("./pages/Contact"));
const PropertiesPage = lazy(() => import("./pages/Properties"));
const AuthPage = lazy(() => import("./pages/Auth"));
const DashboardPage = lazy(() => import("./pages/Dashboard"));
const PropertyDetailPage = lazy(() => import("./pages/PropertyDetails"));
const LeaseDetailPage = lazy(() => import("./pages/LeaseDetails"));

const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/Admin/Dashboard"));
const AdminPropertyQueue = lazy(() => import("./pages/Admin/PropertyQueue"));
//   () => import("./pages/admin/PropertyQueue"),
// );
const AdminUserManagement = lazy(() => import("./pages/Admin/UserManagement"));
const AdminNotifications = lazy(() => import("./pages/Admin/Notifications"));

const LandlordLayout = lazy(() => import("./layouts/LandlordLayout"));
const LandlordDashboard = lazy(() => import("./pages/landlord/Dashboard"));
const LandlordProperties = lazy(() => import("./pages/landlord/Properties"));
const LandlordLeaseRequests = lazy(
  () => import("./pages/landlord/LeaseRequest"),
);
const LandlordLeases = lazy(() => import("./pages/landlord/Leases"));
const LandlordPayments = lazy(() => import("./pages/landlord/Payments"));

const LandlordNotifications = lazy(
  () => import("./pages/landlord/Notifications"),
);

const TenantLayout = lazy(() => import("./layouts/TenantLayout"));
const TenantDashboard = lazy(() => import("./pages/Tenant/Dashboard"));
const TenantProperties = lazy(() => import("./pages/Tenant/Properties"));
const TenantRequests = lazy(() => import("./pages/Tenant/Requests"));
const TenantLeases = lazy(() => import("./pages/Tenant/Leases"));
const TenantPayments = lazy(() => import("./pages/Tenant/Payments"));
const TenantNotifications = lazy(() => import("./pages/Tenant/Notifications"));

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const dashboardPaths = ["/dashboard", "/landlord", "/tenant", "/admin"];

  const isDashboard = dashboardPaths.some((path) =>
    location.pathname.startsWith(path),
  );
  return (
    <>
      {!isDashboard && <Navbar />}
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

const getUser = () => {
  try {
    const userString = localStorage.getItem("user");
    if (!userString || userString === "undefined" || userString === "null") {
      return null;
    }
    return JSON.parse(userString);
  } catch (err) {
    console.error("Could not parse user data", err);
    return null;
  }
};

export const AppRouter = () => {
  const [user, setUser] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
    setCheckingAuth(false);
  }, []);

  if (checkingAuth) {
    return (
      <div className="flex justify-center text-brand-secondary font-extrabold items-center h-screen">
        <AiOutlineLoading3Quarters className="animate-spin text-brand-secondary w-6 h-6 mr-2" />
        Verifying Session...
      </div>
    );
  }
  const isAdmin =
    user &&
    (String(user.role).toLowerCase() === "admin" || String(user.role) === "0");
  return (
    <BrowserRouter>
      <AppLayout>
        <Suspense
          fallback={
            <div className="flex justify-center text-brand-secondary font-extrabold items-center h-[60vh]">
              <AiOutlineLoading3Quarters className="animate-spin text-brand-secondary w-6 h-6" />
              Loading...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/property/:id" element={<PropertyDetailPage />} />
            <Route path="/login" element={<AuthPage type="login" />} />
            <Route path="/signup" element={<AuthPage type="signup" />} />

            <Route
              path="/admin"
              element={
                isAdmin ? <AdminLayout /> : <Navigate to="/login" replace />
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="properties" element={<AdminPropertyQueue />} />
              <Route path="users" element={<AdminUserManagement />} />
              <Route path="notifications" element={<AdminNotifications />} />
            </Route>

            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/landlord" element={<LandlordLayout />}>
              <Route index element={<LandlordDashboard />} />
              <Route path="properties" element={<LandlordProperties />} />
              <Route path="leaserequest" element={<LandlordLeaseRequests />} />
              <Route path="leases" element={<LandlordLeases />} />
              <Route path="leases/:id" element={<LeaseDetailPage />} />
              <Route path="payments" element={<LandlordPayments />} />
              <Route path="notifications" element={<LandlordNotifications />} />
            </Route>

            <Route path="/tenant" element={<TenantLayout />}>
              <Route index element={<TenantDashboard />} />
              <Route path="properties" element={<TenantProperties />} />
              <Route path="properties/:id" element={<PropertyDetailPage />} />
              <Route path="requests" element={<TenantRequests />} />
              <Route path="leases" element={<TenantLeases />} />
              <Route path="leases/:id" element={<LeaseDetailPage />} />
              <Route path="payments" element={<TenantPayments />} />
              <Route path="notifications" element={<TenantNotifications />} />
            </Route>
          </Routes>
        </Suspense>
      </AppLayout>
    </BrowserRouter>
  );
};

export default AppRouter;
