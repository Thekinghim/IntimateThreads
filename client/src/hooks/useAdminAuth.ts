import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

interface AdminUser {
  id: string;
  username: string;
  name: string;
}

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Kontrollera om vi har en giltig token
  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    const storedUser = localStorage.getItem('adminUser');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setAdminUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Verifiera token med servern
  const { data: verifiedUser, isLoading, error } = useQuery({
    queryKey: ['/api/admin/me'],
    enabled: !!token,
    retry: false,
    queryFn: async () => {
      const response = await fetch('/api/admin/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Unauthorized');
      }
      
      return response.json();
    },
  });

  // Uppdatera autentiseringsstatus baserat på server-verifiering
  useEffect(() => {
    if (error) {
      // Token är ogiltig, rensa localStorage
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      setIsAuthenticated(false);
      setAdminUser(null);
      setToken(null);
    } else if (verifiedUser) {
      setIsAuthenticated(true);
      setAdminUser(verifiedUser);
    }
  }, [verifiedUser, error]);

  const logout = async () => {
    const storedToken = localStorage.getItem('adminToken');
    
    if (storedToken) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${storedToken}`,
          },
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    
    // Rensa lokal state och localStorage
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setIsAuthenticated(false);
    setAdminUser(null);
    setToken(null);
    
    // Omdirigera till login-sidan
    window.location.href = '/admin/login';
  };

  const getAuthHeader = (): Record<string, string> => {
    const storedToken = localStorage.getItem('adminToken');
    return storedToken ? { 'Authorization': `Bearer ${storedToken}` } : {};
  };

  return {
    isAuthenticated,
    isLoading,
    adminUser,
    logout,
    getAuthHeader,
  };
}