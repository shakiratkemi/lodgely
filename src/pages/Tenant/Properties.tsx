import { useEffect, useState } from "react";
import { Search, MapPin, Home, Filter } from "lucide-react";
import { getAllProperties } from "../../services/tenant.service";
import { Link } from "react-router";

const BrowseProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    propertyType: "",
  });

  const fetchProps = async () => {
    setLoading(true);
    try {
      const res = await getAllProperties(filters);
      setProperties(res.data.items || []);
    } catch (err) {
      console.error("Failed to load properties", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProps();
  }, []);

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(num);
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-brand-dark">
            Find your next home
          </h1>
          <p className="text-slate-500">
            Browse through available approved properties.
          </p>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar */}
        <aside className="w-full lg:w-72 space-y-6 bg-white p-6 rounded-3xl border border-slate-100 h-fit">
          <div className="flex items-center gap-2 font-bold text-brand-dark border-b pb-4">
            <Filter size={18} /> Filters
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">
                Location
              </label>
              <input
                type="text"
                placeholder="e.g. Lagos"
                className="w-full mt-1 p-3 bg-slate-50 border-none rounded-xl text-sm"
                onChange={(e) =>
                  setFilters({ ...filters, location: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">
                Property Type
              </label>
              <select
                className="w-full mt-1 p-3 bg-slate-50 border-none rounded-xl text-sm"
                onChange={(e) =>
                  setFilters({ ...filters, propertyType: e.target.value })
                }
              >
                <option value="">All Types</option>
                <option value="0">House</option>
                <option value="1">Apartment</option>
                <option value="2">Shop</option>
                <option value="3">Land</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">
                  Min Price
                </label>
                <input
                  type="number"
                  className="w-full mt-1 p-3 bg-slate-50 border-none rounded-xl text-sm"
                  onChange={(e) =>
                    setFilters({ ...filters, minPrice: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">
                  Max Price
                </label>
                <input
                  type="number"
                  className="w-full mt-1 p-3 bg-slate-50 border-none rounded-xl text-sm"
                  onChange={(e) =>
                    setFilters({ ...filters, maxPrice: e.target.value })
                  }
                />
              </div>
            </div>

            <button
              onClick={fetchProps}
              className="w-full py-3 bg-brand-primary text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              Apply Filters
            </button>
          </div>
        </aside>

        {/* Property Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="text-center py-20 font-bold text-slate-400">
              Searching properties...
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
              <Home className="mx-auto mb-4 text-slate-300" size={48} />
              <p className="text-slate-500 font-medium">
                No properties match your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {properties.map((prop: any) => (
                <Link
                  key={prop.id}
                  to={`/tenant/properties/${prop.id}`}
                  className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-brand-primary/5 transition-all"
                >
                  <div className="h-50 bg-slate-200 relative overflow-hidden">
                    <img
                      src={
                        prop.primaryImageUrl ||
                        "https://placehold.co/600x400?text=No+Image"
                      }
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase text-brand-dark">
                      {prop.propertyType}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-brand-dark truncate">
                      {prop.title}
                    </h3>
                    <div className="flex items-center gap-1 text-slate-400 text-xs mt-1 mb-4">
                      <MapPin size={12} /> {prop.location}
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                      <span className="text-brand-primary font-black text-lg">
                        {formatCurrency(prop.rentAmount)}
                        <span className="text-[12px] text-brand-accent font-bold ml-1">
                          / year
                        </span>
                      </span>
                    </div>
                    <Link
                      to={`/tenant/properties/${prop.id}`}
                      className="text-xs m-auto flex items-center justify-center mt-4 font-bold bg-brand-light p-2 rounded-2xl text-brand-white hover:bg-brand-primary transition-colors w-full"
                    >
                      View Details
                    </Link>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseProperties;
