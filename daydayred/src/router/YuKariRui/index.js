import User from '@/components/tth-User/User'
import Login from '@/components/Login'
import Logon from '@/components/Logon'
import About from '@/components/tth-User/About'
import Download from '@/components/tth-User/Download'
import UserRecharge from '@/components/tth-User/UserRecharge'
import UserRecord from '@/components/tth-User/UserRecord'
import UserChase from '@/components/tth-User/UserChase'
import UserRedPacket from '@/components/tth-User/UserRedPacket'
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
    path: '/userRecharge',
    name: 'UserRecharge',
    component: UserRecharge
  },
  {
    path: '/userRecord',
    name: 'UserRecord',
    component: UserRecord
  },
  {
    path: '/userChase',
    name: 'UserChase',
    component: UserChase
  },
  {
    path: '/userRedPacket',
    name: '/UserRedPacket',
    component: UserRedPacket
  }
]
