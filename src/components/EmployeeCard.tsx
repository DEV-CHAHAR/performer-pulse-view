
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, BookmarkIcon, Eye, TrendingUp } from 'lucide-react';
import { Employee } from '@/hooks/useEmployees';
import { useBookmarks } from '@/hooks/useBookmarks';
import { Link } from 'react-router-dom';

interface EmployeeCardProps {
  employee: Employee;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const bookmarked = isBookmarked(employee.id);

  const handleBookmark = () => {
    if (bookmarked) {
      removeBookmark(employee.id);
    } else {
      addBookmark(employee.id);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
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

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-blue-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={employee.image}
              alt={`${employee.firstName} ${employee.lastName}`}
              className="h-12 w-12 rounded-full object-cover border-2 border-slate-200"
            />
            <div>
              <h3 className="font-semibold text-slate-900">
                {employee.firstName} {employee.lastName}
              </h3>
              <p className="text-sm text-slate-600">{employee.email}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className={`transition-colors ${
              bookmarked ? 'text-blue-600 hover:text-blue-700' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <BookmarkIcon className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-slate-100 text-slate-700">
              {employee.department}
            </Badge>
            <span className="text-sm text-slate-600">Age: {employee.age}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-700">Performance:</span>
            <div className="flex items-center gap-1">
              {renderStars(employee.rating)}
            </div>
            <Badge className={`ml-2 ${getRatingColor(employee.rating)}`}>
              {employee.rating}/5
            </Badge>
          </div>

          <div className="flex gap-2 pt-2">
            <Button asChild size="sm" variant="outline" className="flex-1">
              <Link to={`/employee/${employee.id}`}>
                <Eye className="h-4 w-4 mr-1" />
                View
              </Link>
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              Promote
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
