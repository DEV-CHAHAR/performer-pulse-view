
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Employee } from '@/hooks/useEmployees';

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

interface BookmarkState {
  bookmarks: number[];
  addBookmark: (employeeId: number) => void;
  removeBookmark: (employeeId: number) => void;
  isBookmarked: (employeeId: number) => boolean;
}

interface SearchState {
  searchTerm: string;
  departmentFilter: string;
  ratingFilter: string;
  setSearchTerm: (term: string) => void;
  setDepartmentFilter: (department: string) => void;
  setRatingFilter: (rating: string) => void;
}

interface EmployeeState {
  employees: Employee[];
  setEmployees: (employees: Employee[]) => void;
  addEmployee: (employee: Employee) => void;
}

type Store = UIState & BookmarkState & SearchState & EmployeeState;

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      // UI State
      sidebarOpen: true,
      theme: 'light',
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setTheme: (theme) => set({ theme }),

      // Bookmark State
      bookmarks: [],
      addBookmark: (employeeId) => 
        set((state) => ({ 
          bookmarks: [...state.bookmarks, employeeId] 
        })),
      removeBookmark: (employeeId) => 
        set((state) => ({ 
          bookmarks: state.bookmarks.filter(id => id !== employeeId) 
        })),
      isBookmarked: (employeeId) => get().bookmarks.includes(employeeId),

      // Search State
      searchTerm: '',
      departmentFilter: 'All',
      ratingFilter: 'All',
      setSearchTerm: (term) => set({ searchTerm: term }),
      setDepartmentFilter: (department) => set({ departmentFilter: department }),
      setRatingFilter: (rating) => set({ ratingFilter: rating }),

      // Employee State
      employees: [],
      setEmployees: (employees) => set({ employees }),
      addEmployee: (employee) => 
        set((state) => ({ 
          employees: [...state.employees, employee] 
        })),
    }),
    {
      name: 'hr-dashboard-storage',
      partialize: (state) => ({
        bookmarks: state.bookmarks,
        theme: state.theme,
        searchTerm: state.searchTerm,
        departmentFilter: state.departmentFilter,
        ratingFilter: state.ratingFilter,
      }),
    }
  )
);
