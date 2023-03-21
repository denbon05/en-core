export type ValidatorKey = 'required' | 'len' | 'emailValid';

type ErrKeyWithMsg = {
  [key in ValidatorKey]?: string;
};

export type IRuleByKey = {
  [key in ValidatorKey]: (
    message: string
  ) => (value: string) => boolean | string;
};

export type RuleParam = {
  [key in ValidatorKey]?: string;
};

export type ValidationFunc = (value: string) => boolean | string;

export default interface IValidator {
  getRules(msgByKey: ErrKeyWithMsg): ValidationFunc[];
}
