import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

const parseCookie = cookies => {
  let cookie = '';
  Object.keys(cookies).forEach(item => {
    cookie += item + '=' + cookies[item] + '; '
  })
  return cookie;
}

function getAllItems (cookies) {
  return new Promise ((resolve, reject) => {
    service({
      url: '/api/allitems',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        cookie: parseCookie(cookies)
      }
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err);
    })
  })
}

export { getAllItems }