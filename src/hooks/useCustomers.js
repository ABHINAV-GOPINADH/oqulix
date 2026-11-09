import { useState, useMemo } from 'react';
import useLocalStorage from './useLocalStorage';
import { mockCustomers } from '../utils/mockData';

function useCustomers() {
  const [customers, setCustomers] = useLocalStorage('oquilix_customers', mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.company.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus =
        statusFilter === 'All' || c.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [customers, searchTerm, statusFilter]);

  function addCustomer(data) {
    const newCustomer = {
      ...data,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString().split('T')[0],
    };
    setCustomers((prev) => [newCustomer, ...prev]);
  }

  function updateCustomer(id, data) {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...data } : c))
    );
  }

  function deleteCustomer(id) {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  }

  return {
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredCustomers,
  };
}

export default useCustomers;
