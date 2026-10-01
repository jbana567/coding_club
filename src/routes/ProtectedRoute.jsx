import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 82ea800619b4e5356edd52cd7b87dfce6dc254af
export const ProtectedRoute = ({ allowedRoles }) => {
  const { user, role } = useAuth();

  if (!user && allowedRoles.length > 0) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
<<<<<<< HEAD
};
=======
// Wrap admin (or role-restricted) routes with this.
// Usage: <Route element={<ProtectedRoute roles={['admin']} />}>...</Route>
export default function ProtectedRoute({ roles }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center text-text-dim">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;

  return <Outlet />;
}
>>>>>>> bc97c92 (Initial commit)
=======
};
>>>>>>> 82ea800619b4e5356edd52cd7b87dfce6dc254af
