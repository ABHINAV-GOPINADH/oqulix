import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import CustomerTable from '../components/CustomerTable';
import Modal from '../components/Modal';
import CustomerForm from '../components/CustomerForm';
import ConfirmDialog from '../components/ConfirmDialog';

function Customers({
  filteredCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [deletingCustomer, setDeletingCustomer] = useState(null);

  function openAddModal() {
    setEditingCustomer(null);
    setModalOpen(true);
  }

  function openEditModal(customer) {
    setEditingCustomer(customer);
    setModalOpen(true);
  }

  function handleFormSubmit(formData) {
    if (editingCustomer) {
      updateCustomer(editingCustomer.id, formData);
    } else {
      addCustomer(formData);
    }
    setModalOpen(false);
    setEditingCustomer(null);
  }

  function handleDeleteConfirm() {
    if (deletingCustomer) {
      deleteCustomer(deletingCustomer.id);
      setDeletingCustomer(null);
    }
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Customers</h1>
          <p className="text-sm text-slate-500 mt-1">
            {filteredCustomers.length} customer{filteredCustomers.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <UserPlus size={16} />
          Add Customer
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <FilterBar value={statusFilter} onChange={setStatusFilter} />
      </div>

      {/* Table */}
      <CustomerTable
        customers={filteredCustomers}
        onEdit={openEditModal}
        onDelete={setDeletingCustomer}
      />

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingCustomer(null); }}
        title={editingCustomer ? 'Edit Customer' : 'Add New Customer'}
      >
        <CustomerForm
          initialData={editingCustomer}
          onSubmit={handleFormSubmit}
          onCancel={() => { setModalOpen(false); setEditingCustomer(null); }}
          submitLabel={editingCustomer ? 'Save Changes' : 'Add Customer'}
        />
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingCustomer}
        customerName={deletingCustomer?.name}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingCustomer(null)}
      />
    </div>
  );
}

export default Customers;
