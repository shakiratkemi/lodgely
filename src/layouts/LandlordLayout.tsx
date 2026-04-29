import { Link, Outlet, useLocation } from "react-router";

const LandlordLayout = () => {
  const { pathname } = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/landlord" },
    { name: "Properties", path: "/landlord/properties" },
  ];

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-brand-dark text-white p-6">
        <h2 className="text-2xl font-bold mb-10">Landlord</h2>

        <nav className="space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block p-3 rounded-lg font-medium transition ${
                pathname === item.path
                  ? "bg-brand-primary"
                  : "hover:bg-white/10"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-slate-50">
        <Outlet />
      </main>
    </div>
  );
};

export default LandlordLayout;
