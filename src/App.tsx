import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';

const LoginPage = lazy(() => import('./pages/auth/login'));
const StudentSignupPage = lazy(() => import('./pages/auth/studentSignup'));
const InstitutionSignupPage = lazy(() => import('./pages/auth/institutionSignup'));
const StudentDashboard = lazy(() => import('./pages/dashboard/students/home.students'));
const ProfilePage = lazy(() => import('./pages/dashboard/profile'));

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/profile' element={<ProfilePage />} />

        {/* Institution routes */}
        <Route path="/institution">
          <Route path="signup" element={<InstitutionSignupPage />} />
          <Route path="dashboard" element={<></>}>

          </Route>
          
        </Route>

        {/* Student routes*/}
        <Route path="/student">
          <Route path='' element={<StudentDashboard />} />
          <Route path="signup" element={<StudentSignupPage />} />
          <Route path="dashboard" element={<></>}>

          </Route>

        </Route>

        
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Suspense>
  )
}

export default App
