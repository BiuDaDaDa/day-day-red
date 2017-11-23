import Home from '@/components/tth-home/Home'
import Activities from '@/components/tth-home/Activities'
import CrazyFree from '@/components/tth-home/CrazyFree'
import Invitation from '@/components/tth-home/Invitation'
import Recharge from '@/components/tth-home/Recharge'
import ExtraReward from '@/components/tth-home/ExtraReward'
import DoubleExtraReward from '@/components/tth-home/DoubleExtraReward'
import Rank3 from '@/components/tth-home/tth-buy/Rank3'
import Fucai3D from '@/components/tth-home/tth-buy/Fucai3d'
import SuperLotto from '@/components/tth-home/tth-buy/SuperLotto'
import DoubleColorBall from '@/components/tth-home/tth-buy/DoubleColorBall'
import Soccer from '@/components/tth-home/tth-buy/Soccer'
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
  },
  {
    path: '/extraReward',
    name: 'ExtraReward',
    component: ExtraReward
  },
  {
    path: '/doubleExtraReward',
    name: 'DoubleExtraReward',
    component: DoubleExtraReward
  },
  {
    path: '/rank3',
    name: 'Rank3',
    component: Rank3
  },
  {
    path: '/fucai3d',
    name: 'Fucai3D',
    component: Fucai3D
  },
  {
    path: '/superLotto',
    name: 'SuperLotto',
    component: SuperLotto
  },
  {
    path: '/doubleColorBall',
    name: 'DoubleColorBall',
    component: DoubleColorBall
  },
  {
    path: '/soccer',
    name: 'Soccer',
    component: Soccer
  }
]
