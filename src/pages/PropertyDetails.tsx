import { useState } from "react";
import { useParams } from "react-router";
import { propertiesData } from "../data/Properties";
import {
  Share2,
  Heart,
  MapPin,
  Bed,
  Bath,
  Maximize,
  ShieldCheck,
  Car,
  Wind,
  CheckCircle,
  Star,
} from "lucide-react";
import { Link } from "react-router";

const PropertyDetails = () => {
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState(false);

  const property = propertiesData.find((p) => p.id === Number(id));

  if (!property) {
    return (
      <div className="h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold text-brand-dark">
          Property not found
        </h1>
        <Link to="/" className="text-brand-primary font-bold hover:underline">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-body pb-20">
      <section className="max-w-7xl mx-auto px-8 pt-24 pb-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-4xl font-heading font-extrabold text-brand-dark mb-2">
              {property.title}
            </h1>
            <div className="flex items-center gap-4 text-brand-light">
              <span className="flex items-center gap-1 font-bold">
                <MapPin size={16} className="text-brand-primary" />{" "}
                {property.location}
              </span>
              <span className="flex items-center gap-1 font-bold">
                <Star size={16} className="text-amber-400 fill-amber-400" /> 4.9
                (24 Reviews)
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="p-3 border border-slate-200 rounded-full hover:bg-slate-50 transition-all">
              <Share2 size={20} className="text-brand-dark" />
            </button>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-3 border border-slate-200 rounded-full transition-all ${isSaved ? "bg-rose-50 border-rose-200" : "hover:bg-slate-50"}`}
            >
              <Heart
                size={20}
                className={
                  isSaved ? "fill-rose-500 text-rose-500" : "text-brand-dark"
                }
              />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-125">
          <div className="md:col-span-2 h-full rounded-[2.5rem] overflow-hidden group">
            <img
              src={property.images[0]}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Main"
            />
          </div>
          <div className="hidden md:grid grid-rows-2 gap-4 h-full">
            <div className="rounded-4xl overflow-hidden">
              <img
                src={property.images[1] || property.images[0]}
                className="w-full h-full object-cover"
                alt="Interior"
              />
            </div>
            <div className="rounded-4xl overflow-hidden">
              <img
                src={property.images[2] || property.images[0]}
                className="w-full h-full object-cover"
                alt="Detail"
              />
            </div>
          </div>
          <div className="hidden md:block rounded-[2.5rem] overflow-hidden relative">
            <img
              src={property.images[0]}
              className="w-full h-full object-cover blur-[2px] opacity-60"
              alt="More"
            />
            <button className="absolute inset-0 m-auto w-fit h-fit bg-white/90 backdrop-blur-md px-6 py-2 rounded-full font-bold text-sm shadow-xl">
              View All Photos
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
   
        <div className="lg:col-span-2 space-y-12">
          <div className="flex justify-between p-8 bg-slate-50 rounded-4xl border border-slate-100">
            <div className="flex flex-col items-center gap-2">
              <Bed className="text-brand-primary" />
              <span className="text-sm font-bold text-brand-dark">
                {property.beds} Bedrooms
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Bath className="text-brand-primary" />
              <span className="text-sm font-bold text-brand-dark">
                {property.baths} Bathrooms
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Maximize className="text-brand-primary" />
              <span className="text-sm font-bold text-brand-dark">
                {property.sqft} SqFt
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Car className="text-brand-primary" />
              <span className="text-sm font-bold text-brand-dark">
                2 Parking
              </span>
            </div>
          </div>

          <div className="md:pt-45">
            <h3 className="text-2xl font-heading font-black text-brand-dark mb-4">
              About this Home
            </h3>
            <p className="text-brand-light leading-relaxed text-lg italic">
              {property.description}
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-heading font-black text-brand-dark mb-6">
              What this place offers
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6">
              {[
                { icon: <ShieldCheck size={20} />, label: "24/7 Security" },
                { icon: <Wind size={20} />, label: "Central AC" },
                { icon: <CheckCircle size={20} />, label: "Verified Listing" },
                { icon: <CheckCircle size={20} />, label: "Power Backup" },
                { icon: <CheckCircle size={20} />, label: "Swimming Pool" },
                { icon: <CheckCircle size={20} />, label: "High-speed Wifi" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-brand-dark font-medium"
                >
                  <span className="text-brand-primary">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="sticky top-28 bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-3xl font-black text-brand-dark">
                  {property.price}
                </span>
                <span className="text-brand-light font-bold"> / year</span>
              </div>
              <div className="bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-lg font-black text-[10px] uppercase tracking-tighter">
                {property.type}
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <label className="text-[10px] uppercase font-black text-slate-400 block mb-1">
                  Duration
                </label>
                <select className="w-full bg-transparent font-bold text-brand-dark outline-none cursor-pointer">
                  <option>1 Year Lease</option>
                  <option>2 Year Lease</option>
                </select>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <label className="text-[10px] uppercase font-black text-slate-400 block mb-1">
                  Inspection Date
                </label>
                <input
                  type="date"
                  className="w-full bg-transparent font-bold text-brand-dark outline-none cursor-pointer"
                />
              </div>
            </div>

            <button className="w-full bg-brand-dark text-white py-5 rounded-2xl font-black text-lg hover:bg-brand-primary hover:shadow-xl transition-all duration-300">
              Schedule Inspection
            </button>

            <p className="text-center text-xs text-brand-light mt-4 font-medium">
              Join 10k+ verified tenants at Lodgely.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyDetails;
