import { Users, UserCheck, UserX, CalendarPlus } from 'lucide-react';
import StatsCard from '../components/StatsCard';

function Dashboard({ customers }) {
  const total = customers.length;
  const active = customers.filter((c) => c.status === 'Active').length;
  const inactive = customers.filter((c) => c.status === 'Inactive').length;

  const thisMonth = (() => {
    const now = new Date();
    return customers.filter((c) => {
      const d = new Date(c.dateAdded);
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    }).length;
  })();

  const recent = [...customers]
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
    .slice(0, 5);

  const stats = [
    { title: 'Total Customers', value: total, icon: Users, colorClass: 'bg-indigo-500' },
    { title: 'Active', value: active, icon: UserCheck, colorClass: 'bg-green-500' },
    { title: 'Inactive', value: inactive, icon: UserX, colorClass: 'bg-red-500' },
    { title: 'Added This Month', value: thisMonth, icon: CalendarPlus, colorClass: 'bg-purple-500' },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((s) => (
          <StatsCard key={s.title} {...s} />
        ))}
      </div>

      {/* Recent customers */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-800">Recently Added Customers</h2>
          <p className="text-xs text-slate-400 mt-0.5">Last 5 customers added</p>
        </div>
        <ul className="divide-y divide-slate-100">
          {recent.map((c) => (
            <li key={c.id} className="flex items-center gap-4 px-6 py-4">
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                <span className="text-sm font-semibold text-indigo-600">
                  {c.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">{c.name}</p>
                <p className="text-xs text-slate-500 truncate">{c.email} · {c.company}</p>
              </div>
              <div className="shrink-0 flex flex-col items-end gap-1">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    c.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {c.status}
                </span>
                <span className="text-xs text-slate-400">{c.dateAdded}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
