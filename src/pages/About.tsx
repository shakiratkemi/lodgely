import { Users, Target, ShieldCheck, Heart } from "lucide-react";
import { ValueCard } from "../components";
import { useNavigate } from "react-router";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white font-body">
      <section className="bg-brand-light/10 p-5 grid md:grid-cols-2 gap-20 items-center">
        <div className="w-xl">
          <h6 className="text-brand-primary font-extrabold text-left">
            EST 2026
          </h6>
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold mb-8">
            Redefining what it
            <span className="text-brand-primary"> means to be home.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-brand-dark leading-relaxed font-bold text-center">
            Lodgely was born out of a simple observation: renting in modern
            cities is broken. We’re here to fix it by combining rigorous
            verification with seamless technology. Elevating property management
            into a curated experience. We harmonize the relationship between
            landmark properties, discerning landlords, and modern tenants.
          </p>
        </div>
        <div className="w-4xl">
          <img
            src="/assets/lodgely3.png"
            alt="Modern Duplex"
            className="  ease-out hover:scale-110
          rounded-xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-700"
          />
        </div>
      </section>

      <section className="ml-5 py-24 px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-4xl font-heading font-extrabold text-brand-dark mb-6">
            From <span className="text-brand-secondary">Frustration</span> to a{" "}
            <span className="text-brand-secondary">Movement.</span>{" "}
          </h2>
          <div className="space-y-6 text-brand-light leading-relaxed">
            <p>
              Finding an apartment shouldn't feel like a second job. Our
              founders experienced the "agent fee" fatigue and the "fake
              listing" trap firsthand. We decided that the Nigerian rental
              market deserved an executive standard.
            </p>
            <p>
              Our journey began with a simple observation: the friction between
              ownership and tenancy often stems from a lack of transparency and
              high-touch service. We built a system that bridges this gap,
              treating every unit like a masterpiece and every request as an
              editorial priority.
            </p>
          </div>
        </div>

        <div className="relative group">
          <div className=" bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl max-w-lg ml-auto transform transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-3xl">
            <div className="relative aspect-4/3 ">
              {" "}
              <img
                src="/assets/apartment-2.jpg"
                alt="Modern Duplex"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 bg-brand-primary p-8 rounded-3xl text-white shadow-xl hidden lg:block">
            <p className="text-4xl font-black mb-1">98%</p>
            <p className="text-sm font-bold opacity-80 uppercase tracking-widest">
              Trust Rating
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-extrabold text-brand-dark">
              Our Values
            </h2>
            <div className="w-20 h-1.5 bg-brand-primary mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <ValueCard
              icon={<ShieldCheck className="text-brand-primary" size={32} />}
              title="Radical Transparency"
              desc="No hidden charges. No legal jargon. What you see is exactly what you get."
            />
            <ValueCard
              icon={<Target className="text-brand-primary" size={32} />}
              title="Precision Focused"
              desc="We verify everything—from the borehole water quality to the wiring safety."
            />
            <ValueCard
              icon={<Users className="text-brand-primary" size={32} />}
              title="Human Centric"
              desc="We use technology to serve people, not to replace the human touch of home-finding."
            />
          </div>
        </div>
      </section>

      <section className="py-24 px-8 text-center max-w-5xl mx-auto">
        <Heart
          className="text-brand-primary mx-auto mb-6"
          size={48}
          fill="currentColor"
        />
        <h2 className="text-4xl font-heading font-extrabold text-brand-dark mb-6">
          Impact over Profit.
        </h2>
        <p className="text-brand-light text-lg mb-12">
          We’re not just a software company; we’re a community partner. Lodgely
          invests 5% of all service fees into local neighborhood development
          projects and affordable housing initiatives.
        </p>
        <div className="flex justify-center gap-12">
          <div>
            <p className="text-3xl font-black text-brand-primary">15+</p>
            <p className="text-xs text-brand-light font-bold uppercase tracking-widest mt-1">
              Cities Covered
            </p>
          </div>
          <div className="w-px h-12 bg-slate-200"></div>
          <div>
            <p className="text-3xl font-black text-brand-dark">2.4k</p>
            <p className="text-xs text-brand-light font-bold uppercase tracking-widest mt-1">
              Happy Tenants
            </p>
          </div>
          <div className="w-px h-12 bg-slate-200"></div>
          <div>
            <p className="text-3xl font-black text-brand-secondary">0</p>
            <p className="text-xs text-brand-light font-bold uppercase tracking-widest mt-1">
              Fake Listings
            </p>
          </div>
        </div>
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
    </div>
  );
};

export default About;
