<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 82ea800619b4e5356edd52cd7b87dfce6dc254af
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, role: user?.role || 'guest' }}>
      {children}
    </AuthContext.Provider>
  );
};

<<<<<<< HEAD
export const useAuth = () => useContext(AuthContext);
=======
import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

function readDemoUsers() {
  try {
    return JSON.parse(localStorage.getItem('ccms_demo_users') || '[]');
  } catch {
    return [];
  }
}

function writeDemoUsers(users) {
  localStorage.setItem('ccms_demo_users', JSON.stringify(users));
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function createSessionUser(user) {
  const safeUser = {
    id: user.id || user.email,
    name: user.name || 'Code Club Member',
    email: normalizeEmail(user.email),
    role: user.role || 'member',
  };

  localStorage.setItem('ccms_token', `demo-token-${safeUser.email}`);
  localStorage.setItem('ccms_user', JSON.stringify(safeUser));
  return safeUser;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ccms_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('ccms_token');
    if (!token) {
      setLoading(false);
      return;
    }

    if (token.startsWith('demo-token-')) {
      setUser(JSON.parse(localStorage.getItem('ccms_user') || 'null'));
      setLoading(false);
      return;
    }

    api.get('/auth/me')
      .then(({ data }) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const normalizedEmail = normalizeEmail(email);

    try {
      const { data } = await api.post('/auth/login', { email: normalizedEmail, password });
      localStorage.setItem('ccms_token', data.token);
      localStorage.setItem('ccms_user', JSON.stringify(data.user));
      setUser(data.user);
      return data.user;
    } catch {
      const demoUsers = readDemoUsers();
      const foundUser = demoUsers.find(
        (entry) => normalizeEmail(entry.email) === normalizedEmail && entry.password === password,
      );

      if (!foundUser) {
        throw error;
      }

      const safeUser = createSessionUser({
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role || 'member',
      });
      setUser(safeUser);
      return safeUser;
    }
  }

  async function register(name, email, password, requestedRole = 'member') {
    const cleanedName = String(name || '').trim();
    const normalizedEmail = normalizeEmail(email);
    const role = ['admin', 'agent', 'member'].includes(requestedRole) ? requestedRole : 'member';

    if (!cleanedName || !normalizedEmail || !password) {
      throw new Error('Please complete all registration fields.');
    }

    const demoUsers = readDemoUsers();
    const adminAlreadyRegistered = localStorage.getItem('ccms_admin_registered') === 'true'
      || demoUsers.some((entry) => entry.role === 'admin');
    if (role === 'admin' && adminAlreadyRegistered) {
      throw new Error('The one-time admin account has already been registered.');
    }

    try {
      const { data } = await api.post('/auth/register', { name: cleanedName, email: normalizedEmail, password, role });
      if (data.user?.role === 'admin') localStorage.setItem('ccms_admin_registered', 'true');
      localStorage.setItem('ccms_token', data.token);
      localStorage.setItem('ccms_user', JSON.stringify(data.user));
      setUser(data.user);
      return data.user;
    } catch (error) {
      const exists = demoUsers.some((entry) => normalizeEmail(entry.email) === normalizedEmail);

      if (exists) {
        throw new Error('An account with this email already exists. Please log in instead.');
      }

      const id = globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : String(Date.now());
      const user = {
        id,
        name: cleanedName,
        email: normalizedEmail,
        password,
        role,
      };

      writeDemoUsers([...demoUsers, user]);
      if (role === 'admin') localStorage.setItem('ccms_admin_registered', 'true');
      const safeUser = createSessionUser({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
      setUser(safeUser);
      return safeUser;
    }
  }

  function logout() {
    localStorage.removeItem('ccms_token');
    localStorage.removeItem('ccms_user');
    setUser(null);
  }

  function updateUser(updates) {
    setUser((current) => {
      const nextUser = { ...current, ...updates };
      localStorage.setItem('ccms_user', JSON.stringify(nextUser));
      return nextUser;
    });
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
>>>>>>> bc97c92 (Initial commit)
=======
export const useAuth = () => useContext(AuthContext);
>>>>>>> 82ea800619b4e5356edd52cd7b87dfce6dc254af
