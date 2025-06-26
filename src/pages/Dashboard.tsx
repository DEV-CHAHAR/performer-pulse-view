
import React, { useState, useMemo, useEffect } from 'react';
import Layout from '@/components/Layout';
import { EmployeeCard } from '@/components/EmployeeCard';
import { SearchAndFilter } from '@/components/SearchAndFilter';
import { LoadingSpinner, LoadingCard, ErrorMessage } from '@/components/LoadingSpinner';
import { useEmployees } from '@/hooks/useEmployees';
import { useStore } from '@/store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Star, BookmarkIcon } from 'lucide-react';

const Dashboard = () => {
  const { employees, loading, error } = useEmployees();
  const { 
    bookmarks, 
    searchTerm, 
    departmentFilter, 
    ratingFilter,
    setSearchTerm,
    setDepartmentFilter,
    setRatingFilter,
    setEmployees 
  } = useStore();

  // Update store when employees are loaded
  useEffect(() => {
    if (employees.length > 0) {
      setEmployees(employees);
    }
  }, [employees, setEmployees]);

  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesSearch = 
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment = departmentFilter === 'All' || employee.department === departmentFilter;
      const matchesRating = ratingFilter === 'All' || employee.rating.toString() === ratingFilter;

      return matchesSearch && matchesDepartment && matchesRating;
    });
  }, [employees, searchTerm, departmentFilter, ratingFilter]);

  const stats = useMemo(() => {
    const avgRating = employees.length > 0 
      ? (employees.reduce((sum, emp) => sum + emp.rating, 0) / employees.length).toFixed(1)
      : '0';
    
    const highPerformers = employees.filter(emp => emp.rating >= 4).length;
    
    return {
      totalEmployees: employees.length,
      avgRating,
      highPerformers,
      bookmarked: bookmarks.length,
    };
  }, [employees, bookmarks]);

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="space-y-6">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-1/3"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-slate-200 rounded animate-pulse"></div>
              ))}
            </div>
            
            <div className="h-20 bg-slate-200 rounded animate-pulse"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <LoadingCard key={i} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="p-6">
          <ErrorMessage 
            title="Failed to load employees"
            message={error}
            onRetry={() => window.location.reload()}
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">HR Dashboard</h1>
          <p className="text-slate-600">Manage your team performance and insights</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-slate-200 hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Employees</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.totalEmployees}</div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.avgRating}/5</div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">High Performers</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.highPerformers}</div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Bookmarked</CardTitle>
              <BookmarkIcon className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.bookmarked}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <SearchAndFilter
          onSearchChange={setSearchTerm}
          onDepartmentFilter={setDepartmentFilter}
          onRatingFilter={setRatingFilter}
          searchTerm={searchTerm}
          departmentFilter={departmentFilter}
          ratingFilter={ratingFilter}
        />

        {/* Employee Cards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-900">
              Employees ({filteredEmployees.length})
            </h2>
          </div>
          
          {filteredEmployees.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-slate-900 mb-2">No employees found</h3>
              <p className="text-slate-500">No employees match your current search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployees.map((employee) => (
                <EmployeeCard key={employee.id} employee={employee} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
