/**
 * 解析时间并格式化为字符串
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  // 如果参数长度为0或者时间为null，则返回null
  if (arguments.length === 0 || !time) {
    return null
  }
  // 默认格式为 '{y}-{m}-{d} {h}:{i}:{s}'
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  // 如果 time 是对象类型，则直接赋值给 date
  if (typeof time === 'object') {
    date = time
  } else {
    // 如果 time 是字符串类型
    if ((typeof time === 'string')) {
      // 如果 time 是纯数字，支持 "1548221490638"
      if ((/^[0-9]+$/.test(time))) {
        time = parseInt(time)
      } else {
        // 否则，替换掉字符串中的 '-'，兼容 Safari 浏览器
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    // 如果 time 是数字且长度为10，则乘以1000转为毫秒级时间戳
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  // 格式化时间对象
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  // 将格式字符串中的占位符替换为具体的时间值
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // 注意: getDay() 返回值为 0 表示星期天
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * 将时间戳格式化为友好的时间显示字符串
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  // 如果时间戳长度为10，则乘以1000转为毫秒级时间戳
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // 小于1小时
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * 将 URL 参数字符串解析为对象
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  // 解码 URL 中的参数部分，并替换掉 '+' 为 ' '
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  // 将参数字符串按 '&' 分割成数组
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    // 按 '=' 分割每个参数，并将键值对添加到对象中
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}
