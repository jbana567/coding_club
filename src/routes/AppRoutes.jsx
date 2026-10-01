import { Routes, Route } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout.jsx';
import Login from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx';

import Home from '../pages/public/Home.jsx';
import Projects from '../pages/public/Projects.jsx';
import Events from '../pages/public/Events.jsx';
import Hackathons from '../pages/public/Hackathons.jsx';

import MemberDashboard from '../pages/member/MemberDashboard.jsx';
import AdminDashboard from '../pages/admin/AdminDashboard.jsx';
import ManageProjects from '../pages/admin/ManageProjects.jsx';
import ManageEvents from '../pages/admin/ManageEvents.jsx';
import ManageAnnouncements from '../pages/admin/ManageAnnouncements.jsx';
import ManageRegistrations from '../pages/admin/ManageRegistrations.jsx'; // 1. Import component

import { ProtectedRoute } from './ProtectedRoute.jsx';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/events" element={<Events />} />
        <Route path="/hackathons" element={<Hackathons />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Member Routes */}
        <Route element={<ProtectedRoute allowedRoles={['member', 'admin']} />}>
          <Route path="/dashboard" element={<MemberDashboard />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/projects" element={<ManageProjects />} />
          <Route path="/admin/events" element={<ManageEvents />} />
          <Route path="/admin/announcements" element={<ManageAnnouncements />} />
          <Route path="/admin/registrations" element={<ManageRegistrations />} /> {/* 2. Add Route */}
        </Route>
      </Route>

      <Route path="*" element={<h2>404 - Page Not Found</h2>} />
    </Routes>
  );
};