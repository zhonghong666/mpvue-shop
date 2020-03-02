function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

/**
 * 请求封装
 */
const host = "http://localhost:8088";
export {host};

function request(url, method, data, header = {}) {
  wx.showLoading({
    title: '加载中...'
  });
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url,
      method: method,
      data: data,
      header: {
        "content-type": "application/json"
      },
      success(res) {
        wx.hideLoading();
        resolve(res.data);
      },
      fail(err) {
        wx.hideLoading();
        reject(err);
      },
      complete(){
        wx.hideLoading();
      }
    });
  });
}
//get
export function get(url, data) {
  request(url, "GET", data);
}
//post
export function post(url, data) {
  request(url, "POST", data);
}
export default {
  formatNumber,
  formatTime
}
