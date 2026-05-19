import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import {
  Share2,
  Heart,
  MapPin,
  Bed,
  Bath,
  Maximize,
  ShieldCheck,
  Wind,
  CheckCircle,
  Star,
  ArrowLeft,
  Send,
  Loader2,
} from "lucide-react";
import {
  getPropertyDetails,
  submitLeaseRequest,
} from "../services/tenant.service";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestMsg, setRequestMsg] = useState(
    "I am interested in renting this property.",
  );
  const [submitting, setSubmitting] = useState(false);

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(num);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await getPropertyDetails(id);
        const propertyData = response.data || response;

        console.log("Fetched Property Data:", propertyData);
        setProperty(propertyData);
      } catch (err) {
        console.error("Error fetching property", err);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleRequestSubmit = async () => {
    setSubmitting(true);
    try {
      await submitLeaseRequest({
        propertyId: id!,
        message: requestMsg,
      });
      alert("Application sent successfully!");
      setIsModalOpen(false);
      navigate("/tenant/requests");
    } catch (err) {
      alert(
        "Failed to send request. You may already have a pending application.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-primary" size={40} />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold text-brand-dark">
          Property not found
        </h1>
        <Link
          to="/tenant/properties"
          className="text-brand-primary font-bold hover:underline"
        >
          Return to Browse
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-body pb-20">
      <section className="max-w-7xl mx-auto px-8 pt-10 pb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-brand-dark mb-6 font-bold transition-colors"
        >
          <ArrowLeft size={20} /> Back to Browse
        </button>

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
                (Verified)
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

        {/* Gallery Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-125">
          <div className="md:col-span-2 h-full rounded-[2.5rem] overflow-hidden group">
            <img
              src={property.primaryImageUrl || "https://placehold.co/800x600"}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Main"
            />
          </div>
          {/* Secondary images (Placeholder if API only returns one) */}
          <div className="hidden md:grid grid-rows-2 gap-4 h-full">
            <div className="rounded-4xl overflow-hidden bg-slate-100">
              <img
                src={property.primaryImageUrl}
                className="w-full h-full object-cover opacity-50"
                alt="Interior"
              />
            </div>
            <div className="rounded-4xl overflow-hidden bg-slate-100">
              <img
                src={property.primaryImageUrl}
                className="w-full h-full object-cover grayscale"
                alt="Detail"
              />
            </div>
          </div>
          <div className="hidden md:block rounded-[2.5rem] overflow-hidden relative">
            <img
              src={property.primaryImageUrl}
              className="w-full h-full object-cover blur-sm"
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
          {/* Specs Bar */}
          <div className="flex justify-between p-8 bg-slate-50 rounded-4xl border border-slate-100">
            <div className="flex flex-col items-center gap-2">
              <Bed className="text-brand-primary" />
              <span className="text-sm font-bold text-brand-dark">
                3 Bedrooms
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Bath className="text-brand-primary" />
              <span className="text-sm font-bold text-brand-dark">
                2 Bathrooms
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Maximize className="text-brand-primary" />
              <span className="text-sm font-bold text-brand-dark">
                1,200 SqFt
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CheckCircle className="text-brand-primary" />
              <span className="text-sm font-bold text-brand-dark">
                {property.propertyType}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-heading font-black text-brand-dark mb-4">
              About this Home
            </h3>
            <p className="text-brand-light leading-relaxed text-lg italic">
              {property.description}
            </p>
          </div>

          {/* Amenities */}
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

        {/* Pricing Card */}
        <div className="relative">
          <div className="sticky top-28 bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-3xl font-black text-brand-dark">
                  {formatCurrency(property.rentAmount)}
                </span>
                <span className="text-brand-light font-bold"> / year</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <label className="text-[10px] uppercase font-black text-slate-400 block mb-1">
                  Status
                </label>
                <div className="text-brand-dark font-bold">
                  Ready for Move-in
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-brand-dark text-white py-5 rounded-2xl font-black text-lg hover:bg-brand-primary hover:shadow-xl transition-all duration-300"
            >
              Apply for Lease
            </button>
          </div>
        </div>
      </section>

      {/* Lease Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-brand-dark/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 space-y-6 shadow-2xl">
            <h3 className="text-xl font-black text-brand-dark">
              Submit Application
            </h3>
            <p className="text-slate-500 text-sm">
              Send a brief message to the landlord regarding your interest.
            </p>

            <textarea
              className="w-full p-4 bg-slate-50 border-none rounded-2xl h-32 text-sm focus:ring-2 ring-brand-primary/20 outline-none"
              value={requestMsg}
              onChange={(e) => setRequestMsg(e.target.value)}
            />

            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestSubmit}
                disabled={submitting}
                className="flex-1 py-3 bg-brand-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={18} /> Send Request
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
