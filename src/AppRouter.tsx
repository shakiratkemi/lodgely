import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
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
const LandlordLayout = lazy(() => import("./layouts/LandlordLayout"));
const LandlordDashboard = lazy(() => import("./pages/landlord/Dashboard"));
const LandlordProperties = lazy(() => import("./pages/landlord/Properties"));
const LandlordLeaseRequests = lazy(
  () => import("./pages/landlord/LeaseRequest"),
);
const LandlordLeases = lazy(() => import("./pages/landlord/Leases"));
const LandlordPayments = lazy(() => import("./pages/landlord/Payments"));
const TenantLayout = lazy(() => import("./layouts/TenantLayout"));
const TenantDashboard = lazy(() => import("./pages/Tenant/Dashboard"));
const TenantProperties = lazy(() => import("./pages/Tenant/Properties"));
const TenantRequests = lazy(() => import("./pages/Tenant/Requests"));
const TenantLeases = lazy(() => import("./pages/Tenant/Leases"));

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

export const AppRouter = () => {
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
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/landlord" element={<LandlordLayout />}>
              <Route index element={<LandlordDashboard />} />
              <Route path="properties" element={<LandlordProperties />} />
              <Route path="leaserequest" element={<LandlordLeaseRequests />} />
              <Route path="leases" element={<LandlordLeases />} />
              <Route path="payments" element={<LandlordPayments />} />
            </Route>

            <Route path="/tenant" element={<TenantLayout />}>
              <Route index element={<TenantDashboard />} />
              <Route path="properties" element={<TenantProperties />} />
              <Route path="properties/:id" element={<PropertyDetailPage />} />
              <Route path="requests" element={<TenantRequests />} />
              <Route path="leases" element={<TenantLeases />} />
              <Route path="lease/:id" element={<LeaseDetailPage />} />
              {/* <Route path="payments" element={<TenantPayments />} />
              <Route path="notifications" element={<TenantNotifications />} /> */}
            </Route>
          </Routes>
        </Suspense>
      </AppLayout>
    </BrowserRouter>
  );
};

export default AppRouter;
