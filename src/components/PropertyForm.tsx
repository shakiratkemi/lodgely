import React, { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import { addNewProperty, updateProperty } from "../services/landlord.service";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: any;
}

const CreatePropertyModal = ({
  isOpen,
  onClose,
  onSuccess,
  initialData,
}: Props) => {
  const isEditMode = !!initialData;
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    address: "",
    rentAmount: "",
    propertyType: "0",
  });

  useEffect(() => {
    if (initialData && isOpen) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        location: initialData.location || "",
        address: initialData.address || "",
        rentAmount: initialData.rentAmount || 0,
        propertyType: initialData.propertyType || 0,
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const cleanRent = form.rentAmount.replace(/,/g, "").replace(/\./g, "");
    const rentAsNumber = Number(cleanRent);

    if (isNaN(rentAsNumber) || rentAsNumber <= 0) {
      alert("Please enter a valid rent amount.");
      setLoading(false);
      return;
    }

    try {
      if (isEditMode) {
        const updateData = {
          title: form.title,
          description: form.description,
          location: form.location,
          address: form.address,
          rentAmount: rentAsNumber,
          propertyType: Number(form.propertyType),
        };
        await updateProperty(initialData.id, updateData);
        alert("Property updated successfully!");
      } else {
        const formData = new FormData();
        formData.append("Title", form.title);
        formData.append("Description", form.description);
        formData.append("Location", form.location);
        formData.append("Address", form.address);
        formData.append("RentAmount", rentAsNumber.toString());
        formData.append("PropertyType", form.propertyType);

        images.forEach((file) => {
          formData.append("Images", file);
        });
        await addNewProperty(formData);
        alert("Property created successfully!");
      }
      onSuccess();
      onClose();
    } catch (err) {
      alert(
        isEditMode
          ? "Failed to update property."
          : "Failed to create property.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-bold text-brand-dark">
            {isEditMode ? "Edit Property" : "Add New Property"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-brand-dark"
          >
            <X size={24} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 max-h-[70vh] overflow-y-auto"
        >
          <div>
            <label className="block text-sm font-bold mb-1">Title</label>
            <input
              required
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border bg-slate-50 outline-none focus:border-brand-primary"
              placeholder="Executive 2 Bedroom Flat"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">
                Rent Amount (₦)
              </label>
              <input
                required
                name="rentAmount"
                value={form.rentAmount}
                type="number"
                onChange={handleChange}
                className="w-full p-3 rounded-xl border bg-slate-50 outline-none focus:border-brand-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">
                Property Type
              </label>
              <select
                name="propertyType"
                value={form.propertyType}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border bg-slate-50 outline-none focus:border-brand-primary"
              >
                <option value="0">House</option>
                <option value="1">Apartment</option>
                <option value="2">Shop</option>
                <option value="3">Land</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">
              Location (City)
            </label>
            <input
              required
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border bg-slate-50 outline-none focus:border-brand-primary"
              placeholder="Lekki, Lagos"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Full Address</label>
            <input
              required
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border bg-slate-50 outline-none focus:border-brand-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 rounded-xl border bg-slate-50 outline-none focus:border-brand-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Images</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-dark text-white py-4 rounded-xl font-bold hover:bg-brand-primary transition-all disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Save Property"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePropertyModal;
