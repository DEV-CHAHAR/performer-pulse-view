
import React from 'react';
import Layout from '@/components/Layout';
import { AddEmployeeForm } from '@/components/AddEmployeeForm';

const AddEmployee = () => {
  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Add New Employee</h1>
          <p className="text-slate-600">Fill in the details to add a new employee to the system</p>
        </div>
        
        <AddEmployeeForm />
      </div>
    </Layout>
  );
};

export default AddEmployee;
