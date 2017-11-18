import Documentary from '@/components/tth-documentary/Documentary'
import Join from '@/components/tth-documentary/Join'
import Rank from '@/components/tth-documentary/Rank'
export default [
  {
    path: '/documentary',
    name: 'Documentary',
    component: Documentary
  },
  {
    path: '/join',
    name: 'Join',
    component: Join
  },
  {
    path: '/rank',
    name: 'Rank',
    component: Rank
  }
]
