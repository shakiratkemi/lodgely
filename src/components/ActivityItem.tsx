
const ActivityItem = ({
  user,
  action,
  target,
  time,
  status,
}: {
  user: string;
  action: string;
  target: string;
  time: string;
  status: string;
}) => (
  <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100">
    <div className="flex items-center gap-4">
      <div className="h-10 w-10 bg-slate-200 rounded-full overflow-hidden flex items-center justify-center font-bold text-slate-500">
        {user[0]}
      </div>
      <div>
        <p className="text-sm font-bold text-brand-dark">
          {user} <span className="font-normal text-brand-light">{action}</span>{" "}
          {target}
        </p>
        <p className="text-xs text-slate-400">{time}</p>
      </div>
    </div>
    <span
      className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${status === "New" ? "bg-blue-100 text-blue-600" : status === "Paid" ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-600"}`}
    >
      {status}
    </span>
  </div>
);

export default ActivityItem;
