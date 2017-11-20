import User from '@/components/tth-User/User'
import Login from '@/components/Login'
import Logon from '@/components/logon'
export default [
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logon',
    name: 'Logon',
    component: Logon
  }
]
