import { Route, Routes } from 'react-router'
import DashboardLayout from '../layouts/DashboardLayout'
import PublicLayout from '../layouts/PublicLayout'
import HomePage from '../pages/home/HomePage'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import NotFoundPage from '../pages/NotFoundPage'
import StudentDashboard from '../pages/student/StudentDashboard'
import TeacherDashboard from '../pages/teacher/TeacherDashboard'
import { GuestOnly, RequireRole } from './guards'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route element={<GuestOnly />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="registro" element={<RegisterPage />} />
        </Route>
      </Route>

      <Route element={<RequireRole role="teacher" />}>
        <Route path="profesor" element={<DashboardLayout />}>
          <Route index element={<TeacherDashboard />} />
        </Route>
      </Route>

      <Route element={<RequireRole role="student" />}>
        <Route path="estudiante" element={<DashboardLayout />}>
          <Route index element={<StudentDashboard />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
