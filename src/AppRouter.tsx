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
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const hideNavbar = location.pathname.startsWith("/dashboard");
  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
      {!hideNavbar && <Footer />}
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
          </Routes>
        </Suspense>
      </AppLayout>
    </BrowserRouter>
  );
};

export default AppRouter;
