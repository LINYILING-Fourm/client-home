// 格式化当前时间为 hh:mm:ss 格式的字符串
export const formatDate = () => {
    const now = new Date(); // 获取当前时间
    let hour: string | number = now.getHours(); // 获取小时
    let minute: string | number = now.getMinutes(); // 获取分钟
    let second: string | number = now.getSeconds(); // 获取秒
    if (hour < 10) hour = `0${hour}`; // 如果小时小于 10，则在前面补 '0'
    if (minute < 10) minute = `0${minute}`; // 如果分钟小于 10，则在前面补 '0'
    if (second < 10) second = `0${second}`; // 如果秒小于 10，则在前面补 '0'
    return `${hour}:${minute}:${second}`; // 返回格式化后的时间字符串
  };
  
  // 根据指定的格式(fmt)，格式化时间(time)
  function dateFormat(fmt: any, time: any) {
    let date = new Date(time); // 根据时间戳创建日期对象
    let ret;
    const opt = {
      // 年份
      "Y+": date.getFullYear().toString(),
      // 月份
      "m+": (date.getMonth() + 1).toString(),
      // 日
      "d+": date.getDate().toString(),
      // 时
      "H+": date.getHours().toString(),
      // 分
      "M+": date.getMinutes().toString(),
      // 秒
      "S+": date.getSeconds().toString(),
      // 季度
      "q+": Math.floor((date.getMonth() + 3) / 3).toString(),
      // 毫秒
      "S": date.getMilliseconds().toString()
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    } as any;
    for (const k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt); // 使用正则表达式匹配 fmt 中的格式化字符
      if (ret) {
        // 如果匹配到了格式化字符，则替换为对应的时间值
        fmt = fmt.replace(
          ret[1],
          ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
        );
      }
    }
    return fmt; // 返回格式化后的时间字符串
  }
  
  // 获取昨日的起始时间和结束时间（格式为 YYYY-mm-dd）
  export const get1stAndToday = () => {
    let todayData = new Date(new Date().toLocaleDateString()).getTime(); // 获取今天零点的时间戳
    let yesterdayStart = todayData - 3600 * 24 * 1000; // 昨天零点的时间戳
    let yesterdayEnd = yesterdayStart + 24 * 60 * 60 * 1000 - 1; // 昨天的结束时间戳
    let startDay1 = dateFormat("YYYY-mm-dd", yesterdayStart); // 格式化昨天的起始时间
    let endDay1 = dateFormat("YYYY-mm-dd", yesterdayEnd); // 格式化昨天的结束时间
    return [startDay1, endDay1]; // 返回昨天的起始时间和结束时间数组
  };
  
  // 获取昨日和今日的日期（格式为 YYYY.mm.dd）
  export const getday = () => {
    let todayData = new Date(new Date().toLocaleDateString()).getTime(); // 获取今天零点的时间戳
    let yesterday = todayData - 3600 * 24 * 1000; // 昨天零点的时间戳
    let yesterdayStr = dateFormat("YYYY.mm.dd", yesterday); // 格式化昨天的日期
    let todayStr = dateFormat("YYYY.mm.dd", todayData); // 格式化今天的日期
    return [yesterdayStr, todayStr]; // 返回昨天和今天的日期数组
  };
  
  // 获取最近7天的起始时间和结束时间（格式为 YYYY-mm-dd）
  export const past7Day = () => {
    let todayData = new Date(new Date().toLocaleDateString()).getTime(); // 获取今天零点的时间戳
    let past7daysStart = todayData - 7 * 3600 * 24 * 1000; // 最近7天的起始时间戳
    let past7daysEnd = todayData - 1; // 最近7天的结束时间戳（昨天的最后一刻）
    let days7Start = dateFormat("YYYY-mm-dd", past7daysStart); // 格式化最近7天的起始日期
    let days7End = dateFormat("YYYY-mm-dd", past7daysEnd); // 格式化最近7天的结束日期
    return [days7Start, days7End]; // 返回最近7天的起始时间和结束时间数组
  };
  
  // 获取最近30天的起始时间和结束时间（格式为 YYYY-mm-dd）
  export const past30Day = () => {
    let todayData = new Date(new Date().toLocaleDateString()).getTime(); // 获取今天零点的时间戳
    let past30daysStart = todayData - 30 * 3600 * 24 * 1000; // 最近30天的起始时间戳
    let past30daysEnd = todayData - 1; // 最近30天的结束时间戳（昨天的最后一刻）
    let days30Start = dateFormat("YYYY-mm-dd", past30daysStart); // 格式化最近30天的起始日期
    let days30End = dateFormat("YYYY-mm-dd", past30daysEnd); // 格式化最近30天的结束日期
    return [days30Start, days30End]; // 返回最近30天的起始时间和结束时间数组
  };
  
  // 获取本周的起始时间和结束时间（格式为 YYYY-mm-dd）
  export const pastWeek = () => {
    let todayData = new Date(new Date().toLocaleDateString()).getTime(); // 获取今天零点的时间戳
    var nowDayOfWeek = new Date().getDay(); // 获取今天是本周的第几天（0表示周日，1表示周一，以此类推）
    const weekStartData = todayData - (nowDayOfWeek - 1) * 24 * 60 * 60 * 1000; // 本周的起始时间戳
    const weekEndData = todayData + (7 - nowDayOfWeek) * 24 * 60 * 60 * 1000; // 本周的结束时间戳
    let weekStart = dateFormat("YYYY-mm-dd", weekStartData); // 格式化本周的起始日期
    let weekEnd = dateFormat("YYYY-mm-dd", weekEndData); // 格式化本周的结束日期
    return [weekStart, weekEnd]; // 返回本周的起始时间和结束时间数组
  };
  
  // 获取本月的起始时间和结束时间（格式为 YYYY-mm-dd）
  export const pastMonth = () => {
    let year = new Date().getFullYear(); // 获取当前年份
    let month = new Date().getMonth(); // 获取当前月份（0表示一月，1表示二月，以此类推）
    const monthStartData = new Date(year, month, 1).getTime(); // 本月的起始时间戳
    const monthEndData = new Date(year, month + 1, 0).getTime() + 24 * 60 * 60 * 1000 - 1; // 本月的结束时间戳
    let monthStart = dateFormat("YYYY-mm-dd", monthStartData); // 格式化本月的起始日期
    let monthEnd = dateFormat("YYYY-mm-dd", monthEndData); // 格式化本月的结束日期
    return [monthStart, monthEnd]; // 返回本月的起始时间和结束时间数组
  };
  