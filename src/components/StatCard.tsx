import React from "react";

const StatCard = ({
  title,
  value,
  icon,
  trend,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}) => (
  <div className="bg-white p-6 rounded-4xl shadow-sm border border-slate-100 flex flex-col justify-between">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-slate-50 rounded-2xl">{icon}</div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
        {trend}
      </span>
    </div>
    <div>
      <p className="text-brand-light text-sm font-medium">{title}</p>
      <p className="text-2xl font-black text-brand-dark">{value}</p>
    </div>
  </div>
);

export default StatCard;
