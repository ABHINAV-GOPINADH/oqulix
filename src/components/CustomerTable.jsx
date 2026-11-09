import { Pencil, Trash2 } from 'lucide-react';

function StatusBadge({ status }) {
  const isActive = status === 'Active';
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          isActive ? 'bg-green-500' : 'bg-red-400'
        }`}
      />
      {status}
    </span>
  );
}

function CustomerTable({ customers, onEdit, onDelete }) {
  if (customers.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm flex flex-col items-center justify-center py-20 text-slate-400">
        <p className="text-lg font-medium">No customers found</p>
        <p className="text-sm mt-1">Try adjusting your search or filter.</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {['Name', 'Email', 'Phone', 'Company', 'Status', 'Date Added', 'Actions'].map(
                (h) => (
                  <th
                    key={h}
                    className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4 font-medium text-slate-800">{c.name}</td>
                <td className="px-5 py-4 text-slate-600">{c.email}</td>
                <td className="px-5 py-4 text-slate-600">{c.phone}</td>
                <td className="px-5 py-4 text-slate-600">{c.company}</td>
                <td className="px-5 py-4">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-5 py-4 text-slate-500">{c.dateAdded}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(c)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => onDelete(c)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {customers.map((c) => (
          <div key={c.id} className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-slate-800">{c.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{c.company}</p>
              </div>
              <StatusBadge status={c.status} />
            </div>
            <p className="text-sm text-slate-600">{c.email}</p>
            <p className="text-sm text-slate-600">{c.phone}</p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
              <span className="text-xs text-slate-400">{c.dateAdded}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(c)}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  <Pencil size={12} /> Edit
                </button>
                <button
                  onClick={() => onDelete(c)}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CustomerTable;
