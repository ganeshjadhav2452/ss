import React, { useEffect } from 'react'
import Dashboard from './pages/Dashboard'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Auth from './pages/admin/Auth'
import AdminPrivateRoutes from './router/AdminPrivateRoutes'
import { Toaster } from 'react-hot-toast'
import ManageStaff from './components/admin/profileComponents/ManageStaff'
import Slidebar from './components/Slidebar'
import NavBar from './components/NavBar'
import Credential from './components/admin/profileComponents/Credential'
import Settings from './components/admin/profileComponents/Settings'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from './store/slices/authSlice'
import ApiPlans from './pages/admin/plans/ApiPlans'
import ManualPlans from './pages/admin/plans/ManualPlans'
import Companies from './pages/admin/Companies'
import Affiliates from './pages/admin/Affiliates'
import CompanyDetails from './pages/CompanyDetails'
import EditStaff from './components/admin/profileComponents/EditStaff'

const App = () => {
  const token = localStorage.getItem('adminToken')
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/admin') {
      if (token || user.token) {
        navigate('/admin/dashboard')
      } else {
        navigate('/admin/login')
      }
    }
  }, [location, navigate, token, user.token])

  return (
    <div className='container-scroller'>
      <Toaster />
      <Routes>
        {/* common routes  */}
        <Route path='/admin/login' element={<Auth />} />
        {/* admin private routes  */}
        <Route path='/admin' element={<AdminPrivateRoutes />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='manage-staff' element={<ManageStaff />} />
          <Route path='edit_staff/:staffId' element={<EditStaff />} />
          <Route path='credentials' element={<Credential />} />
          <Route path='settings' element={<Settings />} />
          <Route path='api-plans' element={<ApiPlans />} />
          <Route path='manual-plans' element={<ManualPlans />} />
          <Route path='companies' element={<Companies />} />
          <Route path='/admin/companies/:companyId' element={<CompanyDetails />} />
          <Route path='affiliates' element={<Affiliates />} />
        </Route>
      </Routes>
    </div >
  )
}

export default App;
