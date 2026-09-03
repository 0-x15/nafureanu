import React, { createContext, useState, useContext, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

const AuthContext = createContext();

/**
 * Platform-managed auth shell. The public corporate website is fully
 * static: this provider keeps the required app-shell contract but
 * performs no authentication bootstrap — children render immediately.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Static public site — no auth bootstrap runs.
    void base44;
  }, [base44]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingAuth,
        isLoadingPublicSettings,
        authError,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};