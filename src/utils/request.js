import axios from 'axios';
import message from '../component/global/notification/func-notification';
import bus from './bus';

const service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
});

service.interceptors.response.use(response => {
  if (response.data.code === 1000) {
    message.error({
      content: '登录失效，请重新登录',
      closeBtn: true
    });
    bus.$emit('toLogin');
  } else if (response.data.code !== 0) {
    message.error({
      content: response.data.msg,
      closeBtn: true
    });
  }
  return response.data;
}, err => {
  message.error({
    content: '系统错误，请稍后再试'
  })
  return Promise.reject(err);
})

export default {
  get (url, params) {
    return new Promise ((resolve, reject) => {
      service({
        url,
        method: 'get',
        params: params
      }).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  },
  post (url, data) {
    return new Promise ((resolve, reject) => {
      service({
        url,
        method: 'post',
        data
      }).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  },
  patch (url, data) {
    return new Promise ((resolve, reject) => {
      service({
        url,
        method: 'patch',
        data
      }).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  },
  delete (url, data) {
    return new Promise ((resolve, reject) => {
      service({
        url,
        method: 'delete',
        data
      }).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  }
}
