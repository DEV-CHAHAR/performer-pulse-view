
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, X } from 'lucide-react';

interface SearchAndFilterProps {
  onSearchChange: (search: string) => void;
  onDepartmentFilter: (department: string) => void;
  onRatingFilter: (rating: string) => void;
  searchTerm: string;
  departmentFilter: string;
  ratingFilter: string;
}

const departments = ['All', 'Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Design'];
const ratings = ['All', '5', '4', '3', '2', '1'];

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  onSearchChange,
  onDepartmentFilter,
  onRatingFilter,
  searchTerm,
  departmentFilter,
  ratingFilter,
}) => {
  const hasActiveFilters = departmentFilter !== 'All' || ratingFilter !== 'All';

  const clearFilters = () => {
    onDepartmentFilter('All');
    onRatingFilter('All');
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by name, email, or department..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-slate-50 border-slate-200 focus:bg-white"
          />
        </div>

        <div className="flex gap-3">
          <Select value={departmentFilter} onValueChange={onDepartmentFilter}>
            <SelectTrigger className="w-40 bg-slate-50 border-slate-200">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Department" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={ratingFilter} onValueChange={onRatingFilter}>
            <SelectTrigger className="w-32 bg-slate-50 border-slate-200">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              {ratings.map((rating) => (
                <SelectItem key={rating} value={rating}>
                  {rating === 'All' ? 'All Ratings' : `${rating} Stars`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="whitespace-nowrap"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
