import React from "react";
const ValueCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value?: number;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      {icon && <div className="mb-6 text-brand-primary">{icon}</div>}
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value ?? 0}</h2>
    </div>
  );
};

export default ValueCard;
