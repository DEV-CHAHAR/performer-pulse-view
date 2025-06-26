
import React from 'react';
import Layout from '@/components/Layout';
import { EmployeeCard } from '@/components/EmployeeCard';
import { useEmployees } from '@/hooks/useEmployees';
import { useBookmarks } from '@/hooks/useBookmarks';
import { BookmarkIcon } from 'lucide-react';

const Bookmarks = () => {
  const { employees, loading } = useEmployees();
  const { bookmarks } = useBookmarks();
  
  const bookmarkedEmployees = employees.filter(employee => 
    bookmarks.includes(employee.id)
  );

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-slate-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-slate-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <BookmarkIcon className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Bookmarked Employees</h1>
            <p className="text-slate-600">Your saved employee profiles ({bookmarkedEmployees.length})</p>
          </div>
        </div>

        {bookmarkedEmployees.length === 0 ? (
          <div className="text-center py-12">
            <BookmarkIcon className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-900 mb-2">No bookmarks yet</h3>
            <p className="text-slate-500">Start bookmarking employees to keep track of important profiles.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedEmployees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Bookmarks;
