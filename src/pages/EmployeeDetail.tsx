
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useEmployees } from '@/hooks/useEmployees';
import { useBookmarks } from '@/hooks/useBookmarks';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Star, BookmarkIcon, MapPin, Phone, Mail, TrendingUp } from 'lucide-react';

const EmployeeDetail = () => {
  const { id } = useParams();
  const { employees, loading } = useEmployees();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  
  const employee = employees.find(emp => emp.id.toString() === id);
  const bookmarked = employee ? isBookmarked(employee.id) : false;

  const handleBookmark = () => {
    if (employee) {
      if (bookmarked) {
        removeBookmark(employee.id);
      } else {
        addBookmark(employee.id);
      }
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'bg-green-100 text-green-800';
    if (rating >= 3) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  // Mock data for tabs
  const mockProjects = [
    { name: 'Website Redesign', status: 'In Progress', completion: 75 },
    { name: 'Mobile App', status: 'Completed', completion: 100 },
    { name: 'Dashboard Analytics', status: 'Planning', completion: 25 },
  ];

  const mockFeedback = [
    { date: '2024-01-15', author: 'Sarah Johnson', comment: 'Excellent work on the quarterly report. Very thorough analysis.' },
    { date: '2024-01-10', author: 'Mike Chen', comment: 'Great collaboration skills during the team project.' },
    { date: '2023-12-20', author: 'Emily Davis', comment: 'Shows strong leadership potential and technical expertise.' },
  ];

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-slate-200 rounded w-1/4"></div>
            <div className="h-64 bg-slate-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!employee) {
    return (
      <Layout>
        <div className="p-6">
          <div className="text-center py-12">
            <p className="text-slate-500">Employee not found</p>
            <Link to="/" className="text-blue-600 hover:underline mt-2 block">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        {/* Employee Header */}
        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={employee.image}
                alt={`${employee.firstName} ${employee.lastName}`}
                className="h-24 w-24 rounded-full object-cover border-4 border-slate-200 mx-auto md:mx-0"
              />
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                      {employee.firstName} {employee.lastName}
                    </h1>
                    <p className="text-lg text-slate-600 mb-4">{employee.email}</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleBookmark}
                    className={`${bookmarked ? 'bg-blue-50 border-blue-300' : ''}`}
                  >
                    <BookmarkIcon className={`h-4 w-4 mr-2 ${bookmarked ? 'fill-current text-blue-600' : ''}`} />
                    {bookmarked ? 'Bookmarked' : 'Bookmark'}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                      {employee.department}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <span className="text-sm text-slate-600">Age: {employee.age}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <div className="flex items-center gap-1">
                      {renderStars(employee.rating)}
                    </div>
                    <Badge className={`${getRatingColor(employee.rating)}`}>
                      {employee.rating}/5
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <Mail className="h-4 w-4" />
                    <span>{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <Phone className="h-4 w-4" />
                    <span>{employee.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <MapPin className="h-4 w-4" />
                    <span>{employee.address.city}, {employee.address.state}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-slate-600">Address</label>
                    <p className="text-slate-900">{employee.address.address}</p>
                    <p className="text-slate-900">{employee.address.city}, {employee.address.state}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Phone</label>
                    <p className="text-slate-900">{employee.phone}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg">Performance History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Q4 2023</span>
                    <div className="flex items-center gap-1">
                      {renderStars(employee.rating)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Q3 2023</span>
                    <div className="flex items-center gap-1">
                      {renderStars(Math.max(1, employee.rating - 1))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Q2 2023</span>
                    <div className="flex items-center gap-1">
                      {renderStars(Math.max(1, employee.rating - 2))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid gap-4">
              {mockProjects.map((project, index) => (
                <Card key={index} className="border-slate-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-slate-900">{project.name}</h3>
                      <Badge 
                        variant={project.status === 'Completed' ? 'default' : 'secondary'}
                        className={
                          project.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : project.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${project.completion}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{project.completion}% Complete</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <div className="space-y-4">
              {mockFeedback.map((feedback, index) => (
                <Card key={index} className="border-slate-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-slate-900">{feedback.author}</span>
                      <span className="text-sm text-slate-600">{feedback.date}</span>
                    </div>
                    <p className="text-slate-700">{feedback.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <TrendingUp className="h-4 w-4 mr-2" />
            Promote Employee
          </Button>
          <Button variant="outline">
            Assign to Project
          </Button>
          <Button variant="outline">
            Schedule Review
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeDetail;
