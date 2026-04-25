import type { ITestimonialProps } from "../interfaces";

const TestimonialCard = ({
  name,
  role,
  message,
  color,
  image,
}: ITestimonialProps) => {
  const styles =
    color === "pink"
      ? { line: "bg-brand-primary", quote: "text-brand-primary/70" }
      : { line: "bg-brand-secondary", quote: "text-brand-secondary/70" };

  return (
    <div className="relative pl-10">
      <div className={`absolute left-0 top-0 h-full w-0.5 ${styles.line}`} />
      <span
        className={`absolute -left-4 -top-2 text-5xl font-bold ${styles.quote}`}
      >
        “
      </span>

      <p className="text-gray-700 italic text-lg mb-6 line-clamp-4">
        {message}
      </p>

      <div className="flex items-center gap-4">
        <img
          src={image}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-xs uppercase tracking-widest text-gray-400">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
