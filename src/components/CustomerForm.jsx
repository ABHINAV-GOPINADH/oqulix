import { useState, useEffect } from 'react';
import { validateCustomer } from '../utils/validators';

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  status: 'Active',
};

function CustomerForm({ initialData, onSubmit, onCancel, submitLabel = 'Save Customer' }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        company: initialData.company || '',
        status: initialData.status || 'Active',
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [initialData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateCustomer(form);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(form);
  }

  const fields = [
    { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Jane Doe' },
    { label: 'Email Address', name: 'email', type: 'email', placeholder: 'jane@example.com' },
    { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '4155551234' },
    { label: 'Company Name', name: 'company', type: 'text', placeholder: 'Acme Corp' },
  ];

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-4">
        {fields.map(({ label, name, type, placeholder }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {label} <span className="text-red-500">*</span>
            </label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className={`w-full px-3.5 py-2.5 border rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${
                errors[name] ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'
              }`}
            />
            {errors[name] && (
              <p className="mt-1 text-xs text-red-500">{errors[name]}</p>
            )}
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default CustomerForm;
