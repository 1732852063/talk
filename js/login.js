var loginIdValidator = new FieldValidator('txtLoginId', function (val) {
  if (!val) {
    return '请填写账号';
  }
});

var loginPwdValidator = new FieldValidator('txtLoginPwd', function (val) {
  if (!val) {
    return '请填写密码';
  }
});

var form = $('.user-form');

form.onsubmit = async function (e) {
  e.preventDefault();
  var result = await FieldValidator.validate(
    loginIdValidator,
    loginPwdValidator
  );
  if (!result) {
    return; // 验证未通过
  }
  var formData = new FormData(form); // 传入表单dom，得到一个表单数据对象
  var data = Object.fromEntries(formData.entries());

  var resp = await API.login(data);
  if (resp.code === 0) {
    alert('登录成功，点击确定，跳转到首页');
    location.href = bassURL + './index.html';
  } else {
    loginIdValidator.p.innerText = '账号或密码错误';
    loginPwdValidator.input.value = '';
  }
};
