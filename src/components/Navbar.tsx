import { Building } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-brand-dark w-full border-b border-white/10">
      <div className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="text-brand-primary bg-white/10 p-2 rounded-xl group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
            <Building size={28} strokeWidth={3} absoluteStrokeWidth />
          </div>
          <span className="text-2xl font-heading font-extrabold text-white tracking-tight">
            Lodgely<span className="text-brand-primary">.</span>
          </span>
        </div>

        <div className="hidden md:flex space-x-8 font-body font-medium text-white/80">
          <Link to="/" className="hover:text-brand-primary transition-colors">
            Home
          </Link>
          <Link
            to="./about"
            className="hover:text-brand-primary transition-colors"
          >
            About
          </Link>
          <Link
            to="./contact"
            className="hover:text-brand-primary transition-colors"
          >
            Contact
          </Link>
          <Link
            to="./properties"
            className="hover:text-brand-primary transition-colors"
          >
            Properties
          </Link>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 font-body font-bold text-white/80 hover:text-brand-primary transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-brand-primary text-white px-6 py-2 rounded-full font-body font-bold hover:shadow-lg hover:bg-rose-600 transition-all"
          >
            Join Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
