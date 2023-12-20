class Filedvalidator {
  /**
   * @param {string} eleId 要验证的元素id
   * @param {function} validatorFn 自定义验证函数
   *
   *  */
  constructor(eleId, validatorFn) {
    this.input = $('#' + eleId);
    this.validatorFn = validatorFn;
    this.input.onblur = () => {
      this.validate();
    };
  }

  // 验证当前实例表单元素
  async validate() {
    const p = this.input.nextElementSibling;
    const validateMsg = await this.validatorFn(this.input.value);
    if (validateMsg) p.innerText = validateMsg;
    else p.innerText = '';
    return !validateMsg;
  }

  // 静态方法，验证传入的表单元素
  static async validate(...validators) {
    const result = await Promise.all(validators);
    return result.every((e) => e);
  }
}
