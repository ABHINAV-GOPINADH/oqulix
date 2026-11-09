import { Search } from 'lucide-react';

function SearchBar({ value, onChange, placeholder = 'Search customers…' }) {
  return (
    <div className="relative flex-1">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
      />
    </div>
  );
}

export default SearchBar;
