(async function () {
  const doms = {
    nickname: $('#nickname'),
    loginId: $('#loginId'),
    close: $('.close'),
    chatContainer: $('.chat-container'),
    txtMsg: $('#txtMsg'),
    form: $('.msg-container'),
  };
  let userInfo = {};

  async function getUser() {
    const result = await API.userPrefile();
    if (result.code === 0) {
      userInfo = result.data;
      doms.nickname.innerText = userInfo.nickname;
      doms.loginId.innerText = userInfo.loginId;
    } else {
      alert(result.msg);
      location.href = './login.html';
    }
  }

  await getUser();

  doms.close.onclick = API.loginOut;
  doms.form.onsubmit = sendChat;

  async function getChatHistory() {
    const result = await API.chatHistory();
    console.log('result', result);
    if (result.code !== 0) return alert('获取聊天记录失败');
    for (const item of result.data) {
      addChat(item);
    }
    scrollBottom();
  }

  async function sendChat(e) {
    e.preventDefault();
    let content = txtMsg.value.trim();
    if (!content) return;
    let obj = {
      from: userInfo.loginId,
      to: null,
      createdAt: new Date().getTime(),
      content,
    };
    addChat(obj);
    doms.txtMsg.value = '';
    scrollBottom();
    const result = await API.chat(obj);
    console.log('result', result);
    if (result.code === 0) addChat({ to: userInfo.loginId, from: null, ...result.data });
    scrollBottom();
  }

  function addChat(item = {}) {
    if (!item.content) return;
    var html = `<div class="chat-item ${item.from ? 'me' : ''}">
    <img class="chat-avatar" src="${item.from ? './asset/avatar.png' : './asset/robot-avatar.jpg'}" />
    <div class="chat-content">${item.content}</div>
    <div class="chat-date">${formatDate(item.createdAt)}</div>
    </div>`;
    const template = $$$('template');
    template.innerHTML = html;
    const fragment = template.content;
    doms.chatContainer.append(fragment);
  }

  function formatDate(date) {
    date = new Date(date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDay()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
  }

  function scrollBottom() {
    doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight;
  }

  addChat();
  getChatHistory();
})();
