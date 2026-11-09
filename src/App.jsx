import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import useCustomers from './hooks/useCustomers';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const {
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredCustomers,
  } = useCustomers();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main content */}
      <div className="flex-1 min-w-0 pt-14 lg:pt-0 overflow-auto">
        {currentPage === 'dashboard' && (
          <Dashboard customers={customers} />
        )}
        {currentPage === 'customers' && (
          <Customers
            filteredCustomers={filteredCustomers}
            addCustomer={addCustomer}
            updateCustomer={updateCustomer}
            deleteCustomer={deleteCustomer}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        )}
      </div>
    </div>
  );
}

export default App;
