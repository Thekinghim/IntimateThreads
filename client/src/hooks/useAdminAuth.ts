import { useState, useEffect } from "react";

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Kontrollera om vi har en giltig token vid start
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('adminToken');
      const storedUser = localStorage.getItem('adminUser');
      
      if (storedToken && storedUser) {
        try {
          // Verifiera token med servern
          const response = await fetch('/api/admin/me', {
            headers: {
              'Authorization': `Bearer ${storedToken}`,
            },
          });
          
          if (response.ok) {
            const user = await response.json();
            setAdminUser(user);
            setIsAuthenticated(true);
          } else {
            // Token är ogiltig, rensa localStorage
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            setIsAuthenticated(false);
            setAdminUser(null);
          }
        } catch (error) {
          // Något gick fel, rensa localStorage
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          setIsAuthenticated(false);
          setAdminUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setAdminUser(null);
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

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