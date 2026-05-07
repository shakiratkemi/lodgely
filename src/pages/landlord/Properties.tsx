import { useEffect, useState } from "react";
import {
  deleteProperty,
  getMyProperties,
} from "../../services/landlord.service";
import {
  Plus,
  Building2,
  MapPin,
  Tag,
  ExternalLink,
  MoreVertical,
  Edit,
  Eye,
  Trash2,
} from "lucide-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CreatePropertyModal } from "../../components";
import { useNavigate } from "react-router";

const LandlordProperties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  useEffect(() => {
    const closeMenu = () => setMenuOpenId(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
    setMenuOpenId(null);
  };

  const fetchProperties = async () => {
    try {
      const res = await getMyProperties();
      setProperties(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <AiOutlineLoading3Quarters className="animate-spin text-brand-secondary w-8 h-8" />
      </div>
    );
  const formatCurrency = (num: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(num);

  const handleDelete = async (id: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this property? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      setLoading(true);
      await deleteProperty(id);
      alert("Property deleted successfully.");
      fetchProperties();
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message ||
        "Failed to delete property. It might be occupied.";
      alert(errorMsg);
    } finally {
      setLoading(false);
      setMenuOpenId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-brand-dark">My Properties</h1>
          <p className="text-slate-500 text-sm">
            Manage and track your listed executive homes.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-primary text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-brand-primary/30 transition-all"
        >
          <Plus size={20} />
          Add New Property
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-visible shadow-sm">
        {loading ? (
          <div className="p-20 flex justify-center items-center">
            <AiOutlineLoading3Quarters className="animate-spin text-brand-primary w-8 h-8" />
          </div>
        ) : properties.length === 0 ? (
          <div className="p-20 text-center flex flex-col items-center">
            <Building2 size={48} className="text-slate-200 mb-4" />
            <p className="text-slate-500 font-medium">
              No properties listed yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto overflow-visible">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Property Details
                  </th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Location
                  </th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Rent Amount
                  </th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {properties.map((property: any) => (
                  <tr
                    key={property.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                          {property.primaryImageUrl ? (
                            <img
                              src={property.primaryImageUrl}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Building2 className="w-full h-full p-3 text-slate-300" />
                          )}
                        </div>
                        <span className="font-bold text-brand-dark truncate max-w-50 inline-block">
                          {property.title}
                        </span>
                      </div>
                    </td>
                    <td className="p-5 text-sm text-slate-600 font-medium">
                      {property.location}
                    </td>
                    <td className="p-5 font-bold text-brand-dark">
                      {formatCurrency(property.rentAmount)}
                    </td>
                    <td className="p-5">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${
                          property.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {property.status}
                      </span>
                    </td>
                    <td className="p-5 text-right relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuOpenId(
                            menuOpenId === property.id ? null : property.id,
                          );
                        }}
                        className="p-2 text-slate-400 hover:text-brand-primary hover:bg-brand-primary/5 rounded-lg transition-all"
                      >
                        <MoreVertical size={20} />
                      </button>

                      {menuOpenId === property.id && (
                        <div className="absolute right-10 top-12 w-44 bg-brand-white border border-slate-100 rounded-2xl shadow-xl z-100 py-2 animate-in fade-in zoom-in duration-200">
                          <button
                            onClick={() =>
                              navigate(`/landlord/properties/${property.id}`)
                            }
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-primary transition-colors"
                          >
                            <Eye size={16} /> View Details
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProperty(property);
                              setIsModalOpen(true);
                              setMenuOpenId(null);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-primary transition-colors"
                          >
                            <Edit size={16} /> Edit Property
                          </button>

                          <div className="border-t border-slate-50 my-1"></div>

                          <button
                            onClick={() => handleDelete(property.id)}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={16} /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <CreatePropertyModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={fetchProperties}
        initialData={selectedProperty}
      />
    </div>
  );
};

export default LandlordProperties;
