// 环境变量检查函数，用于检查是否开启删除权限
export const checkProcessEnv = () => {
    // 检查环境变量中名为 VUE_APP_DELETE_PERMISSIONS 的值是否为字符串 'true'
    return process.env.VUE_APP_DELETE_PERMISSIONS === 'true';
  }
  
  // 防抖函数，用于控制函数在连续触发时只执行一次
  export const debounce = (fn, time) => {
    time = time || 200; // 如果未提供时间间隔，默认设置为 200 毫秒
    // 定时器变量，用于存储 setTimeout 返回的定时器 ID
    let timer = null;
    return function(...args) {
      const _this = this; // 缓存当前函数的执行上下文
      if (timer) {
        clearTimeout(timer); // 如果定时器存在，清除之前的定时器
      }
      timer = setTimeout(function() {
        timer = null; // 定时器执行后，重置定时器变量为 null
        fn.apply(_this, args); // 执行传入的函数 fn，并传入参数 args
      }, time); // 设置新的定时器，延迟执行 fn 函数
    }
  };
  
  // 节流函数，用于控制函数在一定时间间隔内只执行一次
  export const throttle = (fn, time) => {
    let timer = null; // 定时器变量，用于存储 setTimeout 返回的定时器 ID
    time = time || 1000; // 如果未提供时间间隔，默认设置为 1000 毫秒
    return function(...args) {
      if (timer) {
        return; // 如果定时器存在，则直接返回，不执行后续操作
      }
      const _this = this; // 缓存当前函数的执行上下文
      timer = setTimeout(() => {
        timer = null; // 定时器执行后，重置定时器变量为 null
      }, time); // 设置新的定时器，延迟 time 毫秒后执行
      fn.apply(_this, args); // 执行传入的函数 fn，并传入参数 args
    }
  }
  
  // 字符串处理函数，用于判断字符串是否以负号开头
  export const strIncrease = (str) => {
    // 如果字符串 str 的第一个字符是 '-'，返回 true，否则返回 undefined（未完整实现）
    if (str.slice(0, 1) === '-') {
      return true;
    }
  }
  
  // 添加更多注释，帮助您理解和复用这些代码到您的项目中
  