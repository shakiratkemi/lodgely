import React from "react";

const Button = ({ children, variant = "primary", ...props }) => {
  const styles = {
    primary: "bg-brand-primary text-white hover:bg-rose-600",
    secondary:
      "bg-white border border-surface-border text-brand-dark hover:bg-gray-50",
    outline:
      "border-2 border-brand-primary text-brand-primary hover:bg-rose-50",
  };
  return (
    <button
      className={`${styles[variant]} px-6 py-3 rounded-2xl font-bold transition-all active:scale-95`}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
