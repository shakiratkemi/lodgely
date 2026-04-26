import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    id: 1,
    name: "Adewale Johnson",
    role: "Property Portfolio Manager",
    message:
      "The platform transformed how I handle my properties in Lekki. Everything is organized, and rent collection is finally stress-free.",
    color: "pink",
    image: "/assets/headshot2.jpg",
  },
  {
    id: 2,
    name: "Blessing Eze",
    role: "Premium Resident",
    message:
      "As a tenant, I love the automated reminders. No more forgotten due dates or physical receipts.",
    color: "blue",
    image: "/assets/headshot3.jpg",
  },
  {
    id: 3,
    name: "David Martins",
    role: "Real Estate Investor",
    message:
      "Tracking my portfolio across multiple estates is now seamless and accurate.",
    color: "pink",
    image: "/assets/headshot1.jpg",
  },
];

const Testimonial = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Voice of Excellence
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="hover:-translate-y-1 transition-transform duration-300"
            >
              <TestimonialCard {...t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
