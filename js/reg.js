(function () {
  const txtLoginIdValidator = new Filedvalidator('txtLoginId', async (val) => {
    if (!val.trim()) {
      return '账号不能为空!';
    }
    const result = await API.userExists(val);
    if (result.code === 0) {
      return result.data ? '用户名已存在' : false;
    } else {
      return `校验用户名失败：${result.msg}`;
    }
  });

  const txtNicknameValidator = new Filedvalidator('txtNickname', (val) => {
    if (!val.trim()) {
      return '昵称不能为空!';
    }
  });

  const txtLoginPwdValidator = new Filedvalidator('txtLoginPwd', (val) => {
    if (!val.trim()) {
      return '密码不能为空!';
    }
  });

  const txtLoginPwdConfirmValidator = new Filedvalidator('txtLoginPwdConfirm', (val) => {
    if (!val.trim()) {
      return '请确认密码!';
    }
    if (val.trim() !== txtLoginPwdValidator.input.value.trim()) return '密码输入错误';
  });

  $('.user-form').onsubmit = submit;
  async function submit(e) {
    e.preventDefault();
    const flag = await Filedvalidator.validate(txtLoginIdValidator.validate(), txtNicknameValidator.validate(), txtLoginPwdValidator.validate(), txtLoginPwdConfirmValidator.validate());
    console.log('flag', flag);
    if (!flag) return;
    const data = Object.fromEntries(new FormData(this).entries());
    const result = await API.userReg(data);
    console.log(result);
    if (result.code === 0) {
      alert('注册成功，快去登录吧');
      location.href = './login.html';
    } else {
      alert('注册失败：' + result.msg);
    }
  }
})();
