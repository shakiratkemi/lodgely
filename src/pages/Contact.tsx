import { ContactForm } from "../components";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { FaInstagram, FaTwitter } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white font-body">
      <section className="relative h-112.5 flex items-center justify-center text-center px-8 bg-[url('/assets/duplex.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-brand-dark/75 z-0">
          <img
            src="/assets/apartment-2.jpg"
            alt="Modern Duplex"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />{" "}
        </div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-brand-primary mb-6">
            Get in Touch
          </h1>
          <div className="w-4xl bg-brand-dark/20 glass-effect p-12 rounded-4xl border border-white/20 shadow-2xl ">
            <p className="text-lg md:text-xl text-[#f9dada] font-bold leading-relaxed ">
              Whether you're looking for your dream home or listing a premium
              property, our executive team is ready to assist you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 -mt-32 relative z-20">
          <div className="bg-white p-8 rounded-4xl shadow-xl border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-primary group-hover:text-white transition-colors">
              <Phone
                size={24}
                className="text-brand-primary group-hover:text-white"
              />
            </div>
            <h3 className="text-lg font-bold text-brand-dark mb-2">Phone</h3>
            <p className="text-brand-light font-medium">+234 800 123 4567</p>
          </div>

          <div className="bg-white p-8 rounded-4xl shadow-xl border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-primary group-hover:text-white transition-colors">
              <Mail
                size={24}
                className="text-brand-primary group-hover:text-white"
              />
            </div>
            <h3 className="text-lg font-bold text-brand-dark mb-2">Email</h3>
            <p className="text-brand-light font-medium">hello@lodgely.com</p>
          </div>

          <div className="bg-white p-8 rounded-4xl shadow-xl border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-primary group-hover:text-white transition-colors">
              <MapPin
                size={24}
                className="text-brand-primary group-hover:text-white"
              />
            </div>
            <h3 className="text-lg font-bold text-brand-dark mb-2">Address</h3>
            <p className="text-brand-light font-medium">Lekki Phase 1, Lagos</p>
          </div>

          <div className="bg-white p-8 rounded-4xl shadow-xl border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-primary group-hover:text-white transition-colors">
              <Clock
                size={24}
                className="text-brand-primary group-hover:text-white"
              />
            </div>
            <h3 className="text-lg font-bold text-brand-dark mb-2">
              Office Hours
            </h3>
            <p className="text-brand-light font-medium">Mon - Fri: 9AM - 6PM</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-slate-50">
        <ContactForm />
      </section>

      <section className="px-8 py-24 max-w-7xl mx-auto">
        <div className="rounded-[3.5rem] overflow-hidden shadow-2xl border-12 border-white ring-1 ring-slate-200">
          <iframe
            title="Lodgely HQ Map"
            className="w-full h-125 grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126846.50117062425!2d3.3512133!3d6.5243793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a3da578873!2sLagos!5e0!3m2!1sen!2sng!4v1647424000000!5m2!1sen!2sng"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>

      <section className="py-24 px-8 text-center bg-brand-dark text-white">
        <h2 className="text-4xl font-heading font-extrabold mb-12">
          Connect With Us
        </h2>
        <div className="flex justify-center gap-6 flex-wrap">
          <a
            href="#"
            className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-brand-primary hover:border-brand-primary transition-all duration-300 group"
          >
            <FaInstagram
              size={20}
              className="text-white/70 group-hover:text-white"
            />
            <span className="font-bold tracking-wide">Instagram</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-brand-primary hover:border-brand-primary transition-all duration-300 group"
          >
            <FaTwitter
              size={20}
              className="text-white/70 group-hover:text-white"
            />
            <span className="font-bold tracking-wide">X (Twitter)</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-brand-primary hover:border-brand-primary transition-all duration-300 group"
          >
            <MessageCircle
              size={20}
              className="text-white/70 group-hover:text-white"
            />
            <span className="font-bold tracking-wide">WhatsApp</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;
