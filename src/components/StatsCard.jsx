function StatsCard({ title, value, icon: Icon, colorClass }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-5">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}>
        <Icon size={22} className="text-white" />
      </div>
      <div>
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-slate-800 mt-0.5">{value}</p>
      </div>
    </div>
  );
}

export default StatsCard;
