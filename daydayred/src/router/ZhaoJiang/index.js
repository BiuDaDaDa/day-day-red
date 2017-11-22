import Documentary from '@/components/tth-documentary/Documentary'
import Join from '@/components/tth-documentary/Join'
import Rank from '@/components/tth-documentary/Rank'
import Particulars from '@/components/tth-documentary/Particulars'
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
  },
  {
    path: '/particulars/:godsrankUid',
    name: 'Particulars',
    component: Particulars
  }
]
