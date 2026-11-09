function FilterBar({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white cursor-pointer"
    >
      <option value="All">All Statuses</option>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </select>
  );
}

export default FilterBar;
