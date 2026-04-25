import { Building } from "lucide-react";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-light/20 border-t border-surface-border pt-16 pb-8 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Building
              size={24}
              className="text-brand-primary"
              strokeWidth={3}
            />
            <span className="text-xl font-heading font-extrabold text-brand-dark">
              Lodgely.
            </span>
          </div>
          <p className="text-brand-dark/70 font-body text-sm leading-relaxed">
            Simplifying rent management for landlords and tenants across
            Nigeria.
          </p>
        </div>

        <div>
          <h4 className="font-heading font-bold text-brand-dark mb-4">
            Product
          </h4>
          <ul className="space-y-2 text-sm text-brand-dark/70 font-body">
            <li>
              <a
                href="#"
                className="hover:text-brand-primary transition-colors"
              >
                Find a Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-brand-primary transition-colors"
              >
                List Property
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-brand-primary transition-colors"
              >
                How it Works
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold text-brand-dark mb-4">
            Company
          </h4>
          <ul className="space-y-2 text-sm text-brand-dark/70 font-body">
            <li>
              <a
                href="#"
                className="hover:text-brand-primary transition-colors"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-brand-primary transition-colors"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-brand-primary transition-colors"
              >
                Contact Support
              </a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="font-heading font-bold text-brand-dark mb-4">
            Follow Us
          </h4>
          <div className="flex gap-4 text-brand-dark/70">
            <a href="#" className="hover:text-brand-primary transition-all">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-brand-primary transition-all">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-brand-primary transition-all">
              <FaGithub size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-surface-border flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-brand-dark/70 font-body">
          © {currentYear} Lodgely Inc. Built with ❤️ for final project.
        </p>
        <div className="flex gap-6 text-xs text-brand-light font-body">
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
