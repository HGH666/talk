const API = (() => {
  const BASE_URL = 'https://study.duyiedu.com';

  async function http(url, params, method = 'GET') {
    const headers = {};
    let options = {
      method,
      headers,
    };

    if (method === 'POST') {
      headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(params);
    }

    const token = localStorage.getItem('token');
    headers.Authorization = `Bearer ${token}`;

    return await fetch(BASE_URL + url, options);
  }

  // 用户注册
  async function userReg(params) {
    const res = await http('/api/user/reg', params, 'POST');
    return res.json();
  }

  // 用户登录
  async function userLogin(params) {
    const res = await http('/api/user/login', params, 'POST');
    const result = await res.json();
    if (result.code === 0) {
      const token = res.headers.get('Authorization');
      console.log(token);
      if (token) localStorage.setItem('token', token);
    }
    return result;
  }

  // 验证用户账号
  async function userExists(loginId) {
    return (await http('/api/user/exists?loginId=' + loginId)).json();
  }

  // 当前登录的用户信息
  async function userPrefile() {
    return (await http('/api/user/profile')).json();
  }

  // 发送聊天消息
  async function chat(params) {
    return (await http('/api/chat', params, 'POST')).json();
  }

  // 获取聊天记录
  async function chatHistory() {
    return (await http('/api/chat/history')).json();
  }

  function loginOut() {
    localStorage.removeItem('token');
    location.href = './login.html';
  }

  return {
    http,
    userReg,
    userLogin,
    userExists,
    userPrefile,
    chat,
    chatHistory,
    loginOut,
  };
})();
