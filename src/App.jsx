<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 82ea800619b4e5356edd52cd7b87dfce6dc254af
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <AppRoutes />
        </DataProvider>
<<<<<<< HEAD
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';

import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './pages/public/Home';
import About from './pages/public/About';
import Projects from './pages/public/Projects';
import Events from './pages/public/Events';
import Hackathons from './pages/public/Hackathons';
import Announcements from './pages/public/Announcements';
import Resources from './pages/public/Resources';
import Contact from './pages/public/Contact';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import Dashboard from './pages/admin/Dashboard';
import AdminMembers from './pages/admin/Members';
import AdminProjects from './pages/admin/Projects';
import AdminEvents from './pages/admin/Events';
import AdminHackathons from './pages/admin/Hackathons';
import AdminAnnouncements from './pages/admin/Announcements';
import AdminResources from './pages/admin/Resources';
import AdminReports from './pages/admin/Reports';
import MemberDashboard from './pages/member/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public website — the entry point for guests */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/events" element={<Events />} />
            <Route path="/hackathons" element={<Hackathons />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* MIS — the entry point for logged-in members/admins, role-gated */}
          <Route element={<ProtectedRoute roles={['admin', 'member', 'agent']} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/projects" element={<AdminProjects />} />
              <Route path="/admin/events" element={<AdminEvents />} />
              <Route path="/admin/hackathons" element={<AdminHackathons />} />
              <Route path="/admin/announcements" element={<AdminAnnouncements />} />
              <Route path="/admin/resources" element={<AdminResources />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute roles={['member', 'agent']} />}>
            <Route element={<AdminLayout />}>
              <Route path="/member/dashboard" element={<MemberDashboard />} />
            </Route>
          </Route>

          {/* Admin-only MIS routes */}
          <Route element={<ProtectedRoute roles={['admin']} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/members" element={<AdminMembers />} />
              <Route path="/admin/reports" element={<AdminReports />} />
            </Route>
          </Route>
        </Routes>
>>>>>>> bc97c92 (Initial commit)
=======
>>>>>>> 82ea800619b4e5356edd52cd7b87dfce6dc254af
      </AuthProvider>
    </BrowserRouter>
  );
}
<<<<<<< HEAD
<<<<<<< HEAD

export default App;
=======
>>>>>>> bc97c92 (Initial commit)
=======

export default App;
>>>>>>> 82ea800619b4e5356edd52cd7b87dfce6dc254af
