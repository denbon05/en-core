import IValidator, { IRuleByKey, ValidatorKeys } from '@/types/validator';

class Validator implements IValidator {
  private minNameLength = 3;
  private emailPattern = /.+@.+\..+/;

  private ruleByKey: IRuleByKey = {
    required: (msg) => (value) => Boolean(value) || msg,
    len: (msg) => (value) => (Boolean(value) && Boolean(value.length)) || msg,
    emailValid: (msg) => (value) => this.emailPattern.test(value) || msg,
  };

  getMinNameLength(): number {
    return this.minNameLength;
  }

  /**
   * The method returns rule key with specified error message.
   * @param messages
   */
  getRules(msgByKey = {}) {
    return Object.entries(msgByKey).map(([key, msg]: [ValidatorKeys, string]) =>
      this.ruleByKey[key](msg)
    );
  }
}

export default new Validator();
