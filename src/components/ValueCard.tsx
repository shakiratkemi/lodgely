import React from "react";

const ValueCard = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div className="bg-white p-10 rounded-4xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
    <div className="mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-brand-dark mb-4">{title}</h3>
    <p className="text-brand-light text-sm leading-relaxed">{desc}</p>
  </div>
);

export default ValueCard;
