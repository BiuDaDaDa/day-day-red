// 双色球号码分割成数组
export function cutNumber (str) {
  // 获取获奖号码
  var str1 = str.split('+')
  var str11 = str1[0].split(' ')
  var str12 = str11.concat(str1[1])
  return str12
}
// 双色球的开奖日期换算
export function cutTime (str) {
  // 获取月份和日期
  var str2 = str.split('/')
  var dataNumber = new Date(str2[0], str2[1], str2[2]).getDay()
  var WeekDay = '周' + '五六日一二三四'.charAt(dataNumber)
  var time = str2[1] + '-' + str2[2] + '  ' + WeekDay
  return time
}
// 计算足彩和篮球的星期
export function cutWeek (str) {
  var str1 = str.split('')
  var str11 = str1.splice(0, 4)
  var str21 = str11.toString()
  var str31 = str21.replace(/,/g, '')
  // 月份
  var str12 = str1.splice(0, 2)
  var str22 = str12.toString()
  var str32 = str22.replace(/,/g, '')
  // 日
  var str13 = str1.splice(0, 2)
  var str23 = str13.toString()
  var str33 = str23.replace(/,/g, '')
  var dataNumber = new Date(str31, str32, str33).getDay()
  var WeekDay = '周' + '五六日一二三四'.charAt(dataNumber)
  // str1在切割后会变化
  return WeekDay
}
// 分割大乐透的获奖号码为数组
export function cutBiglt (str) {
  // 获取获奖号码
  var str3 = str.split('+')
  var str31 = str3[0].split(' ')
  var str32 = str3[1].split(' ')
  var str33 = str31.concat(str32)
  return str33
}
// 分割福彩3D的号码为数组
export function cutFc3D (str) {
  // 获取获奖号码
  var str1 = str.split(',')
  return str1
}
// 获取比赛的开赛时间
export function cutMatchTime (str) {
  // 获取获奖号码
  var str1 = str.split(' ')
  var str11 = str1[1].split(':')
  return str11
}

// 计算总进球数
export function allGoal (str) {
  var str1 = str.split(':')
  var goal = parseInt(str1[0]) + parseInt(str1[1])
  return goal
}

// 计算半场胜负结果
export function halfResult (str) {
  var str1 = str.split(':')
  var str11 = parseInt(str1[0])
  var str12 = parseInt(str1[1])
  var hRz = ''
  if (str11 > str12) {
    hRz = '胜'
  }
  if (str11 < str12) {
    hRz = '负'
  }
  if (str11 === str12) {
    hRz = '平'
  }
  return hRz
}

// 让球计算函数
export function concede (str, str2) {
  var str1 = str.split(':')
  var strg = parseInt(str2)
  var str11 = parseInt(str1[0])
  var str12 = parseInt(str1[1])
  var hRz = ''
  if (str11 + strg > str12) {
    hRz = '胜'
  }
  if (str11 + strg < str12) {
    hRz = '负'
  }
  if (str11 + strg === str12) {
    hRz = '平'
  }
  return hRz
}

// 篮球函数比分判断主胜和客胜
export function concede2 (str, str2) {
  var str1 = str.split(':')
  var strg = parseInt(str2)
  var str11 = parseInt(str1[0])
  var str12 = parseInt(str1[1])
  var hRz = ''
  if (str11 + strg > str12) {
    hRz = '主胜'
  }
  if (str11 + strg < str12) {
    hRz = '客胜'
  }
  return hRz
}
// 计算比赛结果的大小分
export function BigorSmall (str, str2) {
  var str1 = str.split(':')
  var strg = parseInt(str2)
  var str11 = parseInt(str1[0])
  var str12 = parseInt(str1[1])
  var hRz = ''
  if (str11 + str12 > str12) {
    hRz = '小分'
  }
  if (str11 + strg < str12) {
    hRz = '大分'
  }
  return hRz
}

// 判断主胜主负的分差

export function Fencha (str) {
  var str1 = str.split(':')
  var str11 = parseInt(str1[0])
  var str12 = parseInt(str1[1])
  var hRz = ''
  if (str11 - str12 > 1 && str11 - str12 <= 5) {
    hRz = '负1-5'
  }
  if (str11 - str12 < 10 && str11 - str12 >= 6) {
    hRz = '负6-10'
  }
  if (str11 - str12 > 10 && str11 - str12 <= 15) {
    hRz = '负11-15'
  }
  if (str11 - str12 >= 16 && str11 - str12 <= 20) {
    hRz = '负16-20'
  }
  if (str11 - str12 >= 21 && str11 - str12 <= 25) {
    hRz = '负21-25'
  }
  if (str11 - str12 >= 26 && str11 - str12 <= 30) {
    hRz = '负26+'
  }
  if (str11 - str12 >= -5 && str11 - str12 <= -1) {
    hRz = '胜1-5'
  }
  if (str11 - str12 <= -6 && str11 - str12 >= -10) {
    hRz = '胜6-10'
  }
  if (str11 - str12 <= -11 && str11 - str12 >= -15) {
    hRz = '胜11-15'
  }
  if (str11 - str12 <= -16 && str11 - str12 >= -20) {
    hRz = '胜16-20'
  }
  if (str11 - str12 <= -21 && str11 - str12 >= -25) {
    hRz = '胜21-25'
  }
  return hRz
}

// 时间
export function cutMatchTime2 (str) {
  // 获取获奖号码
  var str1 = str.substr(0, 4)
  var str2 = str.substr(4, 2)
  var str3 = str.substr(6, 2)
  var time = [str1, str2, str3]
  return time
}

export default {
  cutNumber,
  cutTime,
  cutBiglt,
  cutFc3D,
  cutMatchTime,
  allGoal,
  halfResult,
  concede,
  concede2,
  BigorSmall,
  Fencha,
  cutMatchTime2,
  cutWeek
}
