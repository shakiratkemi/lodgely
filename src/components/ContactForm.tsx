import React, { useState } from "react";
import { Send, User, Mail, MessageSquare } from "lucide-react";

const ContactForm: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors = { name: "", email: "", message: "" };
    let valid = true;

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }
    if (!form.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", form);
      alert("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <section className="py-20 px-8 bg-slate-50 min-h-screen flex flex-col items-center">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-heading font-extrabold text-brand-dark mb-4">
          Contact Us
        </h2>
        <p className="text-brand-light max-w-md mx-auto">
          Have questions about a property? Our team is here to help you find
          your next home.
        </p>
      </div>

      <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-100">
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
         
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-sm font-bold text-brand-dark mb-2 flex items-center gap-2"
            >
              <User size={16} className="text-brand-primary" /> Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Shakirat Adeyemi"
              value={form.name}
              onChange={handleChange}
              className={`w-full p-4 rounded-xl border ${errors.name ? "border-brand-primary" : "border-slate-200"} bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all`}
            />
            {errors.name && (
              <span className="text-brand-primary text-xs mt-2 font-bold animate-in fade-in slide-in-from-top-1">
                {errors.name}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-bold text-brand-dark mb-2 flex items-center gap-2"
            >
              <Mail size={16} className="text-brand-primary" /> Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@lodgely.com"
              value={form.email}
              onChange={handleChange}
              className={`w-full p-4 rounded-xl border ${errors.email ? "border-brand-primary" : "border-slate-200"} bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all`}
            />
            {errors.email && (
              <span className="text-brand-primary text-xs mt-2 font-bold animate-in fade-in slide-in-from-top-1">
                {errors.email}
              </span>
            )}
          </div>


          <div className="flex flex-col">
            <label
              htmlFor="message"
              className="text-sm font-bold text-brand-dark mb-2 flex items-center gap-2"
            >
              <MessageSquare size={16} className="text-brand-primary" /> Your
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={5}
              placeholder="Tell us what you're looking for..."
              value={form.message}
              onChange={handleChange}
              className={`w-full p-4 rounded-xl border ${errors.message ? "border-brand-primary" : "border-slate-200"} bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none`}
            />
            {errors.message && (
              <span className="text-brand-primary text-xs mt-2 font-bold animate-in fade-in slide-in-from-top-1">
                {errors.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              className="bg-brand-dark text-white px-12 py-4 rounded-full font-bold hover:bg-brand-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group"
            >
              Send Message
              <Send
                size={18}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
