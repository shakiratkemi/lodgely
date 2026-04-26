import { LuCircleCheck, LuShieldCheck } from "react-icons/lu";
import { Card, Testimonials } from "../components";
import { Link, useNavigate } from "react-router";
import { propertiesData } from "../data/Properties";
import {
  ShieldCheck,
  Zap,
  ChartNoAxesCombined,
  CreditCard,
  BellRing,
  Maximize,
  Bath,
  Bed,
  MapPin,
} from "lucide-react";

import { RiDoorOpenLine } from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[url('/assets/lodgely.png')] h-160 bg-cover bg-center flex items-center px-8">
        <div className="  max-w-100 bg-brand-dark/20 glass-effect p-12 rounded-4xl border border-white/20 shadow-2xl ">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-white leading-tight">
            Manage Properties, Tenants & Rent –
            <span className="text-[#ffdada]"> All in One Place</span>
          </h1>

          <p className="mt-4 text-brand-white">
            A simple platform for landlords and tenants to manage rentals, track
            payments, and stay organized without stress.
          </p>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => navigate("/signup")}
              className="bg-brand-primary w-40 text-brand-white p-2  rounded-lg font-semibold hover:bg-brand-primary/70"
            >
              Get Started →
            </button>

            <button className="border border-gray-300  font-bold p-2 w-40 rounded-lg text-[#ffdada] hover:bg-gray-100 hover:text-brand-dark">
              <Link to="/properties">View Properties</Link>
            </button>
          </div>
        </div>
      </header>

      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-extrabold text-brand-dark">
              How Lodgely Works
            </h2>
            <p className="text-brand-light mt-2">
              Everything You Need to Manage Rentals Efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card
              title="Property Management"
              desc="Centralize all your listings, availability, and tenant details in one secure dashboard."
              icon={
                <ShieldCheck
                  size={32}
                  className="text-brand-primary w-10 h-10 p-2 rounded-full bg-brand-primary/10"
                />
              }
            />
            <Card
              title="Instant Booking"
              desc="Pay your rent and service charges directly through our secure platform."
              icon={
                <Zap
                  size={32}
                  className="text-brand-accent w-10 h-10 p-2 rounded-full bg-brand-accent/10"
                />
              }
            />
            <Card
              title="Tenant Management"
              desc="Screen applicants, manage lease agreements, and communicate seamlessly with tenants."
              icon={
                <IoIosPeople className="text-brand-secondary w-10 h-10 p-2 rounded-full bg-brand-secondary/10" />
              }
            />
            <Card
              title="Rent Tracking"
              desc="Monitor income flows with real-time analytics and beautiful dashboards."
              icon={
                <ChartNoAxesCombined
                  size={32}
                  className="text-brand-primary w-10 h-10 p-2 rounded-full bg-brand-primary/10"
                />
              }
            />
            <Card
              title="Online Payments"
              desc="Secure, automated rent payments with instant confirmation and receipts."
              icon={
                <CreditCard
                  size={32}
                  className="text-brand-accent w-10 h-10 p-2 rounded-full bg-brand-accent/10"
                />
              }
            />
            <Card
              title="Automated Reminders"
              desc="Send rent reminders and notifications automatically to avoid late payments."
              icon={
                <BellRing
                  size={32}
                  className="text-brand-secondary w-10 h-10 p-2 rounded-full bg-brand-secondary/10"
                />
              }
            />
          </div>
        </div>
      </section>

      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="uppercase text-brand-primary font-bold">the process</p>
          <h2 className="tracking-widest text-4xl font-heading font-medium text-brand-dark">
            Simple. Sophisticated. Seamless.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          <div className="relative z-10 text-center">
            <div className="w-16 h-16 bg-brand-primary text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-6 rotate-3">
              1
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-2">
              Create an Account
            </h3>
            <p className="text-brand-light text-sm">
              Join our ecosystem as either a property owner or a prospective
              tenant in minutes.
            </p>
          </div>

          <div className="relative z-10 text-center">
            <div className="w-16 h-16 bg-brand-dark text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-6 -rotate-3">
              2
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-2">
              Add or Find Property
            </h3>
            <p className="text-brand-light text-sm">
              List your portfolio with high-res assets or browse our curated
              editorial listings.
            </p>
          </div>

          <div className="relative z-10 text-center">
            <div className="w-16 h-16 bg-brand-secondary text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-6 rotate-12">
              3
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-2">
              Manage Rent Easily
            </h3>
            <p className="text-brand-light text-sm">
              Automate the financial bridge between ownership and occupancy
              effortlessly.
            </p>
          </div>

          <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-slate-100 z-0"></div>
        </div>
      </section>

      <section className="bg-surface-bg py-20 px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-surface-card p-8">
            <h3 className="font-bold text-brand-primary mb-4 flex items-center gap-2 text-3xl">
              <LuShieldCheck />
              <span className="text-brand-dark"> For Landlords</span>
            </h3>
            <ul className="space-y-6 pt-4 text-brand-light text-sm">
              <li className="flex items-center gap-3 md:text-[18px] text-brand-accent">
                <LuCircleCheck className="text-xl" />
                <span className="text-brand-light">
                  List unlimited properties
                </span>
              </li>
              <li className="flex items-center gap-3 md:text-[18px] text-brand-accent">
                <LuCircleCheck className="text-xl" />
                <span className="text-brand-light">Track rent payments</span>
              </li>
              <li className="flex items-center gap-3 md:text-[18px] text-brand-accent">
                <LuCircleCheck className="text-xl" />
                <span className="text-brand-light"> Monitor occupancy</span>
              </li>
              <li className="flex items-center gap-3 md:text-[18px] text-brand-accent">
                <LuCircleCheck className="text-xl" />
                <span className="text-brand-light">Reduce late payments</span>
              </li>
            </ul>
          </div>

          <div className="bg-brand-dark text-white p-8">
            <h3 className="font-bold text-brand-white mb-4 flex items-center gap-2 text-3xl">
              <RiDoorOpenLine />
              <span>For Tenants</span>
            </h3>
            <ul className="space-y-6 pt-4 text-white/70 text-sm">
              <li className="flex items-center gap-3 md:text-[18px] text-brand-secondary">
                <LuCircleCheck className="text-xl" />
                <span className="text-brand-white">
                  {" "}
                  Find verified properties
                </span>
              </li>
              <li className="flex items-center gap-3 md:text-[18px] text-brand-secondary">
                <LuCircleCheck className="text-xl" />
                <span className="text-brand-white"> Pay rent easily</span>
              </li>
              <li className="flex items-center gap-3 md:text-[18px] text-brand-secondary">
                <LuCircleCheck className="text-xl" />
                <span className="text-brand-white"> Track payment history</span>
              </li>
              <li className="flex items-center gap-3 md:text-[18px] text-brand-secondary">
                <LuCircleCheck className="text-xl" />
                <span className="text-brand-white"> Get reminders</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 bg-brand-dark text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-12">
            <div className="">
              <div>
                <h2 className="text-4xl font-heading font-extrabold">
                  Popular Neighborhoods
                </h2>
                <p className="text-white/60 mt-2">
                  The most sought-after spots in the city.
                </p>
              </div>
            </div>
            <Link
              to="/properties"
              className=" md:block border border-white/20 px-6 py-2 rounded-full hover:bg-white hover:text-brand-dark transition-all font-bold"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {propertiesData.slice(0, 3).map((property) => (
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
        </div>
      </section>

      <section>
        <Testimonials />
      </section>

      <section className="bg-brand-dark text-brand-white py-20 text-center">
        <h2 className="text-3xl font-bold">
          Start Managing Your Properties Smarter Today
        </h2>

        <p className="text-gray-400 mt-2">
          Join thousands of landlords and tenants.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="bg-brand-primary text-brand-white px-6 py-3 rounded-lg 
             shadow-md hover:shadow-xl 
             hover:-translate-y-0.5 
             active:translate-y-0 active:shadow-md
             transition-all duration-300 ease-in-out"
          >
            Create Free Account
          </button>

          <button className="border border-gray-600 px-6 py-3 shadow-md rounded-lg transition-transform duration-300 ease-in-out hover:scale-110">
            Browse Listings
          </button>
        </div>
      </section>

      {/* <section className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1">
          <h2 className="text-4xl font-heading font-extrabold text-brand-dark mb-6">
            Designed for the <br />
            modern tenant.
          </h2>
          <p className="text-brand-light font-body mb-8 leading-relaxed">
            We know that finding a home is more than just a transaction. It's
            about finding where your next chapter begins. That's why we've built
            tools to help you manage utilities, talk to landlords, and pay rent
            in one place.
          </p>
          <button className="text-brand-primary font-bold flex items-center gap-2 group">
            See how we protect your data{" "}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
        <div className="flex-1 w-full h-80 flex items-center justify-center">
          <img
            src="/assets/apartment-4.jpg"
            alt="Modern Duplex"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </div>
      </section> */}
    </div>
  );
};

export default LandingPage;
