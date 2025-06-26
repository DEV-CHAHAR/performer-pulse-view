
import React, { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { FeedbackForm } from '@/components/FeedbackForm';
import { LoadingPage } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorBoundary';
import { useEmployees } from '@/hooks/useEmployees';
import { useStore } from '@/store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Star, 
  BookmarkIcon,
  Calendar,
  TrendingUp,
  MessageSquare
} from 'lucide-react';

const EmployeeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { employees, loading, error } = useEmployees();
  const { isBookmarked, addBookmark, removeBookmark } = useStore();

  const employee = useMemo(() => {
    return employees.find(emp => emp.id === parseInt(id || '0'));
  }, [employees, id]);

  const bookmarked = employee ? isBookmarked(employee.id) : false;

  const handleBookmarkToggle = () => {
    if (!employee) return;
    
    if (bookmarked) {
      removeBookmark(employee.id);
    } else {
      addBookmark(employee.id);
    }
  };

  const mockProjects = [
    { name: 'Dashboard Redesign', status: 'In Progress', completion: 75 },
    { name: 'API Migration', status: 'Completed', completion: 100 },
    { name: 'Mobile App', status: 'Planning', completion: 25 },
  ];

  const mockFeedbacks = [
    { 
      date: '2024-01-15', 
      type: 'positive', 
      message: 'Excellent work on the recent project delivery. Great attention to detail.',
      author: 'Sarah Johnson'
    },
    { 
      date: '2024-01-02', 
      type: 'constructive', 
      message: 'Could improve communication during team meetings. Consider being more proactive.',
      author: 'Michael Chen'
    },
  ];

  if (loading) {
    return (
      <Layout>
        <LoadingPage text="Loading employee details..." />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="p-6">
          <ErrorMessage 
            title="Failed to load employee details"
            message={error}
          />
        </div>
      </Layout>
    );
  }

  if (!employee) {
    return <Navigate to="/404" replace />;
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-6">
            <img
              src={employee.image}
              alt={`${employee.firstName} ${employee.lastName}`}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {employee.firstName} {employee.lastName}
              </h1>
              <p className="text-slate-600 text-lg">{employee.company?.title || 'Employee'}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary" className="text-sm">
                  {employee.department}
                </Badge>
                <div className="flex items-center space-x-1">
                  {renderStars(employee.rating)}
                  <span className="text-sm text-slate-600 ml-1">({employee.rating}/5)</span>
                </div>
              </div>
            </div>
          </div>
          
          <Button
            variant={bookmarked ? "default" : "outline"}
            onClick={handleBookmarkToggle}
            className="flex items-center space-x-2"
          >
            <BookmarkIcon className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
            <span>{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Contact Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <span className="text-sm">{employee.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-slate-500" />
                    <span className="text-sm">{employee.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span className="text-sm">
                      {employee.address.address}, {employee.address.city}, {employee.address.state}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Building className="h-4 w-4 text-slate-500" />
                    <span className="text-sm">{employee.department}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-slate-500" />
                    <span className="text-sm">Age: {employee.age}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Performance Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Overall Rating</span>
                    <div className="flex items-center space-x-1">
                      {renderStars(employee.rating)}
                      <span className="text-sm text-slate-600 ml-2">{employee.rating}/5</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Performance Level</span>
                    <Badge variant={employee.rating >= 4 ? "default" : employee.rating >= 3 ? "secondary" : "destructive"}>
                      {employee.rating >= 4 ? 'High Performer' : employee.rating >= 3 ? 'Good' : 'Needs Improvement'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProjects.map((project, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{project.name}</h3>
                          <p className="text-sm text-slate-600">{project.status}</p>
                        </div>
                        <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'}>
                          {project.completion}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Feedback */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5" />
                    <span>Recent Feedback</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockFeedbacks.map((feedback, index) => (
                    <div key={index} className="border-l-4 border-gray-200 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant={feedback.type === 'positive' ? 'default' : 'secondary'}>
                          {feedback.type}
                        </Badge>
                        <span className="text-xs text-slate-500">{feedback.date}</span>
                      </div>
                      <p className="text-sm text-slate-700 mb-1">{feedback.message}</p>
                      <p className="text-xs text-slate-500">— {feedback.author}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Add Feedback */}
              <FeedbackForm 
                employeeId={employee.id} 
                employeeName={`${employee.firstName} ${employee.lastName}`}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default EmployeeDetail;
