import Home from '@/components/tth-home/Home'
import Activities from '@/components/tth-home/Activities'
import CrazyFree from '@/components/tth-home/CrazyFree'
import Invitation from '@/components/tth-home/Invitation'
import Recharge from '@/components/tth-home/Recharge'
export default [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/activities',
    name: 'Activities',
    component: Activities
  },
  {
    path: '/crazyFree',
    name: 'CrazyFree',
    component: CrazyFree
  },
  {
    path: '/invitation',
    name: 'Invitation',
    component: Invitation
  },
  {
    path: '/recharge',
    name: 'Recharge',
    component: Recharge
  }
]
