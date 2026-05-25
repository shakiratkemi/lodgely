import { Building, Menu, X } from "lucide-react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="bg-brand-dark w-full border-b border-white/10">
      <div className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => {
            navigate("/");
            setIsOpen(false);
          }}
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

        <div className=" hidden md:flex gap-4">
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

        <div className="md:hidden flex items-center z-20">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-brand-primary transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden absolute top-0 right-0 w-100 bg-brand-dark border-b border-white/10 transition-all duration-300 ease-in-out z-10 ${
          isOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-2 invisible"
        }`}
      >
        <div className="flex flex-col px-8 pt-4 pb-6 space-y-4 font-body font-medium text-white/80">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="hover:text-brand-primary transition-colors py-2"
          >
            Home
          </Link>
          <Link
            to="./about"
            onClick={() => setIsOpen(false)}
            className="hover:text-brand-primary transition-colors py-2"
          >
            About
          </Link>
          <Link
            to="./contact"
            onClick={() => setIsOpen(false)}
            className="hover:text-brand-primary transition-colors py-2"
          >
            Contact
          </Link>
          <Link
            to="./properties"
            onClick={() => setIsOpen(false)}
            className="hover:text-brand-primary transition-colors py-2"
          >
            Properties
          </Link>

          <div className="border-t border-white/10 my-2"></div>
          <div className="flex flex-col gap-4 pt-2">
            <button
              onClick={() => {
                navigate("/login");
                setIsOpen(false);
              }}
              className="w-full text-left py-2 font-bold text-white/80 hover:text-brand-primary transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => {
                navigate("/signup");
                setIsOpen(false);
              }}
              className="bg-brand-primary p-2 text-left text-white w-max rounded-full font-bold hover:bg-rose-600 transition-all "
            >
              Join Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
