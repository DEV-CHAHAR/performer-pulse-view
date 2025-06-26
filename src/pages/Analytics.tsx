
import React from 'react';
import Layout from '@/components/Layout';
import { useEmployees } from '@/hooks/useEmployees';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Award } from 'lucide-react';

const Analytics = () => {
  const { employees, loading } = useEmployees();

  const analytics = React.useMemo(() => {
    if (employees.length === 0) return null;

    // Department-wise analytics
    const departmentStats = employees.reduce((acc, emp) => {
      if (!acc[emp.department]) {
        acc[emp.department] = { count: 0, totalRating: 0, employees: [] };
      }
      acc[emp.department].count++;
      acc[emp.department].totalRating += emp.rating;
      acc[emp.department].employees.push(emp);
      return acc;
    }, {} as Record<string, { count: number; totalRating: number; employees: any[] }>);

    const departmentData = Object.entries(departmentStats).map(([dept, stats]) => ({
      department: dept,
      count: stats.count,
      avgRating: (stats.totalRating / stats.count).toFixed(1),
      employees: stats.employees,
    }));

    // Rating distribution
    const ratingDistribution = [1, 2, 3, 4, 5].map(rating => ({
      rating,
      count: employees.filter(emp => emp.rating === rating).length,
    }));

    // Top performers
    const topPerformers = employees
      .filter(emp => emp.rating >= 4)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);

    return {
      departmentData,
      ratingDistribution,
      topPerformers,
      totalEmployees: employees.length,
      avgRating: (employees.reduce((sum, emp) => sum + emp.rating, 0) / employees.length).toFixed(1),
    };
  }, [employees]);

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-slate-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 bg-slate-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!analytics) {
    return (
      <Layout>
        <div className="p-6">
          <div className="text-center py-12">
            <p className="text-slate-500">No data available for analytics</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Analytics Dashboard</h1>
            <p className="text-slate-600">Performance insights and team analytics</p>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Employees</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{analytics.totalEmployees}</div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Average Rating</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{analytics.avgRating}/5</div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">High Performers</CardTitle>
              <Award className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{analytics.topPerformers.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department Analytics */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg">Department Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.departmentData.map((dept) => (
                  <div key={dept.department} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-700">{dept.department}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-600">{dept.count} employees</span>
                        <span className="font-medium text-slate-900">{dept.avgRating}/5</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        style={{ width: `${(parseFloat(dept.avgRating) / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rating Distribution */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg">Rating Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.ratingDistribution.map((rating) => (
                  <div key={rating.rating} className="flex items-center gap-4">
                    <div className="flex items-center gap-1 w-16">
                      <span className="text-sm font-medium">{rating.rating}</span>
                      <span className="text-sm text-slate-600">stars</span>
                    </div>
                    <div className="flex-1">
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${
                            rating.rating >= 4 ? 'bg-green-500' :
                            rating.rating >= 3 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${(rating.count / analytics.totalEmployees) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm text-slate-600 w-12">{rating.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card className="border-slate-200 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Top Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analytics.topPerformers.map((employee, index) => (
                  <div key={employee.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold rounded-full">
                      #{index + 1}
                    </div>
                    <img
                      src={employee.image}
                      alt={`${employee.firstName} ${employee.lastName}`}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">
                        {employee.firstName} {employee.lastName}
                      </p>
                      <p className="text-sm text-slate-600">{employee.department}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900">{employee.rating}/5</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
