"use client";

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  token: string | null;
  userNickname: string | null;
  isLoggedIn: boolean;
  logout: () => void;
  setAuthInfo: (token: string, nickname: string) => void; // 로그인 성공 시 호출
}

const initialContext: AuthContextType = {
  token: null,
  userNickname: null,
  isLoggedIn: false,
  logout: () => {},
  setAuthInfo: () => {},
};

export const AuthContext = createContext<AuthContextType>(initialContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userNickname, setUserNickname] = useState<string | null>(null);
  const router = useRouter();

  // 로그아웃
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('nickname');
    setToken(null);
    setUserNickname(null);
    router.push('/');
  }, [router]);

  // 로그인 정보 저장 (OAuth 페이지에서 사용)
  const setAuthInfo = useCallback((newToken: string, newNickname: string) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('nickname', newNickname);
    setToken(newToken);
    setUserNickname(newNickname);
  }, []);

  // 새로고침 시 상태 복구
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedNickname = localStorage.getItem('nickname');
    if (storedToken) setToken(storedToken);
    if (storedNickname) setUserNickname(storedNickname);
  }, []);

  const value = {
    token,
    userNickname,
    isLoggedIn: !!token,
    logout,
    setAuthInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};