import type { SideBarProps } from "../interfaces";

const SidebarItem = ({ icon, label, active = false, badge = "" }: SideBarProps) => (
  <button
    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${active ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/30" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span className="font-bold text-sm tracking-wide">{label}</span>
    </div>
    {badge && (
      <span className="bg-white/20 text-xs px-2 py-1 rounded-md">{badge}</span>
    )}
  </button>
);

export default SidebarItem;
