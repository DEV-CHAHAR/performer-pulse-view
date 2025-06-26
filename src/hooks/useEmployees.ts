
import { useState, useEffect } from 'react';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  rating: number;
  phone: string;
  address: {
    address: string;
    city: string;
    state: string;
  };
  image: string;
  company?: {
    department: string;
    title: string;
  };
}

const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Design'];

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users?limit=20');
        const data = await response.json();
        
        const processedEmployees: Employee[] = data.users.map((user: any) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          age: user.age,
          department: departments[Math.floor(Math.random() * departments.length)],
          rating: Math.floor(Math.random() * 5) + 1,
          phone: user.phone,
          address: user.address,
          image: user.image,
          company: user.company,
        }));
        
        setEmployees(processedEmployees);
      } catch (err) {
        setError('Failed to fetch employees');
        console.error('Error fetching employees:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return { employees, loading, error };
};
