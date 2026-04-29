const ValueCard = ({ title, value }: { title: string; value?: number }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value ?? 0}</h2>
    </div>
  );
};

export default ValueCard;
