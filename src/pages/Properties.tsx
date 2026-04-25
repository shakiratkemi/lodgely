import { useState, useMemo } from "react";
import { Link } from "react-router";
import { propertiesData } from "../data/Properties";
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  Search,
  SlidersHorizontal,
} from "lucide-react";

const PropertiesPage = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter Logic
  const filteredProperties = useMemo(() => {
    return propertiesData.filter((property) => {
      const matchesSearch =
        property.title.toLowerCase().includes(search.toLowerCase()) ||
        property.location.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || property.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const categories = [
    "All",
    "Apartment",
    "Shortlet",
    "Commercial",
    "Full House",
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <section className="bg-brand-dark pt-32 pb-20 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-black text-white mb-6">
            Find Your Dream Space in{" "}
            <span className="text-brand-primary">Nigeria</span>
          </h1>

          <div className="max-w-3xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
            <input
              type="text"
              placeholder="Search by city (Abuja, Lagos, Kano...) or property name"
              className="w-full pl-16 pr-6 py-5 rounded-2xl bg-white shadow-2xl outline-none text-brand-dark font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 -mt-8">
        <div className="bg-white p-4 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-brand-primary text-white shadow-lg shadow-rose-200"
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 text-brand-dark font-black text-sm px-4 py-2 border border-slate-100 rounded-xl hover:bg-slate-50">
            <SlidersHorizontal size={18} /> Filters
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 mt-12">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-heading font-black text-brand-dark">
            Showing {filteredProperties.length} Properties
          </h2>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <Link
                to={`/property/${property.id}`}
                key={property.id}
                className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] uppercase font-extrabold tracking-tighter flex items-center gap-2 backdrop-blur-md ${
                      property.status === "Available"
                        ? "bg-brand-accent text-[#2e4561] border border-brand-accent/30"
                        : "bg-brand-primary/20 text-brand-primary border border-brand-primary/30"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full animate-pulse ${
                        property.status === "Available"
                          ? "bg-[#2e4561]"
                          : "bg-brand-primary"
                      }`}
                    ></span>
                    {property.status}
                  </div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-brand-dark">
                    {property.category}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-brand-dark/80 backdrop-blur-md text-white px-4 py-2 rounded-xl font-black">
                    {property.price}
                    <span className="text-[10px] opacity-70">
                      {" "}
                      {property.category === "Shortlet" ? "/night" : "/yr"}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-1 text-slate-400 text-xs font-bold mb-2 uppercase tracking-tighter">
                    <MapPin size={12} className="text-brand-primary" />{" "}
                    {property.location}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-brand-dark mb-4 line-clamp-1">
                    {property.title}
                  </h3>

                  <div className="flex justify-between items-center py-4 border-t border-slate-50">
                    <div className="flex items-center gap-4 text-brand-dark font-bold text-xs">
                      {property.beds !== "N/A" && (
                        <span className="flex items-center gap-1">
                          <Bed size={16} className="text-slate-300" />{" "}
                          {property.beds}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Bath size={16} className="text-slate-300" />{" "}
                        {property.baths}
                      </span>
                      <span className="flex items-center gap-1">
                        <Maximize size={16} className="text-slate-300" />{" "}
                        {property.sqft}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
            <h3 className="text-xl font-bold text-slate-400">
              No properties found matching your search.
            </h3>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="mt-4 text-brand-primary font-black hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default PropertiesPage;
