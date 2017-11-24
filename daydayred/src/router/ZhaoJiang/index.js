import Documentary from '@/components/tth-documentary/Documentary'
import Join from '@/components/tth-documentary/Join'
import Rank from '@/components/tth-documentary/Rank'
import Particulars from '@/components/tth-documentary/Particulars'
import Deity from '../../components/tth-documentary/Deity.vue'
import Score from '../../components/tth-score/Score.vue'
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
  },
  {
    path: '/deity/:uId/:masterSchemeId',
    name: 'Deity',
    component: Deity
  },
  {
    path: '/score',
    name: 'Score',
    component: Score
  }
]
