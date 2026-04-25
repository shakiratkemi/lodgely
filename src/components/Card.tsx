
import type { ICard } from "../interfaces";

const Card = ({ icon, title, desc, className = "" }: ICard) => {
  return (
    <div
      className={`bg-white p-8 rounded-3xl shadow-sm border border-surface-border hover:shadow-md transition-all ${className}`}
    >
      {icon && <div className="mb-6 text-brand-primary">{icon}</div>}
      <h3 className="text-xl font-heading font-bold mb-3 text-brand-dark">
        {title}
      </h3>
      <p className="text-brand-light font-body leading-relaxed">{desc}</p>
    </div>
  );
};

export default Card;
