import { useState } from "react";
import { createUser, loginUser } from "../services/auth.service";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router";

const AuthPage = ({ type }: { type: "login" | "signup" }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    setForm((prevValue) => ({ ...prevValue, [name]: value }));
    console.log(form);
  };

  const handleAuth = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (type === "signup") {
        if (!form.email || !form.password || !form.role) {
          setError("Fill all required fields");
          return;
        }

        if (!form.confirmPassword) {
          setError("Confirm your password");
          return;
        }

        if (form.password !== form.confirmPassword) {
          setError("Passwords do not match");
          return;
        }

        await createUser({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
          phoneNumber: form.phoneNumber,
          role: form.role,
        });

        setSuccess("Account created successfully 🎉");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        const data = await loginUser({
          email: form.email,
          password: form.password,
        });

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setSuccess("Login successful 🎉");
        setTimeout(() => {
          if (data?.user?.role) {
            handleRoles(data.user.role);
          } else {
            navigate("/dashboard");
          }
        }, 1000);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleRoles = (role: string) => {
    const normalizedRole = role.toLowerCase();
    switch (normalizedRole) {
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "landlord":
        navigate("/landlord/dashboard");
        break;
      case "tenant":
        navigate("/tenant");
        break;
      default:
        navigate("/dashboard");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAuth();
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 font-body">
      <div className="hidden lg:flex relative bg-brand-dark items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl -ml-10 -mb-10"></div>

        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-heading font-black text-white mb-6">
            LODGELY<span className="text-brand-primary">.</span>
          </h2>
          <blockquote className="text-2xl text-white/90 font-medium leading-relaxed italic mb-8">
            "The simplest way to find a verified, executive home in Nigeria's
            top cities."
          </blockquote>

          <div className="flex items-center gap-4 text-white/60">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i: number) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-brand-dark bg-slate-300"
                ></div>
              ))}
            </div>
            <p className="text-sm font-bold">Join 10k+ verified tenants</p>
          </div>
        </div>

        <img
          src="/assets/apartment-2.jpg"
          alt="Modern Architecture"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
        />
      </div>

      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-heading font-extrabold text-brand-dark">
              {type === "login" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-brand-light mt-2">
              {type === "login"
                ? "Continue your journey in luxury property management."
                : "Join the executive rental community today."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="text-green-600 text-sm font-medium bg-green-50 p-3 rounded-lg">
                {success}
              </div>
            )}
            {type === "signup" && (
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <label className="block text-sm font-bold text-brand-dark mb-2">
                    First Name
                  </label>
                  <input
                    required
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-dark mb-2">
                    Last Name
                  </label>
                  <input
                    required
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-brand-dark mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all outline-none"
                />
              </div>
            </div>

            {type === "signup" && (
              <div>
                <label className="block text-sm font-bold text-brand-dark mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    placeholder="+23401234567"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all outline-none"
                  />
                </div>
              </div>
            )}

            {type === "signup" && (
              <div>
                <label className="block text-sm font-bold text-brand-dark mb-2">
                  Select Role
                </label>

                <select
                  required
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 
               focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 
               transition-all outline-none"
                >
                  <option value="" disabled>
                    Select role
                  </option>
                  <option value="tenant">Tenant</option>
                  <option value="landlord">Landlord</option>
                </select>
              </div>
            )}

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-brand-dark">
                  Password
                </label>
                {type === "login" && (
                  <Link
                    to="#"
                    className="text-xs font-bold text-brand-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-dark"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {type === "signup" && (
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-bold text-brand-dark">
                    Confirm Password
                  </label>
                </div>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-dark"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-dark text-white py-4 rounded-xl font-bold 
  hover:bg-brand-primary hover:shadow-xl hover:shadow-brand-primary/20 
  transition-all flex items-center justify-center gap-2 group mt-8 
  disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                "Processing..."
              ) : (
                <>
                  {type === "login" ? "Sign In" : "Create Account"}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-brand-light font-medium">
            {type === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <Link
              to={type === "login" ? "/signup" : "/login"}
              className="text-brand-primary font-black hover:underline"
            >
              {type === "login" ? "Sign up for free" : "Log in here"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
