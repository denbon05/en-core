import IValidator, {
  IRuleByKey,
  RuleParam,
  ValidationFunc,
  ValidatorKey,
} from '@/types/validator';

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
  getRules(msgByKey: RuleParam): ValidationFunc[] {
    if (!msgByKey) {
      return [];
    }

    return Object.entries(msgByKey).map(
      <VKey extends string = ValidatorKey>([key, msg]: [VKey, string]) =>
        this.ruleByKey[key as ValidatorKey](msg)
    );
  }
}

export default new Validator();
