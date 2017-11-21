import User from '@/components/tth-User/User'
import Login from '@/components/Login'
import Logon from '@/components/Logon'
import About from '@/components/tth-User/About'
import Download from '@/components/tth-User/Download'
import Recharge from '@/components/tth-User/Recharge'
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
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/download',
    name: 'Download',
    component: Download
  },
  {
    path: '/recharge',
    name: 'Recharge',
    component: Recharge
  }
]
