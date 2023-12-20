(function () {
  const txtLoginIdValidator = new Filedvalidator('txtLoginId', async (val) => {
    if (!val.trim()) {
      return '账号不能为空!';
    }
  });

  const txtLoginPwdValidator = new Filedvalidator('txtLoginPwd', (val) => {
    if (!val.trim()) {
      return '密码不能为空!';
    }
  });

  $('.user-form').onsubmit = submit;
  async function submit(e) {
    e.preventDefault();
    const flag = await Filedvalidator.validate(txtLoginIdValidator.validate(), txtLoginPwdValidator.validate());
    if (!flag) return;
    const data = Object.fromEntries(new FormData(this).entries());
    const result = await API.userLogin(data);
    if (result.code === 0) {
      alert('登录成功');
      location.href = './index.html';
    } else {
      alert('登录失败：' + result.msg);
    }
  }
})();
